import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { Coverletter, CoverletterSchema } from '@/types/coverletter';
import prisma from '../../../../lib/prisma';

export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  if (!token || !token.sub) {
    console.log('invalid token');
    return NextResponse.json(
      {
        body: {
          message: 'invalid token',
        },
      },
      { status: 401 },
    );
  }

  let { coverletter } = (await req.json()) as { coverletter: Coverletter };
  if (!coverletter) {
    return NextResponse.json(
      {
        body: {
          message: 'coverletter not provided',
        },
      },
      { status: 400 },
    );
  }

  const isValid = CoverletterSchema.safeParse(coverletter);
  if (!isValid.success) {
    console.log(`Invalid resume: ${isValid.error}`);
    return NextResponse.json(
      {
        body: {
          message: 'invalid coverletter',
        },
      },
      { status: 400 },
    );
  }

  console.log('Creating a new coverletter...');
  let createdCoverletter;
  try {
    createdCoverletter = await prisma.coverLetters.create({
      data: {
        ownerId: token.sub,
        content: coverletter as any,
      },
      select: {
        id: true,
      },
    });
    console.log('Created a new coverletter with id:', createdCoverletter.id);
  } catch (err) {
    console.log(`Create coverletter: ${err}`);
    return NextResponse.json(
      {
        body: {
          message: 'internal server error',
        },
      },
      { status: 500 },
    );
  }

  return NextResponse.json(
    {
      body: {
        id: createdCoverletter.id,
      },
    },
    { status: 201 },
  );
}
