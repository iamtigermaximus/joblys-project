import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { Resume, ResumeSchema } from '@/types/resume';
import prisma from '../../../../lib/prisma';

const MAX_CVS = 10;

class TooManyCVsError extends Error {
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

  let { resume } = (await req.json()) as { resume: Resume };
  if (!resume) {
    return NextResponse.json(
      {
        body: {
          message: 'resume not provided',
        },
      },
      { status: 400 },
    );
  }

  const isValidResume = ResumeSchema.safeParse(resume);
  if (!isValidResume.success) {
    console.log(`Invalid resume: ${isValidResume.error}`);
    return NextResponse.json(
      {
        body: {
          message: 'invalid resume',
        },
      },
      { status: 400 },
    );
  }

  console.log('Creating a new resume...');
  let createdStructuredCV;
  try {
    await prisma.$transaction(async tx => {
      const count = await tx.structuredCVs.count({
        where: { ownerId: token.sub },
      });

      if (count >= MAX_CVS) {
        throw new TooManyCVsError(
          `Too many CVs, cannot have more than ${MAX_CVS}`,
        );
      }

      createdStructuredCV = await tx.structuredCVs.create({
        data: {
          ownerId: token.sub!,
          content: resume as any,
        },
        select: {
          id: true,
        },
      });

      console.log('Created a new resume with id:', createdStructuredCV.id);
    });
  } catch (err) {
    console.log(`Create structuredCVs: ${err}`);

    if (err instanceof TooManyCVsError) {
      return NextResponse.json(
        {
          body: {
            message: `Cannot create more than ${MAX_CVS} resumes. Please upgrade your subscription.`,
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
        id: createdStructuredCV!.id,
      },
    },
    { status: 201 },
  );
}

// import { NextRequest, NextResponse } from 'next/server';
// import { getToken } from 'next-auth/jwt';
// import { Resume, ResumeSchema } from '@/types/resume';
// import prisma from '../../../../lib/prisma';

// export async function POST(req: NextRequest) {
//   const token = await getToken({ req });
//   if (!token || !token.sub) {
//     console.log('invalid token');
//     return NextResponse.json(
//       {
//         body: {
//           message: 'invalid token',
//         },
//       },
//       { status: 401 },
//     );
//   }

//   let { resume } = (await req.json()) as { resume: Resume };
//   if (!resume) {
//     return NextResponse.json(
//       {
//         body: {
//           message: 'resume not provided',
//         },
//       },
//       { status: 400 },
//     );
//   }

//   const isValidResume = ResumeSchema.safeParse(resume);
//   if (!isValidResume.success) {
//     console.log(`Invalid resume: ${isValidResume.error}`);
//     return NextResponse.json(
//       {
//         body: {
//           message: 'invalid resume',
//         },
//       },
//       { status: 400 },
//     );
//   }

//   console.log('Creating a new resume...');
//   let createdStructuredCV;
//   try {
//     createdStructuredCV = await prisma.structuredCVs.create({
//       data: {
//         ownerId: token.sub,
//         content: resume as any,
//       },
//       select: {
//         id: true,
//       },
//     });
//     console.log('Created a new resume with id:', createdStructuredCV.id);
//   } catch (err) {
//     console.log(`Create structuredCVs: ${err}`);
//     return NextResponse.json(
//       {
//         body: {
//           message: 'internal server error',
//         },
//       },
//       { status: 500 },
//     );
//   }

//   return NextResponse.json(
//     {
//       body: {
//         id: createdStructuredCV.id,
//       },
//     },
//     { status: 201 },
//   );
// }
