'use client';

import { breakpoints as bp } from '../../utils/layout';
import styled from 'styled-components';
import colors from '../../utils/colors';

export const Container = styled.div`
  /* border-radius: 20px; */
  /* border: 1px solid red; */
  display: flex;
  justify-content: center;
`;

export const ChatbotContainer = styled.div`
  width: 100%;
  height: 600px;
  background-color: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: ${bp.md}) {
    width: 100%;
    height: 100%;
  }
`;

export const ConversationContainer = styled.div`
  width: 100%;
  height: 400px;
  /* border-radius: 20px; */
  /* border: 1px solid #232946; */
  overflow: auto;
`;

export const QuestionContainer = styled.div`
  border-radius: 3px;
  border: none;
  margin: 10px 0;
  padding: 20px;
  text-align: left;
  background-color: ${colors.purple};
  color: white;
`;

export const AnswerContainer = styled.div`
  border-radius: 3px;
  border: none;
  margin: 10px 0;
  padding: 20px;
  text-align: right;
  background-color: ${colors.ashGray};
  color: #232946;
`;

export const InputContainer = styled.div`
  width: 100%;
  height: 100px;
  border-radius: 20px;
  border: 1px solid#232946;
  margin: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Input = styled.input`
  width: 350px;
  height: 50px;
  border-radius: 10px;
  border: 1px solid #232946;
  margin: 5px;
  padding: 20px;
`;

export const Button = styled.button`
  width: 100px;
  height: 50px;
  border-radius: 20px;
  border: 1px solid #232946;
  margin: 10px;
  background-color: #232946;
  color: white;
`;
