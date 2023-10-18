'use client';

import { breakpoints as bp } from '../../../../utils/layout';
import colors from '../../../../utils/colors';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const ChatbotContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};
  border-radius: 8px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  width: 100%;

  @media (min-width: ${bp.md}) {
    max-width: 500px;
  }
`;

export const ConversationContainer = styled.div`
  width: 100%;
  height: 400px;
  overflow: auto;
`;

export const QuestionContainer = styled.div`
  border-radius: 3px;
  border: none;
  margin: 10px 0;
  padding: 20px;
  text-align: left;
  background-color: ${colors.purple};
  color: ${colors.white};
`;

export const AnswerContainer = styled.div`
  border-radius: 3px;
  border: none;
  margin: 10px 0;
  padding: 20px;
  text-align: right;
  background-color: ${colors.ashGray};
  color: ${colors.blueGray};
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
  border-radius: 20px;
  border: 1px solid ${colors.blueGray};
  margin: 10px;
`;

export const Input = styled.input`
  width: 350px;
  height: 50px;
  border-radius: 10px;
  border: 1px solid ${colors.blueGray};
  margin: 5px;
  padding: 20px;
`;

export const Button = styled.button`
  width: 100px;
  height: 50px;
  border-radius: 20px;
  border: 1px solid ${colors.blueGray};
  margin: 10px;
  background-color: ${colors.blueGray};
  color: ${colors.white};
`;

export const SectionTitleContainer = styled.div`
  display: flex;
  padding: 20px 0;
`;

export const SectionTitle = styled.h1`
  color: ${colors.purple};
  padding: 5px;
  letter-spacing: 1px;
  font-size: 20px;

  @media (min-width: ${bp.md}) {
    font-size: 25px;
  }
`;
