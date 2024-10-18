import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import mammoth from 'mammoth';
import { v4 as uuidv4 } from 'uuid';
import OpenAI from 'openai';
import prisma from '@/lib/prisma';
import { Profile, ProfileSchema } from '@/types/profile';

// @ts-ignore
import * as pdfjs from 'pdfjs-dist/build/pdf.min.mjs';

// @ts-ignore
await import('pdfjs-dist/build/pdf.worker.min.mjs');

interface TextContextItem {
  str: string;
}

enum FileType {
  PDF = 'application/pdf',
  DOCX = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
}

enum FilePromptType {
  PDF = '.pdf',
  DOCX = '.docx',
}

const openAI = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
});

const parserPrompt = `You will be provided with extracted text from a {file_type} CV, and your task is to parse it and organize the text. Remove unrelated text regarding the CV. Output the data in JSON format. Have the following structure for the JSON:
{
  "firstName": "",
  "lastName": "",
  "email": "",
  "contact": "",
  "links": [
    {
      "id": "",
      "url": ""
    }
  ],
  "educational": [
    {
      "id": "",
      "school": "",
      "course": "",
      "startDate": {
        "month": "",
        "year": ""
      },
      "endDate": {
        "month": "",
        "year": ""
      },
      "description": ""
    }
  ],
  "professional": [
    {
      "id": "",
      "jobTitle": "",
      "company": "",
      "startDate": {
        "month": "",
        "year": ""
      },
      "endDate": {
        "month": "",
        "year": ""
      },
      "jobDetails": ""
    }
  ],
  "skills": [
    {
      "id": "",
      "name": ""
    }
  ],
  "languages": [
    {
      "id": "",
      "name": ""
    }
  ]
}`;

function getParserPrompt(fileType: FileType) {
  let filePromptType: FilePromptType;
  switch (fileType) {
    case FileType.DOCX:
      filePromptType = FilePromptType.DOCX;
      break;
    case FileType.PDF:
      filePromptType = FilePromptType.PDF;
      break;
    default:
      filePromptType = FilePromptType.PDF;
  }

  return parserPrompt.replace('{file_type}', filePromptType);
}

export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  if (!token) {
    console.log('invalid token');
    return NextResponse.json(
      {
        body: {
          message: 'invalid token',
        },
      },
      { status: 401 },
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
        },
      },
      { status: 401 },
    );
  }

  const formData = await req.formData();
  const file: File | null = formData?.get('file') as File;

  if (!file) {
    console.log('No file provided');
    return NextResponse.json(
      {
        body: {
          message: 'no file provided',
        },
      },
      { status: 400 },
    );
  }

  let cvTextContent: string = '';

  switch (file.type) {
    case FileType.PDF:
      const pdf = await pdfjs.getDocument({ data: await file.arrayBuffer() })
        .promise;
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText: string = textContent.items
          .map((c: TextContextItem) => c.str)
          .join('\n');
        cvTextContent = cvTextContent.concat(pageText);
      }
      break;
    case FileType.DOCX:
      const txt = await mammoth.extractRawText({
        buffer: Buffer.from(await file.arrayBuffer()),
      });
      cvTextContent = txt.value;
      break;
    default:
      console.log('Invalid file type');
      return NextResponse.json(
        {
          body: {
            message: 'invalid file type',
          },
        },
        { status: 400 },
      );
  }

  if (!cvTextContent) {
    console.log('no text content');
    return NextResponse.json(
      {
        body: {
          message: 'unable to parse cv',
        },
      },
      { status: 500 },
    );
  }

  console.log('Structuring the CV...');
  let chatResp;
  try {
    chatResp = await openAI.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: getParserPrompt(file.type as FileType),
        },
        {
          role: 'user',
          content: cvTextContent,
        },
      ],
      stream: false,
      temperature: 0,
      max_tokens: 2048,
    });
  } catch (err) {
    console.log(`Error from OpenAI client: ${err}`);
    return NextResponse.json(
      {
        body: {
          message: 'internal server error',
        },
      },
      { status: 500 },
    );
  }

  let structuredCVContent: Profile;
  try {
    structuredCVContent = JSON.parse(chatResp?.choices[0]?.message?.content!);
    if (!structuredCVContent) {
      console.log('ChatGPT response did not contain parsed CV');
      return NextResponse.json(
        {
          body: {
            message: 'no structured CV response',
          },
        },
        { status: 500 },
      );
    }
  } catch (err) {
    console.log(`Error parsing ChatGPT response: ${err}`);
    return NextResponse.json(
      {
        body: {
          message: 'internal server error',
        },
      },
      { status: 500 },
    );
  }

  // Adding unique IDs to each entry
  structuredCVContent.professional = structuredCVContent.professional.map(
    prof => ({
      ...prof,
      id: uuidv4(),
    }),
  );
  structuredCVContent.educational = structuredCVContent.educational.map(
    edu => ({
      ...edu,
      id: uuidv4(),
    }),
  );
  structuredCVContent.skills = structuredCVContent.skills.map(skill => ({
    ...skill,
    id: uuidv4(),
  }));
  structuredCVContent.languages = structuredCVContent.languages.map(
    language => ({
      ...language,
      id: uuidv4(),
    }),
  );
  structuredCVContent.links = structuredCVContent.links.map(link => ({
    ...link,
    id: uuidv4(),
  }));

  const validated = ProfileSchema.safeParse(structuredCVContent);
  if (!validated.success) {
    console.log('Validation failed for structured CV content');
    return NextResponse.json(
      {
        body: {
          message: 'validation failed for structured CV content',
        },
      },
      { status: 400 },
    );
  }

  return NextResponse.json(
    {
      body: validated.data,
    },
    { status: 201 },
  );
}

export async function GET(req: NextRequest) {
  console.log('Getting all profiles...');

  const token = await getToken({ req });
  if (!token) {
    console.log('invalid token');
    return NextResponse.json(
      {
        body: {
          message: 'invalid token',
        },
      },
      { status: 401 },
    );
  }

  let structuredCVs = [];
  try {
    structuredCVs = await prisma.structuredCVs.findMany({
      where: {
        ownerId: token?.sub,
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  } catch (err) {
    console.log(`Fetching parsed CV: ${err}`);
    return NextResponse.json(
      {
        body: {
          message: 'internal server error',
        },
      },
      { status: 500 },
    );
  }

  const resumes = structuredCVs.map(cv => cv);

  return NextResponse.json(
    {
      body: {
        resumes,
      },
    },
    { status: 200 },
  );
}
