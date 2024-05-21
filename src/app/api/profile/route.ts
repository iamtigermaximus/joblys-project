import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { Profile, ProfileSchema } from '@/types/profile';
import prisma from '../../../lib/prisma';

export async function POST(req: NextRequest) {
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

  const user = await prisma.user.findUnique({
    where: {
      id: token?.sub,
    },
  });

  if (!user) {
    console.log('User not found');
    return NextResponse.json(
      {
        body: {
          message: 'user not found',
        },
      },
      { status: 401 },
    );
  }

  let { profile } = (await req.json()) as { profile: Profile };
  if (!profile) {
    return NextResponse.json(
      {
        body: {
          message: 'profile not provided',
        },
      },
      { status: 400 },
    );
  }

  const isValidProfile = ProfileSchema.safeParse(profile);
  if (!isValidProfile.success) {
    console.log(`Invalid profile: ${isValidProfile.error}`);
    return NextResponse.json(
      {
        body: {
          message: 'invalid profile',
        },
      },
      { status: 400 },
    );
  }

  console.log('Storing the profile...');

  let persistedProfile;
  try {
    persistedProfile = await prisma.profiles.create({
      data: {
        ownerId: token.sub!,
        content: profile as any,
      },
      select: {
        id: true,
      },
    });
    console.log('Stored a new profile with id:', persistedProfile.id);
  } catch (err) {
    console.log(`Create profiles: ${err}`);
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
        id: persistedProfile.id,
      },
    },
    { status: 201 },
  );
}
