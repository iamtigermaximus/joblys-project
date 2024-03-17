import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import prisma from '../../../lib/prisma';
import OpenAI from 'openai';
import { Resume } from '@/types/profile';

const parserPromt = `Please rewrite the following three job responsibilities to enhance their professional appeal for a CV, while preserving their original meaning.
Each rewritten responsibility should be a more professional and concise version of the original, suitable for a CV. List your responsibilities in a bullet or numbered format, ensuring that the essence of each task remains the same, without introducing new facts or figures.
Each rewritten responsibility should correspond directly to the original ones provided, maintaining a concise length suitable for a CV. Focus on using a variety of dynamic action verbs and professional terminology, especially if your experience is in a specific industry. For clarity, see the examples provided after the original responsibilities. 
Please provide exactly {number_sentences} rewritten sentences, one corresponding to each of the following original responsibilities:

Original Responsibilities:
{original_responsibilities}
Focus on using a variety of dynamic action verbs and professional terminology, especially if your experience is in a specific industry (please mention if so). For clarity, see the examples below:

Developed and optimized back-end APIs for a large-scale e-commerce platform, leading to significant improvements in response time.
Designed and executed a comprehensive digital marketing strategy, substantially increasing online brand presence and social media engagement.
Oversaw and directed multiple high-priority projects, ensuring completion within established timeframes and budget constraints.
Led cross-functional teams to foster collaboration and effective communication, successfully meeting project milestones.`;

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

  const { resumeId, id: jobId } = await req.json();

  if (!jobId || !resumeId) {
    return NextResponse.json(
      {
        body: {
          message: 'IDs not provided',
        }
      },
      { status: 400 }
    );
  }

  let structuredCV;
  try {
    structuredCV = await prisma.structuredCVs.findUnique({
      where: {
        ownerId: token.sub,
        id: resumeId,
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

  let resumeData: Resume;
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

  resumeData = structuredCV.content as any as Resume;

  const workExperienceToRewrite = resumeData
    .professional
    .work
    .filter((work: { id: string }) => work.id === jobId);

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

  const formattedResponsibilities = workExperienceToRewrite[0].jobDetails
    .split('.');

  const replacementMap: Record<string, string> = {
    '{number_sentences}': formattedResponsibilities.length.toString(),
    '{original_responsibilities}': formattedResponsibilities.join('. '),
  };

  const modifiedPrompt = parserPromt.replace(
    /{original_responsibilities}|{number_sentences}/g,
    match => replacementMap[match],
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

  workExperienceToRewrite[0].jobDetails = responseContent.trim();

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
