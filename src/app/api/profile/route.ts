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

  console.log('Updating the profile...');

  try {
    const existingProfile = await prisma.profiles.findUnique({
      where: { ownerId: user.id },
    });

    if (existingProfile) {
      // Profile exists, update it
      await prisma.profiles.update({
        where: { id: existingProfile.id },
        data: { content: profile as any },
      });

      console.log('Updated existing profile with id:', existingProfile.id);
      return NextResponse.json({ message: 'Profile updated' }, { status: 200 });
    } else {
      // Profile does not exist, create it
      const persistedProfile = await prisma.profiles.create({
        data: {
          ownerId: user.id,
          content: profile as any,
        },
        select: {
          id: true,
        },
      });
      console.log('Stored a new profile with id:', persistedProfile.id);
      return NextResponse.json(
        {
          body: {
            id: persistedProfile.id,
          },
        },
        { status: 201 },
      );
    }
  } catch (err) {
    console.log(`Error updating/creating profile: ${err}`);
    return NextResponse.json(
      {
        body: {
          message: 'internal server error',
        },
      },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  const token = await getToken({ req });
  if (!token) {
    console.error('Invalid token');
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: token.sub },
  });

  if (!user) {
    console.error('User not found');
    return NextResponse.json({ message: 'User not found' }, { status: 401 });
  }

  try {
    const profile = await prisma.profiles.findUnique({
      where: { ownerId: user.id },
    });

    if (!profile) {
      return NextResponse.json(
        { message: 'Profile not found' },
        { status: 404 },
      );
    }

    return NextResponse.json(profile, { status: 200 });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
