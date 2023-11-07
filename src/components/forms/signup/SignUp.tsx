'use client';

import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { z } from 'zod';
// import axios from 'axios';
import {
  Container,
  ErrorContainer,
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

const signupSchema = z.object({
  full_name: z
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
      'Password must contain at least one number, one uppercase letter, and one lowercase letter'
    ),
});

interface FormData {
  full_name: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const router = useRouter();
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
    data: z.infer<typeof signupSchema>
  ) => {
    try {
      signupSchema.parse(data);
      console.log('Form Data:', data);

      // const response = await axios.post('http://localhost:8000/register', data);

      // if (response.status === 200) {
      //   router.push('/joblys/login');
      // } else {
      //   console.error('Registration error:', response.data);
      //}
      reset();
      router.push('/login');
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle schema validation errors here
        error.errors.forEach((validationError) => {
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

  return (
    <Container>
      <SignUpContainer>
        <InputForm onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <SignUpTitleContainer>
              <SignUpTitle>Create an account</SignUpTitle>
            </SignUpTitleContainer>
            <InputLabel>Full Name</InputLabel>
            <Input
              type="text"
              placeholder="Enter fullname"
              {...register('full_name', { required: 'Full name is required' })}
              defaultValue="" // Set an initial value
            />
            {errors.full_name && (
              <ErrorContainer>{errors.full_name.message}</ErrorContainer>
            )}
            <InputLabel>Email</InputLabel>
            <Input
              type="email"
              placeholder="Enter email"
              {...register('email', {
                required: 'Email is required',
                maxLength: 255,
                pattern: /^\S+@\S+$/i,
              })}
              defaultValue="" // Set an initial value
            />
            {errors.email && (
              <ErrorContainer>{errors.email.message}</ErrorContainer>
            )}
            <InputLabel>Password</InputLabel>
            <Input
              type="password"
              placeholder="Enter password"
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
              defaultValue="" // Set an initial value
            />
            {errors.password && (
              <ErrorContainer>{errors.password.message}</ErrorContainer>
            )}
            <SignUpButtonContainer>
              <SignUpButton type="submit">Create user</SignUpButton>
            </SignUpButtonContainer>
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
          </InputContainer>
        </InputForm>
      </SignUpContainer>
    </Container>
  );
};

export default SignUp;
