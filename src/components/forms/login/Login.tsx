'use client';

import React, { ChangeEvent, FormEventHandler, useState } from 'react';
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
  ErrorContainer,
  ProviderContainer,
  Providers,
  ProviderButton,
  ProviderIcon,
} from './Login.styles';
import { useSearchParams, useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { FaLinkedin } from 'react-icons/fa6';

interface Credentials {
  email: string;
  password: string;
}

const Login = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState<Credentials>({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/joblys/profile';

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setCredentials({ email: '', password: '' });

      const response = await signIn('credentials', {
        redirect: false,
        email: credentials.email,
        password: credentials.password,
        callbackUrl,
      });

      console.log(response);
      if (!response?.error) {
        router.push('/joblys/profile');
      } else {
        setError('Invalid email or password');
      }
    } catch (error: any) {
      setError(error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  /**
   * ! NOT WORKING PROPERLY
   * TODO : CONFIGURE HOW TO USE GOOGLE AND LINKEDIN AS PROVIDERS IN NEXT AUTH
   * TODO : WHEN GOOGLE SIGN IN, REDIRECT TO PROFILE PAGE WHICH IS PRIVATE ROUTE
   */

  // const handleGoogleSignIn = async () => {
  //   try {
  //     const result = await signIn('google', { callbackUrl: '/callback' });

  //     if (!result?.error) {
  //       router.push('/pages/navbar-links/profile');
  //     }
  //   } catch (error) {
  //     console.error('Google login error:', error);
  //   }
  // };

  return (
    <Container>
      <LoginContainer>
        <form onSubmit={onSubmit}>
          <InputContainer>
            <LoginTitleContainer>
              <LoginTitle>Log In</LoginTitle>
            </LoginTitleContainer>
            <InputLabel>Email</InputLabel>
            <Input
              value={credentials?.email}
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter email"
            />
            <InputLabel>Password</InputLabel>
            <Input
              value={credentials?.password}
              onChange={handleChange}
              name="password"
              type="password"
              placeholder="Enter password"
            />
            <ErrorContainer>{error && <p>{error}</p>}</ErrorContainer>
            <ForgotPasswordContainer>
              <Link href={'/auth/forgot-password'}>
                <ForgotPasswordLink>Forgot your password?</ForgotPasswordLink>
              </Link>
            </ForgotPasswordContainer>
            <SignInButtonContainer>
              <SignInButton type="submit">Sign In</SignInButton>
            </SignInButtonContainer>
            <Providers>
              <ProviderContainer>
                <ProviderButton>
                  <ProviderIcon>
                    <FcGoogle />
                  </ProviderIcon>
                  Continue with Google
                </ProviderButton>
              </ProviderContainer>
              <ProviderContainer>
                <ProviderButton>
                  <ProviderIcon>
                    <FaLinkedin />
                  </ProviderIcon>
                  Continue with LinkedIn
                </ProviderButton>
              </ProviderContainer>
            </Providers>
            <CreateAccountContainer>
              <CreateAccountTitle>
                Don&apos;t have an account yet?
              </CreateAccountTitle>
            </CreateAccountContainer>
            <SignInButtonContainer>
              <Link href={'/signup'}>
                <CreateAccountButton>Create account</CreateAccountButton>
              </Link>
            </SignInButtonContainer>
          </InputContainer>
        </form>
      </LoginContainer>
    </Container>
  );
};

export default Login;
