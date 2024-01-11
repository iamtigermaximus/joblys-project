'use client';

import React, { FC } from 'react';
import {
  BasicDetail,
  BasicNameContainer,
  Company,
  ContentContainerA,
  ContentContainerB,
  Course,
  CurrentRole,
  Date,
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
  JobName,
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
  TemplateContainer
} from './ResumeTemplate.styles';
import { ResumeInfoType } from '@/types/profile';
import Minimalist from '../templates/minimalist/Minimalist';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaHome,
  FaLinkedin,
  FaGlobe
} from 'react-icons/fa';

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
        {/* <h2>Basic Details</h2>
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
        {educational?.education.map(educ => (
          <div key={educ.id}>
            <h6>school:{educ.school}</h6>
            <h6>course:{educ.course}</h6>
            <h6>startdate:{educ.startDate}</h6>
            <h6>enddate:{educ.endDate}</h6>
          </div>
        ))}

        <h2>Skills:</h2>
        {skills?.skill.map(enteredSkill => (
          <div key={enteredSkill.id}>
            <h6>skill:{enteredSkill.name}</h6>
          </div>
        ))}

        <h2>Languages:</h2>
        {languages?.language.map(enteredLanguage => (
          <div key={enteredLanguage.id}>
            <h6>language:{enteredLanguage.name}</h6>
          </div>
        ))} */}
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
              {skills?.skill.map(enteredSkill => (
                <EnteredSkillsContainer key={enteredSkill.id}>
                  <EnteredSkill>{enteredSkill.name}</EnteredSkill>
                </EnteredSkillsContainer>
              ))}
            </SkillsDetailsContent>
          </PersonalDetailsContainer>

          <PersonalDetailsContainer>
            <PersonalDetailsTitle>Languages</PersonalDetailsTitle>
            <LanguagesDetailsContent>
              {languages?.language.map(enteredLanguage => (
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
            {/* <JobName>Software Developer</JobName> */}
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
                    <Date>{experience.startDate} </Date>
                    <Date>{experience.endDate}</Date>
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
            {educational.education.map(educ => (
              <div key={educ.id}>
                <EducationDetailContainer>
                  <EducationDetail>
                    <Course>{educ.course}</Course>
                    <School>{educ.school}</School>
                  </EducationDetail>
                  <DateContainer>
                    <Date>{educ.startDate}</Date>
                    <Date>{educ.endDate}</Date>
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
