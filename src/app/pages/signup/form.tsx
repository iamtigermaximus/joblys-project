import React from 'react';
import {
  Container,
  Input,
  InputContainer,
  InputForm,
  InputLabel,
  SignUpButton,
  SignUpButtonContainer,
  SignUpContainer,
  SignUpTitle,
  SignUpTitleContainer,
} from './SignUpForm.styles';

const SignUpForm = () => {
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
              <SignUpButton type="submit">Create user</SignUpButton>
            </SignUpButtonContainer>
          </InputContainer>
        </InputForm>
      </SignUpContainer>
    </Container>
  );
};

export default SignUpForm;
