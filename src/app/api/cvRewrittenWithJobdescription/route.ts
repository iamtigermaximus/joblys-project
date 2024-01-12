import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import OpenAI from 'openai';

const parserPromt = `Please share your current job responsibilities listed in your CV, as well as the description of the new job you are applying for. 
The model will then rewrite your current responsibilities to better align with the new job description, ensuring to incorporate relevant keywords and present your achievements in a clear.
Each duty from your current job will be rewritten into single sentence.
The rewritten responsibilities will be presented in a clear, concise bullet or numbered format, using dynamic action verbs and professional terminology. 
If your experience is in a specific industry, please mention it. 
Current Job Responsibilities:
{original_responsibilities}
New Job Description:
{job_description}
The model will use dynamic action verbs and professional terminology, particularly if your experience is within a specific industry. For your reference, here are some examples:
Developed and optimized back-end APIs for a large-scale e-commerce platform, leading to significant improvements in response time.
Designed and executed a comprehensive digital marketing strategy, substantially increasing online brand presence and social media engagement.
Oversaw and directed multiple high-priority projects, ensuring completion within established timeframes and budget constraints.
Led cross-functional teams to foster collaboration and effective communication, successfully meeting project milestones.`;

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

  const openaiResponse = await openAI.completions.create({
    model: 'gpt-3.5-turbo-instruct',
    prompt: modifiedPrompt,
    max_tokens: allResponsibilities.length * 30,
    temperature: 0.5,
  });

  const responseContent = openaiResponse?.choices?.[0]?.text;
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
