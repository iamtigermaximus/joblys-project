import React from 'react';
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

const SignUpForm = () => {
  const router = useRouter();

  const handleCreateUser = () => {
    router.push('/pages/create-profile');
  };
  return (
    <Container>
      <div>
        <title>PROFILE</title>
      </div>
      <SignUpContainer>
        <InputForm>
          <InputContainer>
            <SignUpTitleContainer>
              <SignUpTitle>Create an account</SignUpTitle>
            </SignUpTitleContainer>
            <InputLabel>Username</InputLabel>
            <Input type="text" />
            <InputLabel>Full name</InputLabel>
            <Input type="text" />
            <InputLabel>Email</InputLabel>
            <Input type="email" />
            <InputLabel>Password</InputLabel>
            <Input type="password" />
            <SignUpButtonContainer>
              <SignUpButton type="submit" onClick={handleCreateUser}>
                Create user
              </SignUpButton>
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
