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
import { useTranslations } from 'next-intl';

const credentialsSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must have more than 8 characters')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter'),
});
interface Credentials {
  email: string;
  password: string;
}

const Login = () => {
  const t = useTranslations('LoginPage');
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
          // message: response.error.toString() || 'Invalid email or password',
          message:
            'We cannot find an account with that email address. Please check your entry or create a new account.',
        });
      } else {
        router.push('/eazyCV/dashboard');
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
              <LoginTitle>{t('login')}</LoginTitle>
            </LoginTitleContainer>
            <InputLabel>{t('email')}</InputLabel>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  type="email"
                  name="email"
                  placeholder={t('enterEmail')}
                  value={field.value || ''}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.email && (
              <ErrorContainer>{errors.email.message}</ErrorContainer>
            )}
            <InputLabel>{t('password')}</InputLabel>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <div>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder={t('enterPassword')}
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
              <ForgotPasswordLink>{t('forgotPassword')}</ForgotPasswordLink>
            </Link>
          </ForgotPasswordContainer>
          <SignInButtonContainer>
            <SignInButton type="submit">{t('signin')}</SignInButton>
          </SignInButtonContainer>
        </form>
        <Providers>
          <ProviderContainer>
            <ProviderButton onClick={loginWithGoogle}>
              <ProviderIcon>
                <FcGoogle />
              </ProviderIcon>
              {t('google')}
            </ProviderButton>
          </ProviderContainer>
          <ProviderContainer>
            <ProviderButton onClick={loginWithLinkedIn}>
              <ProviderIcon>
                <FaLinkedin />
              </ProviderIcon>
              {t('linkedin')}
            </ProviderButton>
          </ProviderContainer>
        </Providers>
        <CreateAccountContainer>
          <CreateAccountTitle>{t('noAccount')}</CreateAccountTitle>
        </CreateAccountContainer>
        <CreateAccountButtonContainer>
          <Link href={'/signup'}>
            <CreateAccountButton>{t('createAccount')}</CreateAccountButton>
          </Link>
        </CreateAccountButtonContainer>
      </LoginContainer>
    </Container>
  );
};

export default Login;
