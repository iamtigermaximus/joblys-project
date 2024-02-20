import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt'
import { ProfessionalExperienceType, Resume } from '@/types/profile';
import prisma from '../../../lib/prisma';
import { z } from 'zod';

const resumeSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  email: z.string(),
  address: z.string(),
  linkedin: z.string(),
  additionalLinks: z.array(z.object({
    id: z.string(),
    url: z.string(),
  })),
  professional: z.array(z.object({
    id: z.string(),
    jobTitle: z.string(),
    company: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    jobDetails: z.string(),
  })),
  education: z.array(z.object({
    id: z.string(),
    school: z.string(),
    course: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    description: z.string(),
  })),
  skills: z.array(z.object({
    id: z.string(),
    name: z.string(),
  })),
  languages: z.array(z.object({
    id: z.string(),
    name: z.string(),
  })),
});

export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  if (!token || !token.sub) {
    console.log('invalid token');
    return NextResponse.json(
      {
        body: {
          message: 'invalid token',
        }
      },
      { status: 401 }
    );
  }

  let { id, resume } = (await req.json()) as { id: string, resume: Resume };
  if (!resume || !id) {
    return NextResponse.json(
      {
        body: {
          message: 'Resume or id not provided',
        }
      },
      { status: 400 }
    );
  }

  const isValidResume = resumeSchema.safeParse(resume);
  if (!isValidResume.success) {
    console.log(`Invalid resume: ${isValidResume.error}`);
    return NextResponse.json(
      {
        body: {
          message: 'invalid resume',
        }
      },
      { status: 400 }
    );
  }

  console.log('Updating the resume...');
  try {
    await prisma.structuredCVs.update({
      where: {
        id: id,
        ownerId: token.sub,
      },
      data: {
        content: resume as any,
      }
    });
  } catch (err) {
    console.log(`Update structuredCVs: ${err}`);
    return NextResponse.json(
      {
        body: {
          message: 'internal server error',
        }
      },
      { status: 500 }
    );
  }

  console.log('Successfully updated the resume');

  return NextResponse.json(
    {
      body: {
        message: 'success',
      }
    },
    { status: 200 }
  );
}
