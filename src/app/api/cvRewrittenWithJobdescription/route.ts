import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import OpenAI from 'openai';

const parserPromt = `Provide details of your current job responsibilities as outlined in your resume, along with the job description for the position you're seeking. 
This will enable the model to tailor your existing responsibilities to better match the new job's requirements. 
The process will include integrating relevant keywords to enhance your prospects for the new role. 
Each of your current job responsibilities will be rephrased into a single, more impactful sentence. 
The final output will be a list of your reformulated duties, either in bullet points or numbered format, emphasizing dynamic action verbs and industry-specific jargon.

Please provide exactly {number_sentences} rewritten sentences, corresponding to your original responsibilities, as follows:

Current Job Responsibilities: {original_responsibilities}
Target Job Description: {job_description}
The model will prioritize the use of dynamic action verbs and professional terminology, particularly tailored to your industry. Below are some sample reformulations for reference:

Enhanced and streamlined back-end APIs for a major e-commerce platform, resulting in markedly faster response times.
Crafted and implemented a holistic digital marketing strategy, significantly boosting online brand visibility and social media engagement.
Managed and guided multiple critical projects, ensuring timely completion within budget.
Spearheaded collaborative efforts across various teams, achieving key project goals efficiently.`;

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
    '{number_sentences}': allResponsibilities.length.toString(),
    '{original_responsibilities}': formattedResponsibilities,
    '{job_description}': job_descriptions,
  };
  const modifiedPrompt = parserPromt.replace(
    /{number_sentences}|{original_responsibilities}|{job_description}/g,
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
