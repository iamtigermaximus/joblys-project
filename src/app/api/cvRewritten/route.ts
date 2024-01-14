import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import OpenAI from 'openai';

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
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json(
      {
        body: {
          message: 'ID not provided',
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
    '{number_sentences}': allResponsibilities.length.toString(),
    '{original_responsibilities}': formattedResponsibilities,
  };
  const modifiedPrompt = parserPromt.replace(
    /{original_responsibilities}|{number_sentences}/g,
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
