import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { Resume, ResumeSchema } from '@/types/profile';
import mammoth from 'mammoth';
import { v4 as uuidv4 } from 'uuid';
import OpenAI from 'openai';
import prisma from '../../../lib/prisma';

/**
  The package does not behave nicely with Typescript and Next.js,
  so we need to import them this way and ignore the types. This might be
  improved in the Next.js 14 release.
  More information in https://github.com/vercel/next.js/issues/58313.
 **/
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

const parserPromt = `You will be provided with extracted text from a {file_type} CV, and your task is to parse it and organize the text. Remove unrealted text regarding the CV. Output the data in JSON format. Have following structure for the JSON:
- field named basic, which contains the following fiels:
  - firstName (string)
  - lastName (string)
  - phoneNumber (string)
  - email (string)
  - address (string)
  - linkedin (string)
  - additionalLinks, and under it as an array of objects with keys: url (string)
- and then there is the following fields under the root:
- professional, and under it a field called work and under it as an array of objects with fields: company (string), jobTitle (string), startDate (object, and under it keys month (string) and year (string)), endDated (object, and under it keys month (string), year (string)), jobDetails as an string
- educational, and under it as an array of objects with keys: school (string), course (name of the degree, string), startDate and under it keys month (string) and year (string)), endDated (object, and under it keys month (string), year (string)), description (string)
- skills, array of objects, where each object has a field called name (strings) which tells the name of the skill
- languages, array of objects, where each object has a field called name (strings) which tells the name of the language
If some field or data is missing or you cannot parse it, just leave it as an empty string or array.`;

function getParserPrompt(fileType: FileType) {
  let filePromtType: FilePromptType;
  switch (fileType) {
    case FileType.DOCX:
      filePromtType = FilePromptType.DOCX;
      break;
    case FileType.PDF:
      filePromtType = FilePromptType.PDF;
      break;
    default:
      filePromtType = FilePromptType.PDF;
  }

  return parserPromt.replace('{file_type}', filePromtType);
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

  console.log('Parsing the CV...');

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

  let structuredCVContent: Resume;
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

  structuredCVContent.professional.summary = '';
  structuredCVContent.professional.currentRole = '';

  structuredCVContent.professional.work.map(exp => {
    exp.id = uuidv4();
    return exp;
  });

  structuredCVContent.educational.map(edu => {
    edu.id = uuidv4();
    return edu;
  });

  structuredCVContent.skills.map(skill => {
    skill.id = uuidv4();
    return skill;
  });

  structuredCVContent.languages.map(language => {
    language.id = uuidv4();
    return language;
  });

  structuredCVContent.basic.additionalLinks.map(link => {
    link.id = uuidv4();
    return link;
  });

  const isValidResume = ResumeSchema.safeParse(structuredCVContent);
  if (!isValidResume.success) {
    console.log(`Invalid resume: ${isValidResume.error}`);
    return NextResponse.json(
      {
        body: {
          message: 'resume structure is invalid',
        },
      },
      { status: 400 },
    );
  }

  console.log('Stuctured the CV, persisting it...');
  let createdStructuredCV;
  try {
    createdStructuredCV = await prisma.structuredCVs.create({
      data: {
        ownerId: user.id,
        content: structuredCVContent as any,
      },
      select: {
        id: true,
      },
    });
  } catch (err) {
    console.log(`Update parsedCV: ${err}`);
    return NextResponse.json(
      {
        body: {
          message: 'internal server error',
        },
      },
      { status: 500 },
    );
  }

  console.log('Successfully persisted the CV');

  return NextResponse.json(
    {
      body: {
        message: 'parsing succeeded',
        resumeId: createdStructuredCV.id,
      },
    },
    { status: 200 },
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
