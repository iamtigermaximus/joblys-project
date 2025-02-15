// // import { Resume } from './../../../types/resume';
// // import { NextRequest, NextResponse } from 'next/server';
// // import { getToken } from 'next-auth/jwt';
// // import prisma from '../../../lib/prisma';
// // import OpenAI from 'openai';

// // const parserPromt = `
// // I'd like you to create a compelling CV summary for me.

// // Here's what I can provide:

// // My current job title and a brief description of my responsibilities (2-3 sentences): {original_responsibilities}
// // The job description of the new position I'm applying for (keywords or key skills section is most helpful): {job_description}
// // Based on this information, I'd like you to generate a CV summary that:

// // Highlights my relevant skills and experience that match the new job description.
// // Demonstrates how my current experience positions me for success in the new role.
// // Provides a concise and impactful statement that showcases my value proposition.

// // Please ensure the summary:

// // Considers and records my most important experiences and skills, such as certifications, soft skills, technical skills, awards, or other achievements.
// // Reviews job descriptions for positions I'm interested in and notes the overlapping requirements with my qualifications.
// // Includes a two- to three-sentence summary that briefly showcases those skills.
// // Starts with a key adjective for myself, uses the active voice, and includes key action words to describe my experience.
// // `;

// // const openAI = new OpenAI({
// //   apiKey: process.env.OPENAI_API_KEY,
// // });

// // export async function POST(req: NextRequest) {
// //   const token = await getToken({ req });

// //   if (!token) {
// //     console.log('invalid token');
// //     return NextResponse.json(
// //       {
// //         body: {
// //           message: 'invalid token',
// //         },
// //       },
// //       { status: 401 },
// //     );
// //   }

// //   const { resumeId, jobDescription } = await req.json();

// //   if (!jobDescription) {
// //     return NextResponse.json(
// //       {
// //         body: {
// //           message: 'Job description not provided',
// //         },
// //       },
// //       { status: 400 },
// //     );
// //   }

// //   if (!resumeId) {
// //     return NextResponse.json(
// //       {
// //         body: {
// //           message: 'IDs not provided',
// //         },
// //       },
// //       { status: 400 },
// //     );
// //   }

// //   let structuredCV;
// //   try {
// //     structuredCV = await prisma.structuredCVs.findUnique({
// //       where: {
// //         ownerId: token.sub,
// //         id: resumeId,
// //       },
// //       select: {
// //         id: true,
// //         content: true,
// //       },
// //     });
// //   } catch (err) {
// //     console.log(`Fetching structuredCV: ${err}`);
// //     return NextResponse.json(
// //       {
// //         body: {
// //           message: 'internal server error',
// //         },
// //       },
// //       { status: 500 },
// //     );
// //   }

// //   let resumeData: Resume;
// //   if (!structuredCV?.content) {
// //     return NextResponse.json(
// //       {
// //         body: {
// //           message: 'CV not found or missing Work Experience',
// //         },
// //       },
// //       { status: 404 },
// //     );
// //   }

// //   resumeData = structuredCV.content as any as Resume;
// //   let responsibilities: string[] = [];

// //   let jobs = resumeData.professional.work;
// //   for (let job of jobs) {
// //     responsibilities.push(`${job.jobTitle}: ${job.jobDetails}`);
// //   }

// //   if (responsibilities.length == 0) {
// //     return NextResponse.json(
// //       {
// //         body: {
// //           message: 'There is no job details to write a summary',
// //         },
// //       },
// //       { status: 500 },
// //     );
// //   }

// //   const replacementMap: Record<string, string> = {
// //     '{original_responsibilities}': responsibilities.join('. '),
// //     '{job_description}': jobDescription,
// //   };

// //   const modifiedPrompt = parserPromt.replace(
// //     /{original_responsibilities}|{job_description}/g,
// //     match => replacementMap[match],
// //   );

// //   const openaiResponse = await openAI.completions.create({
// //     model: 'gpt-3.5-turbo-instruct',
// //     prompt: modifiedPrompt,
// //     max_tokens: 150,
// //   });

// //   const responseContent = openaiResponse?.choices?.[0]?.text;
// //   if (!responseContent) {
// //     return NextResponse.json(
// //       {
// //         body: {
// //           message: 'Unable to rewrite CV',
// //         },
// //       },
// //       { status: 500 },
// //     );
// //   }

// //   resumeData.professional.summary = responseContent.trim();

// //   try {
// //     await prisma.structuredCVs.update({
// //       where: {
// //         id: structuredCV.id,
// //       },
// //       data: {
// //         content: resumeData as any,
// //       },
// //     });
// //   } catch (err) {
// //     console.log(`Updating structuredCV: ${err}`);
// //     return NextResponse.json(
// //       {
// //         body: {
// //           message: 'internal server error',
// //         },
// //       },
// //       { status: 500 },
// //     );
// //   }

// //   return NextResponse.json(
// //     {
// //       body: {
// //         message: 'Successful write summary of CV',
// //       },
// //     },
// //     { status: 201 },
// //   );
// // }

// import { NextRequest, NextResponse } from 'next/server';
// import { getToken } from 'next-auth/jwt';
// import prisma from '../../../lib/prisma';
// import OpenAI from 'openai';
// import { Resume } from './../../../types/resume';

// const parserPrompt = `
// I'd like you to create a compelling CV summary for me.

// Here's what I can provide:

// My current job title and a brief description of my responsibilities (2-3 sentences): {original_responsibilities}
// The job description of the new position I'm applying for (keywords or key skills section is most helpful): {job_description}
// Based on this information, I'd like you to generate a CV summary that:

// Highlights my relevant skills and experience that match the new job description.
// Demonstrates how my current experience positions me for success in the new role.
// Provides a concise and impactful statement that showcases my value proposition.

// Please ensure the summary:

// Considers and records my most important experiences and skills, such as certifications, soft skills, technical skills, awards, or other achievements.
// Reviews job descriptions for positions I'm interested in and notes the overlapping requirements with my qualifications.
// Includes a two- to three-sentence summary that briefly showcases those skills.
// Starts with a key adjective for myself, uses the active voice, and includes key action words to describe my experience.Use third-person.
// `;

// const openAI = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export async function POST(req: NextRequest) {
//   const token = await getToken({ req });

//   if (!token) {
//     console.log('Invalid token');
//     return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
//   }

//   const { resumeId, professionalDetails } = await req.json();

//   console.log('Received payload:', { resumeId, professionalDetails });

//   if (!resumeId || !professionalDetails) {
//     return NextResponse.json(
//       { message: 'IDs or professional details not provided' },
//       { status: 400 },
//     );
//   }

//   try {
//     const structuredCV = await prisma.structuredCVs.findUnique({
//       where: { ownerId: token.sub, id: resumeId },
//       select: { id: true, content: true },
//     });

//     if (!structuredCV?.content) {
//       return NextResponse.json(
//         { message: 'CV not found or missing Work Experience' },
//         { status: 404 },
//       );
//     }

//     const resumeData = structuredCV.content as any as Resume;
//     const responsibilities = resumeData.professional.work
//       .map(job => `${job.jobTitle}: ${job.jobDetails}`)
//       .join('. ');

//     if (!responsibilities) {
//       return NextResponse.json(
//         { message: 'There is no job details to write a summary' },
//         { status: 500 },
//       );
//     }

//     const replacementMap: Record<string, string> = {
//       '{original_responsibilities}': responsibilities,
//       '{job_description}': professionalDetails.currentRole,
//     };

//     const modifiedPrompt = parserPrompt.replace(
//       /{original_responsibilities}|{job_description}/g,
//       match => replacementMap[match],
//     );

//     const openaiResponse = await openAI.completions.create({
//       model: 'gpt-3.5-turbo-instruct',
//       prompt: modifiedPrompt,
//       max_tokens: 150,
//     });

//     const responseContent = openaiResponse?.choices?.[0]?.text;
//     if (!responseContent) {
//       return NextResponse.json(
//         { message: 'Unable to rewrite CV' },
//         { status: 500 },
//       );
//     }

//     resumeData.professional.summary = responseContent.trim();

//     await prisma.structuredCVs.update({
//       where: { id: structuredCV.id },
//       data: { content: resumeData as any },
//     });

//     return NextResponse.json(
//       { generatedSummary: responseContent.trim() },
//       { status: 201 },
//     );
//   } catch (err) {
//     console.error('Error processing request:', err);
//     return NextResponse.json(
//       { message: 'Internal server error' },
//       { status: 500 },
//     );
//   }
// }

import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import prisma from '@/lib/prisma';
import OpenAI from 'openai';
import { Resume } from '@/types/resume';

const parserPrompt = `
I'd like you to create a compelling CV summary for me.

Here's what I can provide:

My current job title and a brief description of my responsibilities (2-3 sentences): {original_responsibilities}
The job description of the new position I'm applying for (keywords or key skills section is most helpful): {job_description}
Based on this information, I'd like you to generate a CV summary that:

Highlights my relevant skills and experience that match the new job description.
Demonstrates how my current experience positions me for success in the new role.
Provides a concise and impactful statement that showcases my value proposition.
Concludes with a complete, well-formed sentence to maintain a clear, professional tone.


Please ensure the summary:

Considers and records my most important experiences and skills, such as certifications, soft skills, technical skills, awards, or other achievements.
Reviews job descriptions for positions I'm interested in and notes the overlapping requirements with my qualifications.
Includes a two- to three-sentence summary that briefly showcases those skills.
Starts with a key adjective for myself, uses the active voice, and includes key action words to describe my experience.Use third-person.
Please keep the summary concise and within the given token limit, ensuring it reads as a complete thought with no incomplete sentences.
`;

const openAI = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    console.log('Invalid token');
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  const { resumeId, professionalDetails } = await req.json();

  console.log('Received payload:', { resumeId, professionalDetails });

  if (!resumeId || !professionalDetails) {
    return NextResponse.json(
      { message: 'IDs or professional details not provided' },
      { status: 400 },
    );
  }

  try {
    const structuredCV = await prisma.structuredCVs.findUnique({
      where: { ownerId: token.sub, id: resumeId },
      select: { id: true, content: true },
    });

    if (!structuredCV?.content) {
      return NextResponse.json(
        { message: 'CV not found or missing Work Experience' },
        { status: 404 },
      );
    }

    const resumeData = structuredCV.content as any as Resume;
    const responsibilities = resumeData.professional.work
      .map(job => `${job.jobTitle}: ${job.jobDetails}`)
      .join('. ');

    if (!responsibilities) {
      return NextResponse.json(
        { message: 'There is no job details to write a summary' },
        { status: 500 },
      );
    }

    const replacementMap: Record<string, string> = {
      '{original_responsibilities}': responsibilities,
      '{job_description}': professionalDetails.currentRole,
    };

    const modifiedPrompt = parserPrompt.replace(
      /{original_responsibilities}|{job_description}/g,
      match => replacementMap[match],
    );

    const openaiResponse = await openAI.completions.create({
      model: 'gpt-3.5-turbo-instruct',
      prompt: modifiedPrompt,
      max_tokens: 150,
    });

    const responseContent = openaiResponse?.choices?.[0]?.text;
    if (!responseContent) {
      return NextResponse.json(
        { message: 'Unable to rewrite CV' },
        { status: 500 },
      );
    }

    resumeData.professional.summary = responseContent.trim();

    await prisma.structuredCVs.update({
      where: { id: structuredCV.id },
      data: { content: resumeData as any },
    });

    return NextResponse.json(
      { generatedSummary: responseContent.trim() },
      { status: 201 },
    );
  } catch (err) {
    console.error('Error processing request:', err);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
