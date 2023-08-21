'use client';

import styled from 'styled-components';
import { breakpoints as bp } from '../../../utils/layout';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
  padding: 50px 0;
  background: transparent;
`;

export const LoginContainer = styled.div`
  background: white;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 500px;
  padding: 20px;
  margin: 20px;
  flex-direction: column;
  border-radius: 20px;

  @media (min-width: ${bp.md}) {
    max-width: 500px;
  }
`;

export const LoginTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  color: #232946;
`;

export const LoginTitle = styled.h1`
  text-shadow: 0.6px 0 0;
  font-size: 20px;
  color: #232946;
  letter-spacing: 1px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

export const Input = styled.input`
  border-radius: 5px;
  padding: 10px;
  color: #232946;
  border-color: #232946;
`;

export const InputLabel = styled.label`
  padding: 10px 0;
  font-size: 10px;
  color: #232946;

  @media (min-width: ${bp.md}) {
    font-size: 15px;
  }
`;

export const ForgotPasswordContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

export const ForgotPasswordLink = styled.h1`
  font-size: 16px;
  border-radius: 5px;
  padding: 10px 0;
  margin: 0 20px;
  color: #232946;
`;

export const SignInButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

export const SignInButton = styled.button`
  background: #232946;
  color: #b8c1ec;
  padding: 10px;
  width: 100%;
  border: 1px solid #232946;
  border-radius: 15px;
  font-size: 15px;
  font-weight: 500;

  &:hover {
    background: #b8c1ec;
    border: 1px solid #b8c1ec;
    color: #232946;
  }
`;

export const SignOutButton = styled.button`
  background: #232946;
  color: white;
  padding: 10px;
  width: 400px;
  border-radius: 15px;
  font-size: 15px;
  font-weight: 500;

  &:hover {
    background: #b8c1ec;
    border: 1px solid #b8c1ec;
    color: #232946;
  }
`;

export const CreateAccountContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
`;

export const CreateAccountTitle = styled.h1`
  text-shadow: 0.6px 0 0;
  font-size: 15px;
  font-weight: 500;

  @media (min-width: ${bp.md}) {
    font-size: 20px;
  }
`;

export const CreateAccountButton = styled.button`
  background: #232946;
  color: #b8c1ec;
  padding: 10px;
  width: 100%;
  border: #232946;
  border-radius: 15px;
  font-size: 15px;
  font-weight: 500;

  &:hover {
    background: #b8c1ec;
    border: 1px solid #b8c1ec;
    color: #232946;
  }
`;

export const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  color: red;
  padding: 10px;
`;
