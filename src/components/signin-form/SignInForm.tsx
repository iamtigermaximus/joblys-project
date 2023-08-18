'use client';
import React, { FormEventHandler, useState } from 'react';

import Link from 'next/link';
import { signIn } from 'next-auth/react';
import {
  Container,
  LoginContainer,
  InputContainer,
  LoginTitleContainer,
  LoginTitle,
  InputLabel,
  Input,
  ForgotPasswordContainer,
  ForgotPasswordLink,
  SignInButtonContainer,
  SignInButton,
  CreateAccountContainer,
  CreateAccountTitle,
  CreateAccountButton,
} from './SignInForm.styles';
// import { useRouter } from 'next/router';

const SignInForm = () => {
  // const { data } = useSession();
  // const router = useRouter();
  const [userInfo, setUserInfo] = useState({
    username: '',
    password: '',
  });
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const res = await signIn('credentials', {
      username: userInfo.username,
      password: userInfo.password,
      redirect: false,
    });

    console.log(res);
  };
  return (
    <Container>
      <div>
        <title>Sign In</title>
      </div>
      <LoginContainer>
        <form onSubmit={handleSubmit}>
          <InputContainer>
            <LoginTitleContainer>
              <LoginTitle>Sign In</LoginTitle>
            </LoginTitleContainer>
            <InputLabel>Username</InputLabel>
            <Input
              value={userInfo.username}
              onChange={({ target }) =>
                setUserInfo({ ...userInfo, username: target.value })
              }
              type="text"
              placeholder="Enter username"
            />
            <InputLabel>Password</InputLabel>
            <Input
              value={userInfo.password}
              onChange={({ target }) =>
                setUserInfo({ ...userInfo, password: target.value })
              }
              type="password"
              placeholder="Enter password"
            />
            <ForgotPasswordContainer>
              <Link href={'/auth/forgot-password'}>
                <ForgotPasswordLink>Forgot your password?</ForgotPasswordLink>
              </Link>
            </ForgotPasswordContainer>
            <SignInButtonContainer>
              <SignInButton type="submit" value="Login">
                Sign in
              </SignInButton>
            </SignInButtonContainer>
            <CreateAccountContainer>
              <CreateAccountTitle>
                Don&apos;t have an account yet?
              </CreateAccountTitle>
            </CreateAccountContainer>
            <SignInButtonContainer>
              <Link href={'/auth/signup'}>
                <CreateAccountButton>Create account</CreateAccountButton>
              </Link>
            </SignInButtonContainer>
          </InputContainer>
        </form>
      </LoginContainer>
    </Container>
  );
};

export default SignInForm;
