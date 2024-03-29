import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import LinkedInProvider from 'next-auth/providers/linkedin';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from './prisma';
import { compare } from 'bcrypt';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/login'
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    LinkedInProvider({
      clientId: String(process.env.LINKEDIN_CLIENT_ID),
      clientSecret: String(process.env.LINKEDIN_CLIENT_SECRET),
      authorization: {
        params: { scope: 'openid profile email' }
      },
      issuer: 'https://www.linkedin.com',
      jwks_endpoint: 'https://www.linkedin.com/oauth/openid/jwks',
      profile(profile, tokens) {
        const defaultImage =
          'https://cdn-icons-png.flaticon.com/512/174/174857.png';
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture ?? defaultImage,
          fullname: profile.fullname
        };
      }
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'Enter email'
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Enter password'
        }
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        const existingUser = await prisma.user.findUnique({
          where: { email: credentials?.email }
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
          fullname: existingUser.fullname
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          fullname: user.fullname
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          fullname: token.fullname
        }
      };
    }
  }
};
