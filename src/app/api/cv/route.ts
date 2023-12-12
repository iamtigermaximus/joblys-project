import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt'
import mammoth from 'mammoth';
import OpenAI from 'openai';

const openAI = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
});

const parserPromt = 'You will be provided with extracted text from a .docx CV, and your task is to parse it and organize the text. Remove unrealted text regarding the CV. Use the same structure from top to down. Output the data in JSON format. Have the following fields in the top level JSON: name, personal_information, technical_skills, languages, work_experience, personal_projects, education, interest. In the work_experiense, list with different companies and roles as json array with company_name, start_date, end_date, location, and resposibilites, job title, start date, end date. In the education list  school name, location, degree or program, start and end dates. If some field or data is missing or you cannot parse it, mark the field with n/a.';

export async function POST(req: NextRequest, res: NextResponse) {
  const token = await getToken({ req })
  if (!!token) {
    return NextResponse.json(
      {
        'reason': 'invalid token',
      },
      {
        status: 401,
      },
    );
  }

  console.log('Use has signed in. Parsing the CV...');

  let text;
  const readData = await req.body?.getReader().read();
  if (readData && readData.value) {
    const buffer = Buffer.from(readData?.value);
    text = (await mammoth.extractRawText({ buffer })).value;
  }

  if (text) {
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
