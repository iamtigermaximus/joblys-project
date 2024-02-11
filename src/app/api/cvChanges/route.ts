import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt'
import { ProfessionalExperienceType, Resume } from '@/types/profile';
import prisma from '../../../lib/prisma';

function isValid(resume: Resume) {
  return resume.id &&
    resume.content?.name &&
    resume.content?.personal_information?.email &&
    resume.content?.personal_information?.phone_number &&
    resume.content?.personal_information?.about_me &&
    resume.content?.work_experience &&
    resume.content?.personal_projects &&
    resume.content?.education &&
    resume.content?.technical_skills &&
    resume.content?.languages &&
    resume.content?.interests;
}

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
