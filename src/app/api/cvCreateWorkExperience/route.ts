import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import prisma from '../../../lib/prisma';
import OpenAI from 'openai';
import { Resume } from '@/types/profile';

const parserPromt = `
This prompt focuses on extracting impactful achievements for a CV based solely on the user's job title.

  Input:
  Job Title: The user's current or past job title ({job_title})

  Output:
  A bulleted list of 3-5 concise sentences (ideally 3) highlighting achievements relevant to the provided job title. Each sentence should:
  Emphasize accomplishments using strong action verbs and achievement-oriented language.
  Be tailored for inclusion in a CV, without mentioning the specific job title.

  Instructions:
  Identify Key Skills: Based on the provided job title ({job_title}), brainstorm the key skills and expertise typically associated with that role.
  Craft Achievement Examples: Generate 3-5 bullet point sentences that showcase the user's potential achievements in those identified skills.
  Action Verbs & Impact: Focus on action verbs that demonstrate initiative and accomplishment.
  Maintain Relevance: Ensure each achievement is relevant to the provided job title and transferable to various work environments.
`;

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
        },
      },
      { status: 401 },
    );
  }

  const { resumeId, id: jobId } = await req.json();

  if (!jobId || !resumeId) {
    return NextResponse.json(
      {
        body: {
          message: 'IDs not provided',
        },
      },
      { status: 400 },
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
      },
    });
  } catch (err) {
    console.log(`Fetching structuredCV: ${err}`);
    return NextResponse.json(
      {
        body: {
          message: 'internal server error',
        },
      },
      { status: 500 },
    );
  }

  let resumeData: Resume;
  if (!structuredCV?.content) {
    return NextResponse.json(
      {
        body: {
          message: 'CV not found or missing Work Experience',
        },
      },
      { status: 404 },
    );
  }

  resumeData = structuredCV.content as any as Resume;

  const workExperienceToRewrite = resumeData.professional.work.filter(
    (work: { id: string }) => work.id === jobId,
  );

  if (workExperienceToRewrite.length === 0) {
    return NextResponse.json(
      {
        body: {
          message: 'Position not found',
        },
      },
      { status: 404 },
    );
  }

  if (workExperienceToRewrite.length > 1) {
    return NextResponse.json(
      {
        body: {
          message: 'Multiple positions found',
        },
      },
      { status: 500 },
    );
  }

  const formattedResponsibilities =
    workExperienceToRewrite[0].jobDetails.split('.');

  if (formattedResponsibilities.length == 0) {
    return NextResponse.json(
      {
        body: {
          message: 'There is no sentence to rewrite',
        },
      },
      { status: 500 },
    );
  }


  const replacementMap: Record<string, string> = {
    '{job_title}': resumeData.professional.currentRole,
  };

  const modifiedPrompt = parserPromt.replace(
    /{job_title}/g,
    match => replacementMap[match],
  );

  const openaiResponse = await openAI.completions.create({
    model: 'gpt-3.5-turbo-instruct',
    prompt: modifiedPrompt,
    max_tokens: formattedResponsibilities.length * 30,
  });

  const responseContent = openaiResponse?.choices?.[0]?.text;
  if (!responseContent) {
    return NextResponse.json(
      {
        body: {
          message: 'Unable to rewrite CV',
        },
      },
      { status: 500 },
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
      },
    });
  } catch (err) {
    console.log(`Updating structuredCV: ${err}`);
    return NextResponse.json(
      {
        body: {
          message: 'internal server error',
        },
      },
      { status: 500 },
    );
  }

  return NextResponse.json(
    {
      body: {
        message: 'Successful rewrite of CV',
      },
    },
    { status: 201 },
  );
}
