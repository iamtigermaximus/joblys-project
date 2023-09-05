'use client';

import React from 'react';
import { Container } from './ChatbotPage.styles';
import PageHeader from '@/components/page-header/PageHeader';
import Chat from '@/components/chat/Chat';

const ChatbotPage = () => {
  return (
    <Container>
      <div>
        <title>CHATBOT PROFILE BUILDER</title>
      </div>
      <PageHeader />
      <div>
        <Chat />
      </div>
    </Container>
  );
};

export default ChatbotPage;
