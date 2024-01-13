import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt'
import mammoth from 'mammoth';
import OpenAI from 'openai';
import prisma from '../../../lib/prisma';

const openAI = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
});

const parserPromt = `You will be provided with extracted text from a .docx CV, and your task is to parse it and organize the text. Remove unrealted text regarding the CV. Use the same structure from top to down. Output the data in JSON format. Have the following fields in the top level JSON:
- name (the CV holder's name)
- personal_information, and under it keys email, phone_number, about_me
- technical_skills (as an array of skills as strings)
- languages (as an array of strings)
- work_experience, and under it as an array of objects with keys: company_name (string), position (job title, string), location (location of the company, string), start_date (string), end_date (string), responsibilities (array of strings)
- personal_projects, and under it as an array of objects with keys: name (string), start_date (string), end_date (string)
- education, and under it as an array of objcts with keys: degree (string), location (string), start_date (string), end_date (string), grade (string)
- interests (array of strings).
If some field or data is missing or you cannot parse it, mark the field with n/a.`;

export async function POST(req: NextRequest) {
  const token = await getToken({ req })
  if (!token) {
    console.log('invalid token');
    return NextResponse.json(
      {
        body: {
          message: 'invalid token',
        }
      },
      { status: 401 }
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      id: token?.sub,
    },
  });

  if (!user) {
    console.log('User not found');
    return NextResponse.json(
      {
        body: {
          message: 'user not found',
        }
      },
      { status: 401 }
    );
  }

  console.log('Parsing the CV...');

  let text;
  const readData = await req.body?.getReader().read();
  if (readData && readData.value) {
    const buffer = Buffer.from(readData?.value);
    text = (await mammoth.extractRawText({ buffer })).value;
  }

  if (text) {
    console.log('Parsed the CV, persisting it...');
    let parsedCV;
    try {
      parsedCV = await prisma.parsedCVs.create({
        data: {
          ownerId: user.id,
          content: text,
          source: 'docx',
        }
      });
    } catch(err) {
      console.log('Create parsedCV: ' + err);
      return NextResponse.json(
        {
          body: {
            message: 'internal server error',
          }
        },
        { status: 500 }
      );
    }
    
    console.log('Structuring the CV...');
    let chatResp;
    try {
      chatResp = await openAI.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            'role': 'system',
            'content': parserPromt,
          },
          {
            'role': 'user',
            'content': text,
          },
        ],
        stream: false,
        temperature: 0,
        max_tokens: 2048,
      });
    } catch(err) {
      console.log(`Error from OpenAI client: ${err}`);

      return NextResponse.json(
        {
          body: {
            message: 'internal server error',
          }
        },
        { status: 500 }
      );
    }

    let structuredCVContent;
    try {
      structuredCVContent = JSON.parse(chatResp?.choices[0]?.message?.content!);
      if (!structuredCVContent) {
        console.log('ChatGPT response did not contain parsed CV');
        return NextResponse.json(
          {
            body: {
              message: 'no structured CV response',
            }
          },
          { status: 500 }
        );
      }
    } catch(err) {
      console.log(`Error parsing ChatGPT response: ${err}`);
      return NextResponse.json(
        {
          body: {
            message: 'internal server error',
          }
        },
        { status: 500 }
      );
    }

    console.log('Stuctured the CV, persisting it...');
    try {
      await prisma.structuredCVs.create({
        data: {
          ownerId: user.id,
          parsedCVId: parsedCV.id,
          content: structuredCVContent,
        }
      });
    } catch(err) {
      console.log(`Update parsedCV: ${err}`);
      return NextResponse.json(
        {
          body: {
            message: 'internal server error',
          }
        },
        { status: 500 }
      );
    }

    console.log('Successfully persisted the CV');

    return NextResponse.json(
      {
        body: {
          message: 'parsing succeeded',
        }
      },
      { status: 200 }
    );
  }

  return NextResponse.json(
    {
      body: {
        message: 'unable to parse cv',
      }
    },
    { status: 500 }
  );
}

export async function GET(req: NextRequest) {
  console.log('Getting stored profile...');

  const token = await getToken({ req })
  if (!token && token != null) {
    console.log('invalid token');
    return NextResponse.json(
      {
        body: {
          message: 'invalid token',
        }
      },
      { status: 401 }
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      id: token?.sub,
    },
  });

  if (!user) {
    console.log('User not found');
    return NextResponse.json(
      {
        body: {
          message: 'user not found',
        }
      },
      { status: 401 }
    );
  }

  let structuredCV;
  try {
    structuredCV = await prisma.structuredCVs.findFirst({
      where: {
        ownerId: user.id,
      },
      select: {
        content: true,
      },
    });
  } catch(err) {
    console.log(`Fetching parsed CV: ${err}`);
    return NextResponse.json(
      {
        body: {
          message: 'internal server error',
        }
      },
      { status: 500 }
    );
  }

  if (!structuredCV || !structuredCV.content) {
    return NextResponse.json(
      {
        body: {
          message: 'No stored profile',
        },
      },
      { status: 404 });
  }

  return NextResponse.json(
    {
      body: {
        profile: structuredCV?.content,
      },
    },
    { status: 200 });
}
