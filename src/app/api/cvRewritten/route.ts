import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import prisma from '../../../lib/prisma';
import OpenAI from 'openai';

const parserPromt = `Rewrite the following job responsibilities to enhance their professional appeal for a CV, while preserving their original meaning. 
Please list your responsibilities in a bullet or numbered format. Ensure that the essence of each task remains the same, without introducing new facts or figures. 
Each rewritten responsibility should correspond directly to the original ones provided, and try to maintain a concise length suitable for a CV.
Original Responsibilities:
{original_responsibilities}
Focus on using a variety of dynamic action verbs and professional terminology, especially if your experience is in a specific industry (please mention if so). For clarity, see the examples below:

Developed and optimized back-end APIs for a large-scale e-commerce platform, leading to significant improvements in response time.
Designed and executed a comprehensive digital marketing strategy, substantially increasing online brand presence and social media engagement.
Oversaw and directed multiple high-priority projects, ensuring completion within established timeframes and budget constraints.`;

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
  apiKey: process.env.OPENAI_API_KEY
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

  const { id: jobId } = await req.json();

  if (!jobId) {
    return NextResponse.json(
      {
        body: {
          message: 'ID not provided',
        }
      },
      { status: 400 }
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

  const workExperienceToRewrite = resumeData
    .work_experience
    .filter((position) => position.id === jobId);

  if (workExperienceToRewrite.length === 0) {
    return NextResponse.json(
      {
        body: {
          message: 'Position not found',
        }
      },
      { status: 404 }
    );
  }

  if (workExperienceToRewrite.length > 1) {
    return NextResponse.json(
      {
        body: {
          message: 'Multiple positions found',
        }
      },
      { status: 500 }
    );
  }

  const formattedResponsibilities = workExperienceToRewrite[0].responsibilities
    .map((responsibility: string) => `- ${responsibility}`)
    .join('\n');
  const modifiedPrompt = parserPromt.replace(
    '{original_responsibilities}',
    formattedResponsibilities
  );

  const openaiResponse = await openAI.completions.create({
    model: 'gpt-3.5-turbo-instruct',
    prompt: modifiedPrompt,
    max_tokens: 2050,
  });

  const responseContent = openaiResponse?.choices?.[0]?.text;
  if (!responseContent) {
    return NextResponse.json(
      {
        body: {
          message: 'Unable to rewrite CV',
        }
      },
      { status: 500 }
    );
  }

  const rewrittenResponsibilities = responseContent
    .trim()
    .split('\n')
    .map((line: string) => line.trim());

  workExperienceToRewrite[0].responsibilities = rewrittenResponsibilities;

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