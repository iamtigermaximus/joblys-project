'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import {
  Container,
  ErrorContainer,
  EyeIcon,
  Input,
  InputContainer,
  InputForm,
  InputLabel,
  ProviderButton,
  ProviderContainer,
  ProviderIcon,
  Providers,
  SignUpButton,
  SignUpButtonContainer,
  SignUpContainer,
  SignUpTitle,
  SignUpTitleContainer,
} from './SignUp.styles';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { FaLinkedin } from 'react-icons/fa6';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';

const signupSchema = z.object({
  fullname: z
    .string()
    .min(1, 'Full name is required')
    .min(5, 'Please enter your full name')
    .max(255, 'Full name should not exceed 255 characters'),

  email: z.string().min(1, 'Email is required').max(255).email('Invalid email'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/,
      'Password must contain at least one number, one uppercase letter, and one lowercase letter',
    ),
});

interface FormData {
  fullname: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const t = useTranslations('SignUpPage');
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (
    data: z.infer<typeof signupSchema>,
  ) => {
    try {
      signupSchema.parse(data);

      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullname: data.fullname,
          email: data.email,
          password: data.password,
        }),
      });

      if (response.ok) {
        const loginResponse = await signIn('credentials', {
          redirect: false,
          email: data.email,
          password: data.password,
        });

        if (loginResponse?.ok) {
          router.push('/eazyCV/profile');
        } else {
          console.error('Automatic login failed.');
        }
      } else {
        console.error('Registration failed.');
      }

      reset();
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach(validationError => {
          setError(validationError.path[0] as keyof FormData, {
            type: 'manual',
            message: validationError.message,
          });
        });
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  const loginWithGoogle = () =>
    signIn('google', { callbackUrl: '/eazyCV/profile' });

  const loginWithLinkedIn = () =>
    signIn('linkedin', { callbackUrl: '/eazyCV/profile' });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Container>
      <SignUpContainer>
        <InputForm onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <SignUpTitleContainer>
              <SignUpTitle>{t('signup')}</SignUpTitle>
            </SignUpTitleContainer>
            <InputLabel>{t('fullname')}</InputLabel>
            <Input
              type="text"
              placeholder={t('enterFullname')}
              {...register('fullname', { required: 'Full name is required' })}
              defaultValue=""
            />
            {errors.fullname && (
              <ErrorContainer>{errors.fullname.message}</ErrorContainer>
            )}
            <InputLabel>Email</InputLabel>
            <Input
              type="email"
              placeholder={t('enterEmail')}
              {...register('email', {
                required: 'Email is required',
                maxLength: 255,
                pattern: /^\S+@\S+$/i,
              })}
              defaultValue=""
            />
            {errors.email && (
              <ErrorContainer>{errors.email.message}</ErrorContainer>
            )}
            <InputLabel>{t('password')}</InputLabel>
            <div>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder={t('enterPassword')}
                {...register('password', {
                  required: 'Password is required',
                  pattern: {
                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/,
                    message:
                      'Password must contain at least one number, one uppercase letter, and one lowercase letter',
                  },
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters long',
                  },
                  maxLength: {
                    value: 50,
                    message: 'Password should not exceed 50 characters',
                  },
                })}
                defaultValue=""
              />
              <EyeIcon onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </EyeIcon>
            </div>

            {errors.password && (
              <ErrorContainer>{errors.password.message}</ErrorContainer>
            )}
            <SignUpButtonContainer>
              <SignUpButton type="submit">{t('createUser')}</SignUpButton>
            </SignUpButtonContainer>
          </InputContainer>
        </InputForm>
        <Providers>
          <ProviderContainer>
            <ProviderButton onClick={loginWithGoogle}>
              <ProviderIcon>
                <FcGoogle />
              </ProviderIcon>
              {t('google')}{' '}
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
      </SignUpContainer>
    </Container>
  );
};

export default SignUp;
