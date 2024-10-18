import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { Coverletter, CoverletterSchema } from '@/types/coverletter';
import prisma from '@/lib/prisma';

const MAX_COVERLETTERS = 10;

class TooManyCoverlettersError extends Error {
  constructor(message: string) {
    super(message);
  }
}

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
    console.log(`Invalid coverletter: ${isValid.error}`);
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
    await prisma.$transaction(async tx => {
      const count = await tx.coverLetters.count({
        where: { ownerId: token.sub },
      });

      if (count >= MAX_COVERLETTERS) {
        throw new TooManyCoverlettersError(
          `Too many coverletters, cannot have more than ${MAX_COVERLETTERS}`,
        );
      }

      // Ensure the content is a string. Adjust the property name as needed.
      const content = coverletter.content as string; // Make sure to extract the correct string

      createdCoverletter = await tx.coverLetters.create({
        data: {
          ownerId: token.sub!,
          content: content, // Pass the string content
          jobDescription: coverletter.jobDescription || '',
          resumeId: coverletter.resumeId || '',
        },
        select: {
          id: true,
        },
      });

      console.log('Created a new coverletter with id:', createdCoverletter.id);
    });
  } catch (err) {
    console.log(`Create coverletter: ${err}`);

    if (err instanceof TooManyCoverlettersError) {
      return NextResponse.json(
        {
          body: {
            message: `Cannot create more than ${MAX_COVERLETTERS} coverletters. Please upgrade your subscription.`,
          },
        },
        { status: 400 },
      );
    }

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
        id: createdCoverletter!.id,
      },
    },
    { status: 201 },
  );
}
