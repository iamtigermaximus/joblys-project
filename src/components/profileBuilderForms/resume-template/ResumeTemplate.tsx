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
        <h2>Basic Details</h2>
        <h6> firstname:{basic?.firstName}</h6>
        <h6>lastname:{basic.lastName}</h6>
        <h6>phonenumber:{basic.phoneNumber}</h6>
        <h6>email:{basic.email}</h6>
        <h6>linkedin:{basic.linkedin}</h6>
        <h6>address:{basic.address}</h6>
        {basic?.additionalLinks.map(link => (
          <div key={link.id}>
            <a href={link.url}>
              link:{link.url}
              <h6></h6>
            </a>
          </div>
        ))}
        <h2>Professional Experience:</h2>
        <h6>summary:{professional?.summary}</h6>
        {professional?.work.map(experience => (
          <div key={experience.id}>
            <h6>jobtitle:{experience.jobTitle}</h6>
            <h6>company:{experience.company}</h6>
            <h6>startdate:{experience.startDate}</h6>
            <h6>enddate{experience.endDate}</h6>
            <h6>jobdetails{experience.jobDetails}</h6>
          </div>
        ))}
        <h2>Educational Experience:</h2>
      </Template>
    </TemplateContainer>
  );
};

export default ResumeTemplate;
