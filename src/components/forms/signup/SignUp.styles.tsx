'use client';

import styled from 'styled-components';
import { breakpoints as bp } from '../../../utils/layout';
import colors from '../../../utils/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 30px;
  overflow-y: scroll;

  @media (min-width: ${bp.lg}) {
    padding: 50px 100px;
  }
`;

export const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};
  border-radius: 8px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  width: 100%;
  padding: 30px 20px;
  margin: 20px;
  flex-direction: column;

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
  color: ${colors.purple};
  padding: 5px;
  letter-spacing: 1px;
  font-size: 20px;

  @media (min-width: ${bp.md}) {
    font-size: 25px;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  border: 2px solid ${colors.blueGray};
  border-radius: 5px;
  padding: 15px;
  margin: 5px 0;
  font-size: 12px;

  @media (min-width: ${bp.md}) {
    font-size: 15px;
    padding: 20px;
    margin: 5px;
  }
`;

export const InputLabel = styled.label`
  font-size: 10px;
  color: ${colors.blueGray};
  letter-spacing: 1px;
  margin: 5px 0;

  @media (min-width: ${bp.md}) {
    font-size: 15px;
    margin: 5px;
  }
`;

export const SignUpButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  width: 100%;
`;

export const SignUpButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${colors.ashGray};
  border-radius: 5px;
  padding: 20px;
  background-color: ${colors.orange};
  color: ${colors.white};
  font-size: 12px;
  width: 100%;
  letter-spacing: 1px;
  cursor: pointer;

  &:hover {
    background: ${colors.darkPurple};
  }

  @media (min-width: ${bp.md}) {
    font-size: 15px;
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

export const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 10px;
  color: red;
  padding: 0 10px;
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

export const Providers = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #232946;
  padding-top: 15px;
`;

export const ProviderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  width: 100%;
`;

export const ProviderButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${colors.ashGray};
  border-radius: 5px;
  padding: 10px;
  background-color: ${colors.purple};
  color: ${colors.white};
  /* margin: 5px; */
  font-size: 12px;
  width: 100%;
  letter-spacing: 1px;
  cursor: pointer;

  &:hover {
    background: ${colors.darkPurple};
  }

  @media (min-width: ${bp.md}) {
    font-size: 15px;
  }
`;

export const ProviderIcon = styled.span`
  padding: 10px;
  font-size: 18px;
  font-weight: 500;
`;
