import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  return NextResponse.json(
    {
      "result": "ok from post",
    },
    {
      status: 201,
    },
  );
}

export async function GET(req: Request) {
  return NextResponse.json(
    {
      "result": "ok from app/joblys/profile/api/cv",
    },
    {
      status: 200,
    },
  );
}
