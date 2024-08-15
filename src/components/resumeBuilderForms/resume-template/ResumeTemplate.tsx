'use client';

import React, { FC, useState } from 'react';
import {
  BasicDetail,
  BasicNameContainer,
  Company,
  ContentContainerA,
  ContentContainerB,
  Course,
  CurrentRole,
  Dates,
  DateContainer,
  EducationContainer,
  EducationContainerTitle,
  EducationDescription,
  EducationDetail,
  EducationDetailContainer,
  EmploymentDescription,
  EmploymentDetail,
  EmploymentDetailContainer,
  EnteredLanguage,
  EnteredLanguagesContainer,
  EnteredSkill,
  EnteredSkillsContainer,
  FirstName,
  Header,
  IconContainer,
  JobTitle,
  LanguagesDetailsContent,
  LastName,
  NameContainer,
  PersonalDetailsContainer,
  PersonalDetailsContent,
  PersonalDetailsTitle,
  ProfessionalContainer,
  ProfessionalContainerTitle,
  School,
  SkillsDetailsContent,
  SummaryContainer,
  Template,
  TemplateContainer,
  Year,
  Month,
  DateSeparator,
} from './ResumeTemplate.styles';
import { Resume } from '@/types/resume';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaHome,
  FaLinkedin,
  FaGlobe,
} from 'react-icons/fa';

interface ResumeTemplateProps {
  resumeInfo: Resume;
}

const ResumeTemplate: FC<ResumeTemplateProps> = ({ resumeInfo }) => {
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

  const formatDate = (date: any) => {
    if (typeof date === 'string') {
      return date.toLowerCase() === 'present' ? 'Present' : date;
    }
    if (typeof date === 'object' && date?.month) {
      return new Date(2022, parseInt(date.month) - 1).toLocaleString(
        'default',
        {
          month: 'short',
        },
      );
    }
    return 'Jan';
  };

  const formatYear = (date: any) => {
    if (typeof date === 'string') {
      return date.toLowerCase() === 'present' ? '' : '';
    }
    if (typeof date === 'object' && date?.year) {
      return date.year;
    }
    return '';
  };

  return (
    <TemplateContainer>
      <Template className={templateClassName} onClick={handleTemplateClick}>
        <ContentContainerA>
          <PersonalDetailsContainer>
            <PersonalDetailsTitle>Personal Details</PersonalDetailsTitle>
            <PersonalDetailsContent>
              <IconContainer>
                <FaUser />
              </IconContainer>
              <BasicNameContainer>
                <BasicDetail>{basic.firstName}</BasicDetail>
                <BasicDetail>{basic.lastName}</BasicDetail>
              </BasicNameContainer>
            </PersonalDetailsContent>
            <PersonalDetailsContent>
              <IconContainer>
                <FaEnvelope />
              </IconContainer>
              <BasicDetail>{basic.email}</BasicDetail>
            </PersonalDetailsContent>
            <PersonalDetailsContent>
              <IconContainer>
                <FaPhone />
              </IconContainer>
              <BasicDetail>{basic.phoneNumber}</BasicDetail>
            </PersonalDetailsContent>
            <PersonalDetailsContent>
              <IconContainer>
                <FaHome />
              </IconContainer>
              <BasicDetail>{basic.address}</BasicDetail>
            </PersonalDetailsContent>
            <a href={basic.linkedin}>
              <PersonalDetailsContent>
                <IconContainer>
                  <FaLinkedin />
                </IconContainer>
                <BasicDetail>{basic.linkedin}</BasicDetail>
              </PersonalDetailsContent>
            </a>

            {basic?.additionalLinks.map(link => (
              <div key={link.id}>
                <a href={link.url}>
                  <PersonalDetailsContent>
                    <IconContainer>
                      <FaGlobe />
                    </IconContainer>
                    <BasicDetail>{link.url}</BasicDetail>
                  </PersonalDetailsContent>
                </a>
              </div>
            ))}
          </PersonalDetailsContainer>
          <PersonalDetailsContainer>
            <PersonalDetailsTitle>Skills</PersonalDetailsTitle>
            <SkillsDetailsContent>
              {skills?.map(enteredSkill => (
                <EnteredSkillsContainer key={enteredSkill.id}>
                  <EnteredSkill>{enteredSkill.name}</EnteredSkill>
                </EnteredSkillsContainer>
              ))}
            </SkillsDetailsContent>
          </PersonalDetailsContainer>
          <PersonalDetailsContainer>
            <PersonalDetailsTitle>Languages</PersonalDetailsTitle>
            <LanguagesDetailsContent>
              {languages?.map(enteredLanguage => (
                <EnteredLanguagesContainer key={enteredLanguage.id}>
                  <EnteredLanguage>{enteredLanguage.name}</EnteredLanguage>
                </EnteredLanguagesContainer>
              ))}
            </LanguagesDetailsContent>
          </PersonalDetailsContainer>
        </ContentContainerA>

        <ContentContainerB>
          <Header>
            <NameContainer>
              <FirstName>{basic.firstName}</FirstName>
              <LastName>{basic.lastName}</LastName>
            </NameContainer>
            <CurrentRole>{professional.currentRole}</CurrentRole>
          </Header>
          <SummaryContainer>{professional.summary}</SummaryContainer>
          <ProfessionalContainer>
            <ProfessionalContainerTitle>Employment</ProfessionalContainerTitle>
            {professional.work.map(experience => (
              <div key={experience.id}>
                <EmploymentDetailContainer>
                  <EmploymentDetail>
                    <JobTitle>{experience.jobTitle}</JobTitle>
                    <Company>{experience.company}</Company>
                  </EmploymentDetail>
                  <DateContainer>
                    <Dates>
                      <Month>{formatDate(experience.startDate)}</Month>
                      <Year>
                        {experience.startDate.year || new Date().getFullYear()}
                      </Year>
                    </Dates>
                    <DateSeparator> - </DateSeparator>
                    <Dates>
                      <Month>{formatDate(experience.endDate)}</Month>
                      <Year>{formatYear(experience.endDate)}</Year>
                    </Dates>
                  </DateContainer>
                </EmploymentDetailContainer>
                <EmploymentDescription>
                  {experience.jobDetails}
                </EmploymentDescription>
              </div>
            ))}
          </ProfessionalContainer>

          <EducationContainer>
            <EducationContainerTitle>Education</EducationContainerTitle>
            {educational.map(educ => (
              <div key={educ.id}>
                <EducationDetailContainer>
                  <EducationDetail>
                    <Course>{educ.course}</Course>
                    <School>{educ.school}</School>
                  </EducationDetail>
                  <DateContainer>
                    <Dates>
                      <Month>{formatDate(educ.startDate)}</Month>
                      <Year>
                        {educ.startDate.year || new Date().getFullYear()}
                      </Year>
                    </Dates>
                    <DateSeparator> - </DateSeparator>
                    <Dates>
                      <Month>{formatDate(educ.endDate)}</Month>
                      <Year>{formatYear(educ.endDate)}</Year>
                    </Dates>
                  </DateContainer>
                </EducationDetailContainer>
                <EducationDescription>{educ.description}</EducationDescription>
              </div>
            ))}
          </EducationContainer>
        </ContentContainerB>
      </Template>
    </TemplateContainer>
  );
};

export default ResumeTemplate;
