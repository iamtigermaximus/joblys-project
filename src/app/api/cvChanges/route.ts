import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt'
import prisma from '../../../lib/prisma';

interface Resume {
  id: string;
  content: {
    name: string;
    personal_information: {
      email: string;
      phone_number: string;
      about_me: string;
    };
    work_experience: {
      id: string;
      company_name: string;
      position: string;
      location: string;
      start_date: string;
      end_date: string;
      responsibilities: string[];
    }[];
    personal_projects: {
      name: string;
      start_date: string;
      end_date: string;
    }[];
    education: {
      degree: string;
      location: string;
      start_date: string;
      end_date: string;
      grade: string;
    }[];
    technical_skills: string[];
    languages: string[];
    interests: string[];
  }
}

// Use for validation when the objects match with
// the frontend
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

  const { id, resume } = (await req.json()) as { id: string, resume: Resume };


  if (!resume) {
    return NextResponse.json(
      {
        body: {
          message: 'Resume not provided',
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
        content: resume.content as any,
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
