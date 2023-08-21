// import React from 'react';
// import { Container } from './page.styles';
// import {
//   LoginButton,
//   RegisterButton,
//   LogoutButton,
//   ProfileButton,
// } from '@/components/buttons/Buttons';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/lib/auth';
// import { User } from '@/components/user/User';

// const Home = async () => {
//   const session = await getServerSession(authOptions);
//   console.log(session);
//   return (
//     <Container>
//       {/* <div
//         style={{
//           display: 'flex',
//           justifyContent: 'center',
//           flexDirection: 'column',
//           alignItems: 'center',
//           height: '70vh',
//         }}
//       >
//         <LoginButton />
//         <RegisterButton />
//         <LogoutButton />
//         <ProfileButton />

//         <h1>Server Session</h1>
//         <pre>{JSON.stringify(session)}</pre>

//         <User />
//       </div> */}
//       HOME
//     </Container>
//   );
// };
// export default Home;

'use client';

import { Box, Container } from './page.styles';
import Image from 'next/image';
import Image1 from '../assets/joblys-hero.png';

export default function Home() {
  return (
    <Container>
      <Box>1</Box>
      <Box>
        <Image
          src={Image1}
          width={550}
          height={750}
          alt="Picture of the author"
        />
      </Box>
    </Container>
  );
}
