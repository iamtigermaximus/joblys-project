import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from './prisma';
import { compare } from 'bcrypt';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'Enter email',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Enter password',
        },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        const existingUser = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        if (!existingUser) {
          return null;
        }

        if (existingUser.password) {
          const passwordMatch = await compare(
            credentials.password,
            existingUser.password
          );

          if (!passwordMatch) {
            return null;
          }
        }

        return {
          id: existingUser.id,
          name: existingUser.fullname,
          email: existingUser.email,
          fullname: existingUser.fullname,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // console.log(token, user);
      if (user) {
        return {
          ...token,
          fullname: user.fullname,
        };
      }
      return token;
    },
    async session({ session, token }) {
      // console.log(session, token);

      return {
        ...session,
        user: {
          ...session.user,
          fullname: token.fullname,
        },
      };
      return session;
    },
  },
};
