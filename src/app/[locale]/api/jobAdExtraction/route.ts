import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import OpenAI from 'openai';

const parserPrompt = `
I have a job advertisement, and I need your assistance to extract essential details so I can tailor my CV to match it effectively for ATS compatibility. Please identify and provide information on the following categories:

1. **Role Overview**: Provide a concise summary of the role's main purpose and objectives. Highlight key aspects that should be reflected in my CV.
2. **Responsibilities**: List the primary duties and tasks expected of the candidate. These should be emphasized in my CV to align with the job description.
3. **Key Technologies**: Identify specific technologies, tools, and programming languages mentioned in the advertisement. Ensure these are highlighted in my CV where applicable.
4. **Ideal Candidate**: Describe the qualifications, skills, and attributes that the ideal candidate should possess. This will help me align my skills and experiences to match the job requirements.

Here is the job advertisement:

{job_description}

Please extract the information and organize it according to the categories listed above to help me optimize my CV for ATS screening.
`;

const openAI = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  const { job_description } = await req.json();

  if (!job_description) {
    return NextResponse.json(
      { message: 'Job description is not provided' },
      { status: 400 },
    );
  }

  const modifiedPrompt = parserPrompt.replace(
    '{job_description}',
    job_description,
  );

  try {
    const openaiResponse = await openAI.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: modifiedPrompt },
      ],
      max_tokens: 1500,
    });

    const responseContent = openaiResponse?.choices?.[0]?.message?.content;
    if (!responseContent) {
      console.error('No content in response:', openaiResponse);
      return NextResponse.json(
        { message: 'Unable to extract job details' },
        { status: 500 },
      );
    }

    return NextResponse.json({ data: responseContent.trim() }, { status: 200 });
  } catch (error: any) {
    console.error('Error during OpenAI request:', error.message);
    return NextResponse.json(
      { message: 'An error occurred while processing the request' },
      { status: 500 },
    );
  }
}
