// export { default } from 'next-auth/middleware';

// export const config = {
//   matcher: ['/joblys/profile', '/joblys/dashboard', '/joblys/cover-letters'],
// };

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isAuthenticated } from './utils/Auth';

const protectedRoutes = [
  '/joblys/profile',
  '/joblys/dashboard',
  '/joblys/cover-letters',
  '/joblys/resumes',
];

export default function middleware(req: NextRequest) {
  if (!isAuthenticated && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL('/', req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}
