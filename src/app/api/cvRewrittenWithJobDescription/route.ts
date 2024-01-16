import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import OpenAI from 'openai';

const parserPromt = `
I am in the process of updating my resume for a new job opportunity and need assistance in rephrasing my current job responsibilities. The goal is to align them more closely with the position I am aiming for. Each rewritten sentence should be concise yet impactful, containing between 10 to 50 words. Emphasis should be on dynamic action verbs and industry-specific terminology to enhance my resume's appeal for the new role.

Please rewrite each of my job responsibilities, listed below, into a single sentence that adheres to the specified word count. These rephrasings should mirror the skills and requirements of the new role I am applying for, creating a strong alignment with my experience and the job's expectations.

Current Job Responsibilities:
{original_responsibilities}

Target Job Description for the New Role:
{job_description}

Your assistance in providing these tailored, succinct rephrased sentences will be greatly appreciated.


`;

interface ResumeData {
  'Work Experience': WorkExperience;
}

interface WorkExperience {
  [companyName: string]: Position[];
}

interface Position {
  Position: string;
  Location: string;
  StartDate: string;
  EndDate: string;
  Responsibilities: string[];
}

const openAI = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const { id, job_descriptions } = await req.json();

  if (!id) {
    return NextResponse.json(
      {
        body: {
          message: 'ID not provided',
        },
      },
      { status: 400 },
    );
  } else if (!job_descriptions) {
    return NextResponse.json(
      {
        body: {
          message: 'Job description not provided',
        },
      },
      { status: 400 },
    );
  }

  const result = await prisma.rewrittenCVs.findUnique({
    where: { id: id },
    select: { content: true },
  });
  let resumeData: ResumeData;
  if (result?.content != null) {
    resumeData = JSON.parse(result.content);
  } else {
    return NextResponse.json(
      {
        body: {
          message: 'CV not found or missing Work Experience',
        },
      },
      { status: 404 },
    );
  }

  let allResponsibilities: string[] = [];
  const workExperience = resumeData['Work Experience'];

  for (const companyName in workExperience) {
    const positions = workExperience[companyName];
    positions.forEach((position: { Responsibilities: string[] }) => {
      if (Array.isArray(position.Responsibilities)) {
        allResponsibilities = [
          ...allResponsibilities,
          ...position.Responsibilities,
        ];
      }
    });
  }

  const formattedResponsibilities = allResponsibilities
    .map(responsibility => `- ${responsibility}`)
    .join('\n');
  const replacementMap: Record<string, string> = {
    '{original_responsibilities}': formattedResponsibilities,
    '{job_description}': job_descriptions,
  };
  const modifiedPrompt = parserPromt.replace(
    /{original_responsibilities}|{job_description}/g,
    match => replacementMap[match],
  );

  const openaiResponse = await openAI.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'user',
        content: modifiedPrompt,
      },
    ],
    max_tokens: allResponsibilities.length * 30,
    temperature: 0.5,
  });

  const responseContent = openaiResponse?.choices?.[0]?.message?.content;
  if (responseContent === undefined || responseContent === null) {
    return NextResponse.json(
      {
        body: {
          message: 'Unable to rewrite CV',
        },
      },
      { status: 500 },
    );
  } else {
    const rewrittenResponsibilities = responseContent
      .trim()
      .split('\n')
      .map((line: string) => line.trim());
    let index = 0;
    for (const companyName in workExperience) {
      workExperience[companyName].forEach((position: any) => {
        const originalResponsibilitiesCount = position.Responsibilities.length;
        const updatedResponsibilities = rewrittenResponsibilities.slice(
          index,
          index + originalResponsibilitiesCount,
        );
        position.Responsibilities = updatedResponsibilities;
        index += originalResponsibilitiesCount;
      });
    }

    const combinedData = {
      ...resumeData,
      'Work Experience': workExperience,
    };

    const combinedDataConvertedJSON = JSON.stringify(combinedData);

    const result = await prisma.rewrittenCVs.update({
      where: { id: id },
      data: {
        content: combinedDataConvertedJSON,
      },
    });

    return NextResponse.json(
      {
        body: {
          message: 'Successful rewrite of CV',
        },
      },
      { status: 200 },
    );
  }
}
