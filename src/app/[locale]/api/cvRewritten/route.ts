import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import prisma from '@/lib/prisma';
import OpenAI from 'openai';
import { Resume } from '@/types/resume';

const parserPromt = `
Task: Elevate a user's professional experience into impactful achievements tailored for their CV.

Input:
  Job Title: The user's job title ({job_title}).
  Original Responsibilities: A detailed list outlining the user's duties {original_responsibilities}.
  Number of Sentences: The desired number of distinct sentences for the refined achievements ({number_sentences}).

Instructions:
  Analyze the Action and Impact: Identify the key action the user performed without adding any new facts and numbers.
  Consider Skills: Think about the skills and expertise associated with the user's job title ({job_title}).
  Rephrase for Impact: Rewrite the responsibility using strong past-tense action verbs and action-oriented language that showcases the user's relevant skills. 
  Maintain Meaning: Ensure the rewritten sentence accurately reflects the original accomplishment.

Format:
  - Each sentence should be a bullet point starting with "•". Ensure consistent formatting.

Output:
  Professional Achievements: A bullet points list of {number_sentences} separate sentences. Each sentence should spotlight the user's achievements in concise and professional language, ideal for inclusion in a CV.
  Use the following bullet format:
    • {achievement sentence}
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
    '{number_sentences}': formattedResponsibilities.length.toString(),
    '{original_responsibilities}': formattedResponsibilities.join('. '),
  };

  const modifiedPrompt = parserPromt.replace(
    /{original_responsibilities}|{number_sentences}|{job_title}/g,
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
