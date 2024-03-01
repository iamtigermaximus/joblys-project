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
  TemplateContainer,
  Year,
  Month,
  DateSeparator,
} from './ResumeTemplate.styles';
import { Resume } from '@/types/profile';
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
                    <Dates>
                      <Month>
                        {experience.startDate.month &&
                        !isNaN(parseInt(experience.startDate.month)) ? (
                          <>
                            {new Date(
                              2022,
                              parseInt(experience.startDate.month) - 1,
                            ).toLocaleString('default', {
                              month: 'short',
                            })}
                          </>
                        ) : (
                          <>Jan</>
                        )}
                      </Month>
                      <Year>
                        {experience.startDate.year || new Date().getFullYear()}
                      </Year>
                    </Dates>
                    <DateSeparator> - </DateSeparator>
                    <Dates>
                      <Month>
                        {experience.endDate.month &&
                        !isNaN(parseInt(experience.endDate.month)) ? (
                          <>
                            {new Date(
                              2022,
                              parseInt(experience.endDate.month) - 1,
                            ).toLocaleString('default', {
                              month: 'short',
                            })}
                          </>
                        ) : (
                          <>Jan</>
                        )}
                      </Month>
                      <Year>
                        {experience.endDate.year || new Date().getFullYear()}
                      </Year>
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
            {educational.education.map(educ => (
              <div key={educ.id}>
                <EducationDetailContainer>
                  <EducationDetail>
                    <Course>{educ.course}</Course>
                    <School>{educ.school}</School>
                  </EducationDetail>
                  <DateContainer>
                    <Dates>
                      <Month>
                        {educ.startDate.month &&
                        !isNaN(parseInt(educ.startDate.month)) ? (
                          <>
                            {new Date(
                              2022,
                              parseInt(educ.startDate.month) - 1,
                            ).toLocaleString('default', {
                              month: 'short',
                            })}
                          </>
                        ) : (
                          <>Jan</>
                        )}
                      </Month>
                      <Year>
                        {educ.startDate.year || new Date().getFullYear()}
                      </Year>
                    </Dates>
                    <DateSeparator> - </DateSeparator>

                    <Dates>
                      <Month>
                        {educ.endDate.month &&
                        !isNaN(parseInt(educ.endDate.month)) ? (
                          <>
                            {new Date(
                              2022,
                              parseInt(educ.endDate.month) - 1,
                            ).toLocaleString('default', {
                              month: 'short',
                            })}
                          </>
                        ) : (
                          <>Jan</>
                        )}
                      </Month>
                      <Year>
                        {educ.endDate.year || new Date().getFullYear()}
                      </Year>
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
