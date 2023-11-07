'use client';

import React, { ChangeEvent, useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { z } from 'zod';
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

const credentialsSchema = z.object({
  email: z.string().min(5).max(255).email(),
  password: z.string().min(8).max(50),
});
interface Credentials {
  email: string;
  password: string;
}

const Login = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Credentials>({
    defaultValues: { email: '', password: '' },
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/joblys/profile';

  const onSubmit: SubmitHandler<Credentials> = async (data) => {
    try {
      credentialsSchema.parse(data);

      const response = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl,
      });

      if (!response?.error) {
        router.push('/joblys/dashboard');
      } else {
        setError('email', {
          type: 'manual',
          message: response.error.toString() || 'Invalid email or password',
        });
      }
    } catch (error) {
      setError('email', { type: 'manual', message: 'Unexpected error' });
      console.error('Unexpected error:', error);
    }
  };

  return (
    <Container>
      <LoginContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <LoginTitleContainer>
              <LoginTitle>Log In</LoginTitle>
            </LoginTitleContainer>
            <InputLabel>Email</InputLabel>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.email && (
              <ErrorContainer>{errors.email.message}</ErrorContainer>
            )}
            <InputLabel>Password</InputLabel>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.password && (
              <ErrorContainer>{errors.password.message}</ErrorContainer>
            )}

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
