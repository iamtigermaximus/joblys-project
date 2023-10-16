'use client';

import { breakpoints as bp } from '../../../utils/layout';
import colors from '../../../utils/colors';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const ChatbotContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 600px;
  background-color: ${colors.white};
  border-radius: 20px;

  @media (min-width: ${bp.md}) {
    height: 100%;
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
