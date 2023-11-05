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
} from './SignUp.styles';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { FaLinkedin } from 'react-icons/fa6';
import { signIn } from 'next-auth/react';
import axios from 'axios';
const SignUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
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

  /**
   * ! DOES NOT AUTOMATICALLY SIGN IN YET
   * TODO: SIGN IN UPON SUCCESSFUL SIGN UP
   * TODO: SET SIGNED IN STATUS TO TRUE UPON SUCCESSFUL SIGN UP AND SIGN IN
   * TODO: ADD SIGN UP USING NEXT AUTH PROVIDERS (GOOGLE AND LINKEDIN)
   */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted');

    try {
      const { full_name, email, password } = formData;
      const url = `http://localhost:8000/register?full_name=${full_name}&email=${email}&password=${password}`;

      const response = await axios.post(url);

      if (response.status === 200) {
        router.push('/pages/create-profile');
      } else {
        console.error('Registration error:', response.data);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signIn('google');
      console.log(result);
      if (!result?.error) {
         // Forward to the correct profile creation page and check that the session is logged in
         // also, take the user's email, full name and maybe id? from the provider and create a new user in backend
         router.push('/pages/navbar-links/profile');
      }
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  return (
    <Container>
      <SignUpContainer>
        <InputForm onSubmit={handleSubmit}>
          <InputContainer>
            <SignUpTitleContainer>
              <SignUpTitle>Create an account</SignUpTitle>
            </SignUpTitleContainer>
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
          </InputContainer>
        </InputForm>
        <Providers>
          <ProviderContainer>
            <ProviderButton onClick={() => handleGoogleSignIn()}>
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
      </SignUpContainer>
    </Container>
  );
};

export default SignUp;
