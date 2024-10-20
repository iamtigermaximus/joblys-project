'use client';
import React from 'react';
import styled from 'styled-components';
import { breakpoints as bp } from '@/utils/layout';
import { useTranslations } from 'next-intl';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 30px;
  overflow-y: scroll;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  @media (min-width: ${bp.lg}) {
    padding: 30px 100px;
    height: 100%;
  }
`;

const IntroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 200px;
`;

const IntroText = styled.p`
  font-size: 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #2e033b;
`;

const StartButton = styled.button`
  color: white;
  padding: 10px 100px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #520668;

  &:hover {
    background-color: #3e0450;
  }
`;

interface IntroPageProps {
  onStart: () => void;
}

const IntroPage: React.FC<IntroPageProps> = ({ onStart }) => {
  const t = useTranslations('ProfileBuilder');

  return (
    <Container>
      <IntroContainer>
        <IntroText>{t('welcomeTexts')}</IntroText>
        <IntroText>{t('intro')}</IntroText>
        <StartButton onClick={onStart}>{t('start')}</StartButton>
      </IntroContainer>
    </Container>
  );
};

export default IntroPage;
