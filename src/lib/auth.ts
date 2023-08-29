import axios from 'axios';
import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    Credentials({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'Enter username',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Enter password',
        },
      },
      async authorize(credentials, req) {
        try {
          const users = [
            { id: '1', username: 'siegfred', password: 'siegfred' },
            // Add more user objects if needed
          ];

          // if (!credentials || !credentials.username || !credentials.password) {
          //   throw new Error('Invalid credentials format');
          // }

          // const user = await loginUser(credentials);

          const user = users.find(
            (u) =>
              u.username === credentials?.username &&
              u.password === credentials.password
          );

          if (user) {
            return user;
          } else {
            throw new Error('Invalid credentials');
          }
        } catch (error: any) {
          // Specify 'any' as the error type
          throw new Error(error.message);
        }
      },
    }),
  ],
  pages: {
    signIn: '/pages/signin',
  },
};
