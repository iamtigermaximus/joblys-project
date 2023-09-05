'use client';

//import { breakpoints as bp } from '../utils/layout';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  border-radius: 20px;
  margin: 20px;
  /* border: 1px solid red; */
  display: flex;
  justify-content: center;
  padding: 30px;
`;

export const ChatbotContainer = styled.div`
  width: 600px;
  height: 600px;
  background-color: white;
  border-radius: 20px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ConversationContainer = styled.div`
  width: 500px;
  height: 400px;
  border-radius: 20px;
  border: 1px solid #232946;
  overflow: auto;
`;

export const QuestionContainer = styled.div`
  border-radius: 20px;
  border: 1px solid #232946;
  margin: 10px;
  padding: 20px;
  text-align: left;
  background: #232946;
  color: white;
`;

export const AnswerContainer = styled.div`
  border-radius: 20px;
  border: 1px solid #b8c1ec;
  margin: 10px;
  padding: 20px;
  text-align: right;
  background: #b8c1ec;
  color: #232946;
`;

export const InputContainer = styled.div`
  width: 500px;
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
