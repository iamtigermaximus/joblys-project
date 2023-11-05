import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
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
        // const response = await axios.post(
        //   'http://localhost:8000/login',
        //   credentials
        // );

        // const user = response.data;
        // console.log('USER', user);
        const user = {
          id: '42',
          full_name: 'Siegfred Gamboa',
          email: 'siegy@mail.com',
          password: 'siegfred',
        };

        if (
          credentials?.email === user.email &&
          credentials?.password === user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  pages: {
    signIn: '/',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
