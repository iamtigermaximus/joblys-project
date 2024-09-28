'use client';

import styled from 'styled-components';
import { breakpoints as bp } from '../../../utils/layout';
import colors from '../../../utils/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 20px 30px;
  overflow-y: scroll;
  /* background-color: #f5f5f5; */

  @media (min-width: ${bp.lg}) {
    padding: 50px 100px;
  }
`;

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: linear-gradient(145deg, #f8f7ff, #eae8ff);
  border-radius: 8px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  width: 100%;
  padding: 30px 20px;
  margin: 20px;
  flex-direction: column;

  @media (min-width: ${bp.sm}) {
    max-width: 400px;
    padding: 30px 40px;
  }

  @media (min-width: ${bp.md}) {
    max-width: 500px;
  }
`;

export const LoginTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const LoginTitle = styled.h1`
  color: #2e033b;
  padding: 5px;
  letter-spacing: 1px;
  font-size: 16px;

  @media (min-width: ${bp.md}) {
    font-size: 20px;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;

  position: relative;

  @media (min-width: ${bp.md}) {
    padding-bottom: 15px;
  }
`;

export const Input = styled.input`
  border: 1px solid ${colors.purple};
  border-radius: 5px;
  padding: 10px;
  /* margin: 5px 0; */
  font-size: 10px;
  width: 100%;
  position: relative;
  outline: none;

  &:focus {
    border: 1px solid ${colors.darkPurple};
  }

  @media (min-width: ${bp.md}) {
    font-size: 15px;
    padding: 15px 20px;
    /* margin: 5px; */
  }
`;

export const InputLabel = styled.label`
  font-size: 8px;
  color: ${colors.darkPurple};
  letter-spacing: 1px;
  margin: 5px 0;

  @media (min-width: ${bp.md}) {
    font-size: 15px;
    margin: 5px;
  }
`;

export const ForgotPasswordContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: ${bp.md}) {
    padding: 10px;
  }
`;

export const ForgotPasswordLink = styled.h1`
  font-size: 12px;
  border-radius: 5px;
  /* padding: 10px 0; */
  margin: 0 20px;
  color: ${colors.purple};
  /* letter-spacing: 1px; */

  @media (min-width: ${bp.md}) {
    font-size: 15px;
  }
`;

export const SignInButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  width: 100%;
`;

export const SignInButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${colors.ashGray};
  border-radius: 5px;
  padding: 10px;
  background-color: ${colors.orange};
  color: ${colors.white};
  font-size: 10px;
  width: 100%;
  letter-spacing: 1px;
  cursor: pointer;

  &:hover {
    background: ${colors.darkPurple};
  }

  @media (min-width: ${bp.md}) {
    font-size: 15px;
    padding: 15px 20px;
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
  /* padding: 10px; */

  @media (min-width: ${bp.md}) {
    padding: 15px;
  }
`;

export const CreateAccountTitle = styled.h1`
  font-size: 12px;
  border-radius: 5px;
  padding: 10px 0;
  margin: 0 20px;
  color: #2e033b;
  /* letter-spacing: 1px; */

  @media (min-width: ${bp.md}) {
    font-size: 15px;
  }
`;

export const CreateAccountButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const CreateAccountButton = styled.button`
  background: ${colors.purple};
  color: ${colors.white};
  padding: 10px;
  width: 100%;
  border: #232946;
  border-radius: 5px;
  font-size: 10px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: ${colors.darkPurple};
    color: ${colors.white};
  }

  @media (min-width: ${bp.md}) {
    font-size: 15px;
    padding: 15px 20px;
  }
`;

export const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 10px;
  color: red;
  padding: 0 10px;
`;

export const Providers = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #232946;
`;

export const ProviderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  width: 100%;
`;

export const ProviderButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${colors.ashGray};
  border-radius: 5px;
  background-color: ${colors.purple};
  color: ${colors.white};
  /* margin: 5px; */
  font-size: 10px;
  width: 100%;
  letter-spacing: 1px;
  cursor: pointer;
  padding: 10px;

  &:hover {
    background: ${colors.darkPurple};
  }

  @media (min-width: ${bp.md}) {
    font-size: 15px;
    padding: 15px 20px;
  }
`;

export const ProviderIcon = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  font-weight: 500;
  padding: 0 10px;

  @media (min-width: ${bp.md}) {
    font-size: 15px;
  }
`;

export const EyeIcon = styled.button`
  position: absolute;
  top: 82%;
  right: 20px;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
`;
