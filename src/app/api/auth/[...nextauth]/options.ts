// import NextAuth from 'next-auth';
// import { authOptions } from './route';

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

// import axios from 'axios';
import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
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
          username: 'siegfred',
          password: 'siegfred',
        };

        // if (
        //   credentials?.username === user.username &&
        //   credentials?.password === user.password
        // ) {
        //   return user;
        // } else {
        //   return null;
        // }
        return user;
      },
    }),
  ],
  pages: {
    signIn: '/',
  },
};
