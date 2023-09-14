export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/pages/create-profile', '/pages/create-profile/chatbot'],
};
