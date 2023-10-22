'use client';

import { signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import {
  LogoutButton,
  // ProfButton,
  SignupButton,
  LoginButton,
  // SignOutButton,
} from './Buttons.styles';


export const LogInButton = () => {
  return <LoginButton onClick={() => signIn()}>Sign in</LoginButton>;
};

export const SignUpButton = () => {
  return (
    <SignupButton>
      <Link href="/signup">Sign Up</Link>
    </SignupButton>
  );
};

export const LogOutButton = () => {
  return <LogoutButton onClick={() => signOut()}>Sign Out</LogoutButton>;
};

// export const ProfileButton = () => {
//   return (
//     <ProfButton>
//       <Link href="/profile">Profile</Link>
//     </ProfButton>
//   );
};
