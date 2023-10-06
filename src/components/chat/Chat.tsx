// pages/chat.tsx
import React, { useState } from 'react';
//import useClient from '../../utils/useClient'; // Adjust the import path
import {
  AnswerContainer,
  Button,
  ChatbotContainer,
  Container,
  ConversationContainer,
  Input,
  InputContainer,
  QuestionContainer,
} from './Chat.styles';

const Chat: React.FC = () => {
  // const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>(
  //   []
  // );
  // const [input, setInput] = useState<string>('');

  // const client = useClient(
  //   {
  //     onConnect: () => {
  //       console.log('Connected to server');
  //       // When connected, you can start with an initial question
  //       setMessages((prevMessages) => [
  //         ...prevMessages,
  //         {
  //           text: 'What is your first name?',
  //           isUser: false,
  //         },
  //       ]);
  //     },
  //     onChatResponse: (data) => {
  //       console.log('Received chat response:', data);
  //       setMessages((prevMessages) => [
  //         ...prevMessages,
  //         { text: data.message, isUser: false },
  //       ]);
  //     },
  //     onDisconnect: () => {
  //       console.log('Disconnected from server');
  //     },
  //   },
  //   '/'
  // ); // Replace with your server URL

  // const handleSendMessage = async () => {
  //   if (input.trim() === '') {
  //     return;
  //   }

  //   client.sendMessage(input);
  //   setMessages((prevMessages) => [
  //     ...prevMessages,
  //     { text: input, isUser: true },
  //   ]);
  //   setInput('');
  // };

  return (
    <Container>
      <ChatbotContainer>
        <ConversationContainer>
          <QuestionContainer>
            <h4>What is your first name?</h4>
          </QuestionContainer>
          <AnswerContainer>
            <h4>Siegfred</h4>
          </AnswerContainer>
          <QuestionContainer>
            <h4>What is your last name?</h4>
          </QuestionContainer>
          <AnswerContainer>
            <h4>Gamboa</h4>
          </AnswerContainer>
          <QuestionContainer>
            <h4>Where are you located?</h4>
          </QuestionContainer>
          <AnswerContainer>
            <h4>Helsinki Finland</h4>
          </AnswerContainer>
          <QuestionContainer>
            <h4>What is your position?</h4>
          </QuestionContainer>
          <AnswerContainer>
            <h4>Software Developer</h4>
          </AnswerContainer>
        </ConversationContainer>

        {/* <InputContainer>
          <Input
            type="text"
            // value={input}
            // onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
          />
          <Button>Send</Button>
        </InputContainer> */}
      </ChatbotContainer>
    </Container>
  );
};

export default Chat;
