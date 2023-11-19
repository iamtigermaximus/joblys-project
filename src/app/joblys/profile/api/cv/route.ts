import { NextResponse, NextRequest } from 'next/server';
import mammoth from 'mammoth';
import OpenAI from 'openai';

const openAI = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
});
const parserPromt = 'You will be provided with extracted text from a .docx CV, and your task is to parse it and organize the text. Remove unrealted text regarding the CV. Use the same structure from top to down. Output the data in JSON format. Have the following fields in the JSON: workExperience, company, job title, start date, end date, education with school name, program, start and end dates.';

export async function POST(req: NextRequest) {
  console.log('Processing...');
  let text;
  const readData = await req.body?.getReader().read();
  if (readData && readData.value) {
    const buffer = Buffer.from(readData?.value);
    text = (await mammoth.extractRawText({ buffer })).value;
  }

  if (text) {
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
        'parsed': 'foo', //chatResp.choices[0].message.content,
      },
      {
        status: 200,
      },
    );
  }
  
  return NextResponse.json(
    {
      'reason': 'bad content in request',
    },
    {
      status: 400,
    },
  );
}

export async function GET(req: Request) {
  return NextResponse.json(
    {
      "result": "ok from app/joblys/profile/api/cv",
    },
    {
      status: 200,
    },
  );
}
