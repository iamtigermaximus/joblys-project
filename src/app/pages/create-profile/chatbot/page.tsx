'use client';

import React from 'react';
import { Container } from './ChatbotPage.styles';
import PageHeader from '@/components/page-header/PageHeader';

const ChatbotPage = () => {
  return (
    <Container>
      <div>
        <title>CHATBOT PROFILE BUILDER</title>
      </div>
      <PageHeader />
      <h1>CHATBOT PAGE</h1>
    </Container>
  );
};

export default ChatbotPage;
