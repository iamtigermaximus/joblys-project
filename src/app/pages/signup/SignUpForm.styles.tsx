'use client';

import styled from 'styled-components';
import { breakpoints as bp } from '../../../utils/layout';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  background: transparent;
  width: 100vw;

  @media (min-width: ${bp.lg}) {
    width: 100%;
    height: 750px;
    padding: 50px 0;
  }
`;

export const SignUpContainer = styled.div`
  background: white;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 20px;
  margin: 20px;
  flex-direction: column;
  border-radius: 20px;

  @media (min-width: ${bp.md}) {
    max-width: 500px;
  }
`;

export const SignUpTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;
export const SignUpTitle = styled.h1`
  text-shadow: 0.6px 0 0;
  font-size: 20px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Input = styled.input`
  border-radius: 5px;
  padding: 10px;
  margin: 0 20px;
`;

export const InputLabel = styled.label`
  margin-left: 20px;
  padding: 10px 0;
  font-size: 10px;

  @media (min-width: ${bp.md}) {
    font-size: 15px;
  }
`;

export const SignUpButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
`;
export const SignUpButton = styled.button`
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
export const InputForm = styled.form`
  width: 100%;
  > .error {
    color: #fff;
    margin-bottom: 10px;
  }
`;
export const ErrorMessage = styled.p`
  color: red;
  margin-left: 25px;
  font-size: 12px;
`;
export const FormSubmittedMessage = styled.p`
  color: green;
  margin: 25px;
  font-size: 12px;
`;
export const LoginLinkButton = styled.button`
  background: white;
  padding: 10px;
  width: 100%;
  border: 1px solid black;
  border-radius: 15px;
  font-size: 15px;
  font-weight: 500;
`;

export const ProviderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 15px;
  width: 100%;
`;

export const Providers = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #232946;
  padding-top: 15px;
`;

export const ProviderButton = styled.button`
  background: #232946;
  color: #b8c1ec;
  padding: 10px;
  width: 100%;
  border: 1px solid #232946;
  border-radius: 15px;
  font-size: 15px;
  font-weight: 500;
  margin: 5px;

  &:hover {
    background: #b8c1ec;
    border: 1px solid #b8c1ec;
    color: #232946;
  }
`;

export const ProviderIcon = styled.span`
  padding: 10px;
  font-size: 18px;
  font-weight: 500;
`;
