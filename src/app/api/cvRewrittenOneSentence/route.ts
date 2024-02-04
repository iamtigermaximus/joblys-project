import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import OpenAI from 'openai';

const parserPrompt = `
Please rewrite the following job responsibility in three different tones: formal, enthusiastic, and confident. 
Please rewrite enhance its professional appeal for a CV, while preserving its original meaning. 
The original responsibility should be transformed into a more professional and concise version, suitable for a CV. 
Ensure the essence of the task remains intact, without introducing new facts or figures. Use dynamic action verbs and professional terminology for each tone. The original responsibility is as follows:

Original Responsibility:
{original_responsibility}

For each tone, provide a rewritten version of this responsibility that maintains its original meaning but is tailored to the specified tone.`;

const openAI = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function parseToJSON(str: string) {
  const sections = str.split('\n\n');
  const result = sections.map(section => {
    const [key, value] = section.split(/:\n/);
    const formattedKey = key.toLowerCase();

    return {
      [formattedKey]: value.trim(),
    };
  });

  return result;
}

export async function POST(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    console.log('invalid token');
    return NextResponse.json(
      { body: { message: 'invalid token' } },
      { status: 401 },
    );
  }

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
    max_tokens: 90,
    temperature: 0.5,
  });

  const responseContent = openaiResponse?.choices?.[0]?.text;
  if (!responseContent) {
    return NextResponse.json(
      { body: { message: 'Unable to rewrite CV' } },
      { status: 500 },
    );
  }

  const rewrittenResponsibility = parseToJSON(responseContent.trim());

  return NextResponse.json(
    { body: { rewrittenResponsibility: rewrittenResponsibility } },
    { status: 200 },
  );
}
