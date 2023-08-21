import axios from 'axios';
import { compare } from 'bcryptjs';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

interface User {
  id: string;
  username: string;
  password: string;
  full_name: string;
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Sign in',
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
      async authorize(credentials) {
        try {
          const response = await axios.post(
            'http://localhost:8000/login',
            credentials,
            {
              headers: { 'Content-Type': 'application/json' },
            }
          );

          const users = response.data;

          if (!credentials?.username || !credentials.password) {
            return null;
          }

          const user = users.find(
            (userData: User) => userData.username === credentials.username
          );

          if (!user || !(await compare(credentials.password, user.password))) {
            return null;
          }

          return {
            id: user.id,
            username: user.username,
            full_name: user.full_name,
            randomKey: 'Hey cool',
          };
        } catch (error) {
          console.error('Error loading response data:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      console.log('Session Callback', { session, token });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
        },
      };
    },
    jwt: ({ token, user }) => {
      console.log('JWT Callback', { token, user });
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
        };
      }
      return token;
    },
  },
};

// import { NextAuthOptions } from 'next-auth';
// import Credentials from 'next-auth/providers/credentials';

// export const authOptions: NextAuthOptions = {
//   providers: [
//     Credentials({
//       name: 'Credentials',
//       credentials: {
//         username: { label: 'Username' },
//         password: { label: 'Password' },
//       },
//       authorize(credentials, req) {
//         // Perform database operations

//         if (
//           credentials?.username === 'siegfred' &&
//           credentials.password === 'siegypassword'
//         ) {
//           return {
//             id: '1',
//             email: 'admin@example.com',
//           };
//         }

//         return null;
//       },
//     }),
//   ],
//   pages: {
//     signIn: '/pages/signin',
//   },
// };
