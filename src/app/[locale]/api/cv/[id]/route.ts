import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  console.log('Getting stored profile...');

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

  const cvId = req.nextUrl.pathname.split('/').pop();
  if (!cvId) {
    console.log('No CV ID provided');
    return NextResponse.json(
      {
        body: {
          message: 'no CV ID provided',
        },
      },
      { status: 400 },
    );
  }

  console.log(`Fetching profile id: ${cvId}`);

  let structuredCV;
  try {
    structuredCV = await prisma.structuredCVs.findUnique({
      where: {
        ownerId: token?.sub,
        id: cvId,
      },
      select: {
        id: true,
        name: true,
        content: true,
      },
    });
  } catch (err) {
    console.log(`Fetching parsed CV: ${err}`);
    return NextResponse.json(
      {
        body: {
          message: 'internal server error',
        },
      },
      { status: 500 },
    );
  }

  if (!structuredCV || !structuredCV.content) {
    console.log('No resume found');
    return NextResponse.json(
      {
        body: {
          message: 'no resume found',
        },
      },
      { status: 404 },
    );
  }

  return NextResponse.json(
    {
      body: {
        id: structuredCV?.id,
        name: structuredCV?.name,
        profile: structuredCV?.content,
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

  const cvId = req.nextUrl.pathname.split('/').pop();
  if (!cvId) {
    console.log('No CV ID provided');
    return NextResponse.json(
      {
        body: {
          message: 'no CV ID provided',
        },
      },
      { status: 400 },
    );
  }

  console.log(`Deleting profile id: ${cvId}`);

  try {
    await prisma.structuredCVs.delete({
      where: {
        id: cvId,
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

  console.log('Successfully deleted the CV');

  return NextResponse.json(
    {
      body: {
        message: 'CV deleted successfully',
      },
    },
    { status: 200 },
  );
}
