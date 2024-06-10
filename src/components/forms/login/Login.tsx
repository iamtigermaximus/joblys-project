'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { z } from 'zod';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
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
  CreateAccountButtonContainer,
  EyeIcon,
} from './Login.styles';
import { useSearchParams, useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { FaLinkedin } from 'react-icons/fa6';
import { zodResolver } from '@hookform/resolvers/zod';

const credentialsSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must have more than 8 characters'),
});
interface Credentials {
  email: string;
  password: string;
}

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof credentialsSchema>>({
    resolver: zodResolver(credentialsSchema),
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/eazyCV/dashboard';

  const onSubmit: SubmitHandler<Credentials> = async (
    data: z.infer<typeof credentialsSchema>,
  ) => {
    try {
      credentialsSchema.parse(data);

      const response = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl,
      });

      if (response?.error) {
        setError('email', {
          type: 'manual',
          message: response.error.toString() || 'Invalid email or password',
        });
      } else {
        router.push('/eazyCV/profile');
      }
    } catch (error) {
      setError('email', { type: 'manual', message: 'Unexpected error' });
      console.error('Unexpected error:', error);
    }
  };

  const loginWithGoogle = () =>
    signIn('google', { callbackUrl: '/eazyCV/dashboard' });

  const loginWithLinkedIn = () =>
    signIn('linkedin', { callbackUrl: '/eazyCV/dashboard' });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
                  value={field.value || ''}
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
                <div>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Enter password"
                    value={field.value || ''}
                    onChange={field.onChange}
                  />
                  <EyeIcon onClick={togglePasswordVisibility}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </EyeIcon>
                </div>
              )}
            />

            {errors.password && (
              <ErrorContainer>{errors.password.message}</ErrorContainer>
            )}
          </InputContainer>
          <ForgotPasswordContainer>
            <Link href={'/'}>
              <ForgotPasswordLink>Forgot your password?</ForgotPasswordLink>
            </Link>
          </ForgotPasswordContainer>
          <SignInButtonContainer>
            <SignInButton type="submit">Sign In</SignInButton>
          </SignInButtonContainer>
        </form>
        <Providers>
          <ProviderContainer>
            <ProviderButton onClick={loginWithGoogle}>
              <ProviderIcon>
                <FcGoogle />
              </ProviderIcon>
              Continue with Google
            </ProviderButton>
          </ProviderContainer>
          <ProviderContainer>
            <ProviderButton onClick={loginWithLinkedIn}>
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
        <CreateAccountButtonContainer>
          <Link href={'/signup'}>
            <CreateAccountButton>Create account</CreateAccountButton>
          </Link>
        </CreateAccountButtonContainer>
      </LoginContainer>
    </Container>
  );
};

export default Login;
