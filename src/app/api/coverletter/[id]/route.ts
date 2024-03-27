import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import prisma from '../../../../lib/prisma';

export async function GET(req: NextRequest) {
  console.log('Getting stored coverletter...');

  const token = await getToken({ req });
  if (!token && token != null) {
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

  if (!token?.sub) {
    console.log('No user ID provided');
    return NextResponse.json(
      {
        body: {
          message: 'no user ID provided',
        },
      },
      { status: 400 },
    );
  }

  const coverletterId = req.nextUrl.pathname.split('/').pop();
  if (!coverletterId) {
    console.log('No coverletter ID provided');
    return NextResponse.json(
      {
        body: {
          message: 'no coverletter ID provided',
        },
      },
      { status: 400 },
    );
  }

  console.log(`Fetching coverletter id: ${coverletterId}`);

  let coverletter;
  try {
    coverletter = await prisma.coverLetters.findUnique({
      where: {
        ownerId: token?.sub,
        id: coverletterId,
      },
      select: {
        id: true,
        content: true,
      },
    });
  } catch (err) {
    console.log(`Fetching coverletter: ${err}`);
    return NextResponse.json(
      {
        body: {
          message: 'internal server error',
        },
      },
      { status: 500 },
    );
  }

  if (!coverletter || !coverletter.content) {
    console.log('No coverletter found');
    return NextResponse.json(
      {
        body: {
          message: 'no coverletter found',
        },
      },
      { status: 404 },
    );
  }

  return NextResponse.json(
    {
      body: {
        id: coverletter?.id,
        profile: coverletter?.content,
      },
    },
    { status: 200 },
  );
}

export async function DELETE(req: NextRequest) {
  const token = await getToken({ req });
  if (!token) {
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

  const coverletterId = req.nextUrl.pathname.split('/').pop();
  if (!coverletterId) {
    console.log('No coverletter ID provided');
    return NextResponse.json(
      {
        body: {
          message: 'no CV ID provided',
        },
      },
      { status: 400 },
    );
  }

  console.log(`Deleting coverletter id: ${coverletterId}`);

  try {
    await prisma.coverLetters.delete({
      where: {
        id: coverletterId,
      },
    });
  } catch (err) {
    console.log(`Error deleting CV: ${err}`);
    return NextResponse.json(
      {
        body: {
          message: 'internal server error',
        },
      },
      { status: 500 },
    );
  }

  console.log('Successfully deleted the coverletter');

  return NextResponse.json(
    {
      body: {
        message: 'coverletter deleted successfully',
      },
    },
    { status: 200 },
  );
}
