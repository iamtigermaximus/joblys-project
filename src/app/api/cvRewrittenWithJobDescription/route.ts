import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
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
  work_experience: Position[];
}

interface Position {
  id: string;
  position: string;
  company_name: string;
  location: string;
  start_date: string;
  end_date: string;
  responsibilities: string[];
}

const openAI = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const token = await getToken({ req });

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

  const { jobDescription } = await req.json();

  if (!jobDescription) {
    return NextResponse.json(
      {
        body: {
          message: 'Job description not provided',
        },
      },
      { status: 400 },
    );
  }

  let structuredCV;
  try {
    structuredCV = await prisma.structuredCVs.findFirst({
      where: {
        owner: {
          id: token.sub,
        }
      },
      select: {
        id: true,
        content: true,
      }
    });
  } catch (err) {
    console.log(`Fetching structuredCV: ${err}`);
    return NextResponse.json(
      {
        body: {
          message: 'internal server error',
        }
      },
      { status: 500 }
    );
  }

  let resumeData: ResumeData;
  if (!structuredCV?.content) {
    return NextResponse.json(
      {
        body: {
          message: 'CV not found or missing Work Experience',
        }
      },
      { status: 404 }
    );
  }

  resumeData = structuredCV.content as any as ResumeData;

  const openaiApiPromises = [];
  for (const position of resumeData.work_experience) {
    const formattedResponsibilities = position.responsibilities
      .map((responsibility: string) => `- ${responsibility}`)
      .join('\n');

    const replacementMap: Record<string, string> = {
      '{original_responsibilities}': formattedResponsibilities,
      '{job_description}': jobDescription,
    };

    const modifiedPrompt = parserPromt.replace(
      /{original_responsibilities}|{job_description}/g,
      match => replacementMap[match],
    );

    const openaiApiCall = openAI.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'user',
          content: modifiedPrompt,
        },
      ],
      max_tokens: 2050,
      temperature: 0.5,
    });

    openaiApiPromises.push(openaiApiCall);
  }

  const openaiApiResponses = await Promise.all(openaiApiPromises);

  for (let i = 0; i < resumeData.work_experience.length; i++) {
    const rewrittenResponsibility = openaiApiResponses[i]?.choices?.[0]?.message?.content;

    if (!rewrittenResponsibility) {
      console.log('Failed to rewrite responsibility');
      continue;
    }

    const rewrittenResponsibilitiesFormatted = rewrittenResponsibility
      .trim()
      .split('\n')
      .map((line: string) => line.trim());

    resumeData.work_experience[i].responsibilities = rewrittenResponsibilitiesFormatted;
  }

  try {
    await prisma.structuredCVs.update({
      where: {
        id: structuredCV.id,
      },
      data: {
        content: resumeData as any,
      }
    });
  } catch (err) {
    console.log(`Updating structuredCV: ${err}`);
    return NextResponse.json(
      {
        body: {
          message: 'internal server error',
        }
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      body: {
        message: 'Successful rewrite of CV',
      }
    },
    { status: 201 }
  );
}
