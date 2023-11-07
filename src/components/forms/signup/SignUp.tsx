'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import axios from 'axios';
import {
  Container,
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

const schema = z.object({
  full_name: z.string().min(5).max(255),
  email: z.string().min(5).max(255).email(),
  password: z.string().min(8).max(50),
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
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      schema.parse(data);

      const response = await axios.post('http://localhost:8000/register', data);

      if (response.status === 200) {
        router.push('/joblys/login');
      } else {
        console.error('Registration error:', response.data);
      }
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
            <InputLabel>Full name</InputLabel>
            <Input
              type="text"
              {...register('full_name')}
              placeholder="Full Name"
              required
            />
            {errors.full_name && <p>{errors.full_name.message}</p>}
            <InputLabel>Email</InputLabel>
            <Input
              type="email"
              {...register('email')}
              placeholder="Email"
              required
            />
            {errors.email && <p>{errors.email.message}</p>}
            <InputLabel>Password</InputLabel>
            <Input
              type="password"
              {...register('password')}
              placeholder="Password"
              required
            />
            {errors.password && <p>{errors.password.message}</p>}
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
