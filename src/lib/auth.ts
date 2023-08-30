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
          const response = await axios.post(
            'http://localhost:8000/login',
            credentials
          );
          const userData = response.data;

          if (userData) {
            return userData;
          } else {
            throw new Error('Invalid credentials');
          }
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  pages: {
    signIn: '/pages/signin',
  },
  callbacks: {
    session: ({ session, token }) => {
      console.log('Session Callback', { session, token });
      return {
        ...session,
        user: {
          ...session.user,
        },
      };
    },
    jwt: ({ token, user }) => {
      console.log('JWT Callback', { token, user });
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
        };
      }
      return token;
    },
  },
};
