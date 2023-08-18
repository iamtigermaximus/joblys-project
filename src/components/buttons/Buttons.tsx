'use client';

import { signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import {
  ProfButton,
  RegButton,
  SignInButton,
  SignOutButton,
} from './Buttons.styles';

export const LoginButton = () => {
  return <SignInButton onClick={() => signIn()}>Sign in</SignInButton>;
};

export const RegisterButton = () => {
  return (
    <RegButton>
      <Link href="/register">Register</Link>
    </RegButton>
  );
};

export const LogoutButton = () => {
  return <SignOutButton onClick={() => signOut()}>Sign Out</SignOutButton>;
};

export const ProfileButton = () => {
  return (
    <ProfButton>
      <Link href="/profile">Profile</Link>
    </ProfButton>
  );
};
