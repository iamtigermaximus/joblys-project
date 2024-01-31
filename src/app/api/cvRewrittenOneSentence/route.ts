import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import prisma from '../../../lib/prisma';
import OpenAI from 'openai';

const parserPrompt = `Please rewrite the following job responsibility to enhance its professional appeal for a CV, while preserving its original meaning. 
The rewritten responsibility should be a more professional and concise version of the original, suitable for a CV. Ensure that the essence of the task remains the same, without introducing new facts or figures. 
Use dynamic action verbs and professional terminology. For clarity, see the example provided after the original responsibility. 

Original Responsibility:
{original_responsibility}

Example:
Developed and optimized a back-end API for a large-scale e-commerce platform, leading to significant improvements in response time.`;

const openAI = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  // const token = await getToken({ req });

  // if (!token) {
  //   console.log('invalid token');
  //   return NextResponse.json(
  //     { body: { message: 'invalid token' } },
  //     { status: 401 },
  //   );
  // }

  const { responsibility: originalResponsibility } = await req.json();
  if (!originalResponsibility) {
    return NextResponse.json(
      { body: { message: 'Responsibility not provided' } },
      { status: 400 },
    );
  }

  const modifiedPrompt = parserPrompt.replace(
    '{original_responsibility}',
    originalResponsibility,
  );

  const openaiResponse = await openAI.completions.create({
    model: 'gpt-3.5-turbo-instruct',
    prompt: modifiedPrompt,
    max_tokens: 30,
    temperature: 0.5,
  });

  const responseContent = openaiResponse?.choices?.[0]?.text;
  if (!responseContent) {
    return NextResponse.json(
      { body: { message: 'Unable to rewrite CV' } },
      { status: 500 },
    );
  }

  const rewrittenResponsibility = responseContent.trim();

  return NextResponse.json(
    { body: { rewrittenResponsibility: rewrittenResponsibility } },
    { status: 201 },
  );
}
