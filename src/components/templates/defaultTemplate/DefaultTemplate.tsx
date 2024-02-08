'use client';

import React, { FC, useState } from 'react';
import { ResumeInfoType } from '@/types/profile';
import styled from 'styled-components';
import { breakpoints as bp } from '../../../utils/layout';
import colors from '../../../utils/colors';

export const DefaultTemplateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 20px;
  overflow-y: auto;

  @media (min-width: ${bp.md}) {
    padding: 20px 100px;
  }

  @media (min-width: ${bp.lg}) {
    padding: 20px 30px;
    height: 100%;
  }
`;

export const Template = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  width: 100%;
  height: 100vh;
  border: 1px solid green;

  &.clicked {
    transform: scale(0.7);
    transition: transform 0.3s ease;
  }
`;
export const BasicContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #232946;
  width: 35%;
  height: 100%;
  padding: 50px 20px;
  color: white;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fffffe;
  width: 65%;
  height: 100%;
  padding: 50px 20px;
`;

interface DefaultTemplateProps {
  resumeInfo: ResumeInfoType;
}
const DefaultTemplate: FC<DefaultTemplateProps> = ({ resumeInfo }) => {
  const basic = resumeInfo?.basic;
  const professional = resumeInfo?.professional;
  const educational = resumeInfo?.educational;
  const skills = resumeInfo?.skills;
  const languages = resumeInfo?.languages;
  const [isClicked, setIsClicked] = useState(false);

  const handleTemplateClick = () => {
    setIsClicked(!isClicked);
  };

  const templateClassName = isClicked ? 'clicked' : '';
  return (
    <DefaultTemplateContainer>
      <Template>
        <BasicContentContainer></BasicContentContainer>
        <ContentContainer></ContentContainer>
      </Template>
    </DefaultTemplateContainer>
  );
};

export default DefaultTemplate;
