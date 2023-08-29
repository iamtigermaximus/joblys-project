'use client';
import React, { ChangeEvent, useState } from 'react';
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
} from './SignUpForm.styles';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { FaLinkedin } from 'react-icons/fa6';
import axios from 'axios';

const SignUpForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    full_name: '',
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted');

    try {
      const response = await axios.post(
        'http://localhost:8000/register',
        formData
      );

      if (response.status === 200) {
        router.push('/pages/create-profile');
      } else {
        console.error('Registration error:', response.data);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  return (
    <Container>
      <div>
        <title>PROFILE</title>
      </div>
      <SignUpContainer>
        <InputForm onSubmit={handleSubmit}>
          <InputContainer>
            <SignUpTitleContainer>
              <SignUpTitle>Create an account</SignUpTitle>
            </SignUpTitleContainer>
            <InputLabel>Username</InputLabel>
            <Input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <InputLabel>Full name</InputLabel>
            <Input
              type="text"
              name="full_name"
              placeholder="Full Name"
              value={formData.full_name}
              onChange={handleChange}
              required
            />
            <InputLabel>Email</InputLabel>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <InputLabel>Password</InputLabel>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
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

export default SignUpForm;
