// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { isAuthenticated } from './utils/Auth';
// import createMiddleware from 'next-intl/middleware';
// import { routing } from './i18n/routing';

// // Define your protected routes
// const protectedRoutes = ['/eazyCV/dashboard'];

// // Create the NextIntl middleware
// const intlMiddleware = createMiddleware(routing);

// // Combine both middlewares into a single function
// export default async function middleware(req: NextRequest) {
//   // First, handle internationalization middleware
//   const intlResponse = await intlMiddleware(req);

//   // If the internationalization middleware already handles the request, return that response
//   if (intlResponse) {
//     return intlResponse;
//   }

//   // Now, handle authentication
//   if (!isAuthenticated() && protectedRoutes.includes(req.nextUrl.pathname)) {
//     const absoluteURL = new URL('/', req.nextUrl.origin);
//     return NextResponse.redirect(absoluteURL.toString());
//   }

//   // If everything is fine, return null to continue the request
//   return NextResponse.next();
// }

// // Configuration for the internationalization middleware
// export const config = {
//   // Match only internationalized pathnames
//   matcher: ['/', '/(fi|en)/:path*'],
// };

// /middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isAuthenticated } from './utils/Auth';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Define your protected routes
const protectedRoutes = ['/eazyCV/dashboard'];

// Create the NextIntl middleware
const intlMiddleware = createMiddleware(routing);

// Combine both middlewares into a single function
export default async function middleware(req: NextRequest) {
  // Handle internationalization middleware first
  const intlResponse = await intlMiddleware(req);

  // If the internationalization middleware already handles the request, return that response
  if (intlResponse) {
    return intlResponse;
  }

  // Now handle authentication
  if (!isAuthenticated() && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL('/', req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  // If everything is fine, return null to continue the request
  return NextResponse.next();
}

// Configuration for the internationalization middleware
export const config = {
  // Match all routes that should be localized
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)', // Exclude static files
    '/(fi|en)/:path*', // Include routes for specific locales
  ],
};
