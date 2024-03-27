import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt'
import { Coverletter, CoverletterSchema } from '@/types/profile';
import prisma from '../../../lib/prisma';

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

  let { id, coverletter: coverletter } = (await req.json()) as { id: string, coverletter: Coverletter };
  if (!coverletter || !id) {
    return NextResponse.json(
      {
        body: {
          message: 'Resume or id not provided',
        }
      },
      { status: 400 }
    );
  }

  const isValid = CoverletterSchema.safeParse(coverletter);
  if (!isValid.success) {
    console.log(`Invalid coverletter: ${isValid.error}`);
    return NextResponse.json(
      {
        body: {
          message: 'invalid coverletter',
        }
      },
      { status: 400 }
    );
  }

  console.log('Updating the coverletter...');
  try {
    await prisma.coverLetters.update({
      where: {
        id: id,
        ownerId: token.sub,
      },
      data: {
        content: coverletter as any,
      }
    });
  } catch (err) {
    console.log(`Update coverLetters: ${err}`);
    return NextResponse.json(
      {
        body: {
          message: 'internal server error',
        }
      },
      { status: 500 }
    );
  }

  console.log('Successfully updated the coverletter');

  return NextResponse.json(
    {
      body: {
        message: 'success',
      }
    },
    { status: 200 }
  );
}
