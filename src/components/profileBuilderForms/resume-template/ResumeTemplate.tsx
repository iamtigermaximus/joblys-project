'use client';

import React, { FC } from 'react';
import { Template, TemplateContainer } from './ResumeTemplate.styles';
import { ResumeInfoType } from '@/types/profile';

interface ResumeTemplateProps {
  resumeInfo: ResumeInfoType;
}

const ResumeTemplate: FC<ResumeTemplateProps> = ({ resumeInfo }) => {
  const basic = resumeInfo?.basic;
  const professional = resumeInfo?.professional;
  const educational = resumeInfo?.educational;
  const skills = resumeInfo?.skills;
  const languages = resumeInfo?.languages;

  return (
    <TemplateContainer>
      <Template>
        <h1>{basic?.firstName}</h1>
        <h1>{basic.lastName}</h1>
        <h1>{basic.phoneNumber}</h1>
        <h1>{basic.email}</h1>
        <h1>{basic.linkedin}</h1>
        <h1>{basic.address}</h1>
        {basic?.additionalLinks.map(link => (
          <div key={link.id}>
            <a href={link.url}>{link.url}</a>
          </div>
        ))}
        <h1>{professional.summary}</h1>
      </Template>
    </TemplateContainer>
  );
};

export default ResumeTemplate;
