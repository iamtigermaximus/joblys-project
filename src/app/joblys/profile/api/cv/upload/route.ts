import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  console.log("Debug!");
  return NextResponse.json(
    {
      "result": "ok from post",
    },
    {
      status: 200,
    },
  );
}
