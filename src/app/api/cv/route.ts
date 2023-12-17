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

export async function POST(req: NextRequest, res: NextResponse) {
  const token = await getToken({ req })
  console.log('token: ' + JSON.stringify(token));
  console.log('token2: ' + token.sub)
  if (!token && token != null) {
    console.log('invalid token');
    return NextResponse.json(
      {
        'reason': 'invalid token',
      },
      {
        status: 401,
      },
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
        'reason': 'user not found',
      },
      {
        status: 401,
      },
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
    try {
      await prisma.parsedCVs.create({
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
          'message': 'internal server error',
        },
        {
          status: 500,
        },
      );
    }
    
    console.log('Parsed the CV, structuring it...');

    const chatResp = openAI.chat.completions.create({
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

    return NextResponse.json(
      {
        'message': 'parsing succeeded',
      },
      {
        status: 200,
      },
    );
  }

  return NextResponse.json(
    {
      'message': 'unable to parse cv',
    },
    {
      status: 500,
    },
  );
}
