// import axios from 'axios';
// import { NextAuthOptions } from 'next-auth';
// import Credentials from 'next-auth/providers/credentials';

// export const authOptions: NextAuthOptions = {
//   session: {
//     strategy: 'jwt',
//   },
//   providers: [
//     Credentials({
//       name: 'Credentials',
//       credentials: {
//         username: {
//           label: 'Username',
//           type: 'text',
//           placeholder: 'Enter username',
//         },
//         password: {
//           label: 'Password',
//           type: 'password',
//           placeholder: 'Enter password',
//         },
//       },
//       // authorize: async (credentials) => {
//       //   try {
//       //     const response = await axios.post(
//       //       'http://localhost:8000/login',
//       //       credentials
//       //     );

//       //     // Check if the login was successful
//       //     if (response.status === 200) {
//       //       const user = response.data;
//       //       return Promise.resolve(user);
//       //     } else {
//       //       return Promise.resolve(null);
//       //     }
//       //   } catch (error) {
//       //     console.error('Login error:', error);
//       //     return Promise.resolve(null);
//       //   }
//       // },
//       async authorize(credentials, req) {
//         // Add logic here to look up the user from the credentials supplied
//         const user = {
//           id: '1',
//           full_name: 'Siegfred Smith',
//           username: 'siegfred',
//           password: 'siegfred',
//         };

//         if (user) {
//           // Any object returned will be saved in `user` property of the JWT
//           return user;
//         } else {
//           // If you return null then an error will be displayed advising the user to check their details.
//           return null;

//           // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     session: ({ session, token }) => {
//       return {
//         ...session,
//         user: {
//           ...session.user,
//           id: token.id,
//           randomKey: token.randomKey,
//         },
//       };
//     },
//     jwt: ({ token, user }) => {
//       if (user) {
//         const u = user as unknown as any;
//         return {
//           ...token,
//           id: u.id,
//           randomKey: u.randomKey,
//         };
//       }
//       return token;
//     },
//   },
// };
