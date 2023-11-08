import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { hash } from 'bcrypt';
import { z } from 'zod';

const userSchema = z.object({
  fullname: z
    .string()
    .min(1, 'Full name is required')
    .min(5, 'Please enter your full name')
    .max(255, 'Full name should not exceed 255 characters'),

  email: z.string().min(1, 'Email is required').max(255).email('Invalid email'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/,
      'Password must contain at least one number, one uppercase letter, and one lowercase letter'
    ),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { fullname, email, password } = userSchema.parse(body);

    // Check if email already exist
    const existingUserByEmail = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        {
          user: null,
          message: 'User with this email already exists.',
        },
        { status: 409 }
      );
    }
    const hashedPassword = await hash(password, 10);

    const newUser = await prisma.user.create({
      data: { fullname, email, password: hashedPassword },
    });

    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      { user: rest, message: 'User created successfully.' },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong.' },
      { status: 500 }
    );
  }
}
