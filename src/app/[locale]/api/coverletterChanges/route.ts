import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import OpenAI from 'openai';
import prisma from '@/lib/prisma';

const openAI = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  if (!token || !token.sub) {
    console.log('invalid token');
    return NextResponse.json({ message: 'invalid token' }, { status: 401 });
  }

  const { coverletterId, name, resumeId, jobDescription } =
    (await req.json()) as {
      coverletterId: string;
      name: string;
      resumeId: string;
      jobDescription: string;
    };

  if (!coverletterId || !resumeId || !jobDescription) {
    return NextResponse.json(
      { message: 'coverletterId, resumeId or jobDescription not provided' },
      { status: 400 },
    );
  }

  console.log('Coverletter name' + name);

  let resume;
  try {
    resume = await prisma.structuredCVs.findUnique({
      where: {
        ownerId: token.sub,
        id: resumeId,
      },
      select: {
        id: true,
        content: true,
      },
    });

    if (!resume) {
      return NextResponse.json(
        { message: 'Resume not found' },
        { status: 404 },
      );
    }
  } catch (err) {
    console.log(`Fetching structuredCV: ${err}`);
    return NextResponse.json(
      { message: 'internal server error' },
      { status: 500 },
    );
  }

  const prompt = `
Task: You are provided a person's resume in a JSON format and a job description which they want to apply for. Write a matching cover letter for the person to apply for the job which emphasizes their relevant work experience and how they would be a good candidate. Write the cover letter in a professional tone. Write the cover letter in a way that it is not too long and not too short. The cover letter should be around 300 words. 

The cover letter should:
- Start with a reference to the position being applied for, such as "Re: Frontend Developer".
- Include a salutation to the hiring manager or the company's name.
- Start the main body with "I'm interested in the position..." or a similar phrase.
- In the first paragraph, mention the job title and express interest in the position. Make sure to link this interest to the person's skills and experience.
- In the second paragraph, describe the person’s relevant skills, experience, and specific examples from their resume that align with the job description (e.g., programming languages, tools, methodologies).
- Highlight the person's achievements or measurable outcomes that would demonstrate their value for the position.
- In the third paragraph, explain why the person believes they would be a good fit for the role, referencing the company’s values or mission when possible.
- Close with an invitation for further discussion, such as expressing interest in an interview.
- Be divided into clear paragraphs with blank lines between them.
- Do not include contact information of the applicant.
- Do not include the date.

- Do not include any templated content, like "[Recipient's Name]".
- Do not include special characters like stars (*).
- Do not wrap text withing quotes.
- Do not include \n or \t characters.

Resume:
${JSON.stringify(resume?.content)}

Job Description:
${jobDescription}
`;

  const openaiResponse = await openAI.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    stream: false,
    temperature: 0,
  });

  const responseContent = openaiResponse?.choices?.[0]?.message?.content;
  if (!responseContent) {
    return NextResponse.json(
      { message: 'Unable to write cover letter' },
      { status: 500 },
    );
  }

  const newCoverletter = responseContent.trim();

  console.log('Generated Cover Letter:', newCoverletter);
  try {
    if (coverletterId) {
      await prisma.coverLetters.update({
        where: {
          id: coverletterId,
          ownerId: token.sub,
        },
        data: {
          content: newCoverletter,
          name: name,
          resumeId,
          jobDescription,
        },
      });
    } else {
      // Create a new cover letter
      await prisma.coverLetters.create({
        data: {
          ownerId: token.sub,
          name: name,
          content: newCoverletter,
          resumeId,
          jobDescription,
        },
      });
    }
  } catch (err) {
    console.log(`Error saving cover letter: ${err}`);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }

  console.log('Successfully saved the cover letter');

  return NextResponse.json({ message: 'success' }, { status: 200 });
}

export async function GET(req: NextRequest) {
  const token = await getToken({ req });
  if (!token || !token.sub) {
    console.log('invalid token');
    return NextResponse.json({ message: 'invalid token' }, { status: 401 });
  }

  try {
    const coverLetters = await prisma.coverLetters.findMany({
      where: { ownerId: token.sub },
      select: {
        id: true,
        name: true,
        content: true,
        resumeId: true,
        jobDescription: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!coverLetters.length) {
      return NextResponse.json({ coverLetters: [] }, { status: 200 });
    }

    return NextResponse.json({ coverLetters }, { status: 200 });
  } catch (err) {
    console.log(`Fetching cover letters: ${err}`);
    return NextResponse.json(
      { message: 'internal server error' },
      { status: 500 },
    );
  }
}
