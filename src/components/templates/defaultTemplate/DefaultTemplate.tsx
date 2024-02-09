'use client';
import React, { FC, useState } from 'react';
import { ResumeInfoType } from '@/types/profile';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaHome,
  FaLinkedin,
  FaGlobe,
} from 'react-icons/fa';
import {
  DefaultTemplateContainer,
  Template,
  BasicContentContainer,
  BasicsTitleContainer,
  BasicsTitle,
  BasicsItemsContainer,
  BasicsNameContainer,
  IconContainer,
  BasicsItem,
  ContentContainer,
  HeaderName,
  HeaderCurrentRole,
  DetailsTitleContainer,
  DetailsTitle,
  SummaryContainer,
  Summary,
  DetailsContentContainer,
  EmploymentDetailsContainer,
  EmploymentDetail,
  JobTitle,
  Company,
  DateContainer,
  Dates,
  Month,
  Year,
  DateSeparator,
  Description,
  EducationDetailContainer,
  EducationDetail,
  Course,
  School,
} from './DefaultTemplate.styles';

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

  const shouldDisplayTitle =
    !!(
      basic.firstName ||
      basic.lastName ||
      basic.email ||
      basic.phoneNumber ||
      basic.address ||
      basic.linkedin ||
      (basic.additionalLinks && basic.additionalLinks.length > 0)
    ) ||
    (skills && skills.skill && skills.skill.length > 1) ||
    (languages && languages.language && languages.language.length > 1) ||
    !!(
      (professional.work && professional.work.length > 1) ||
      professional.summary
    ) ||
    !!(educational.education && educational.education.length > 1);

  const templateClassName = isClicked ? 'clicked' : '';

  // Debugging: Log skills and languages
  console.log('Skills:', skills);
  console.log('Languages:', languages);

  return (
    <DefaultTemplateContainer>
      <Template>
        <BasicContentContainer>
          <BasicsTitleContainer>
            {shouldDisplayTitle && <BasicsTitle>Personal Details</BasicsTitle>}
          </BasicsTitleContainer>
          <BasicsItemsContainer>
            {basic.firstName && (
              <BasicsNameContainer>
                <IconContainer>
                  <FaUser />
                </IconContainer>
                <BasicsItem>{basic.firstName}</BasicsItem>
                <BasicsItem>{basic.lastName}</BasicsItem>
              </BasicsNameContainer>
            )}
            {basic.email && (
              <BasicsNameContainer>
                <IconContainer>
                  <FaEnvelope />
                </IconContainer>
                <BasicsItem>{basic.email}</BasicsItem>
              </BasicsNameContainer>
            )}
            {basic.phoneNumber && (
              <BasicsNameContainer>
                <IconContainer>
                  <FaPhone />
                </IconContainer>
                <BasicsItem>{basic.phoneNumber}</BasicsItem>
              </BasicsNameContainer>
            )}
            {basic.address && (
              <BasicsNameContainer>
                <IconContainer>
                  <FaHome />
                </IconContainer>
                <BasicsItem>{basic.address}</BasicsItem>
              </BasicsNameContainer>
            )}
            {basic.linkedin && (
              <BasicsNameContainer>
                <IconContainer>
                  <FaLinkedin />
                </IconContainer>
                <BasicsItem>{basic.linkedin}</BasicsItem>
              </BasicsNameContainer>
            )}
            {basic?.additionalLinks.map(link => (
              <BasicsNameContainer key={link.id}>
                <IconContainer>
                  <FaGlobe />
                </IconContainer>
                <a href={link.url}>
                  <BasicsItem>{link.url}</BasicsItem>
                </a>
              </BasicsNameContainer>
            ))}
          </BasicsItemsContainer>

          {shouldDisplayTitle && (
            <>
              <BasicsTitleContainer> Skills</BasicsTitleContainer>

              {skills.skill &&
                skills?.skill.map(enteredSkill => (
                  <BasicsItem key={enteredSkill.id}>
                    <h3>{enteredSkill.name}</h3>
                  </BasicsItem>
                ))}
              <BasicsTitleContainer> Languages</BasicsTitleContainer>
              {languages.language &&
                languages?.language.map(enteredLanguage => (
                  <BasicsItem key={enteredLanguage.id}>
                    <h3>{enteredLanguage.name}</h3>
                  </BasicsItem>
                ))}
            </>
          )}
        </BasicContentContainer>
        <ContentContainer>
          <BasicsNameContainer>
            <HeaderName>{basic.firstName}</HeaderName>
            <HeaderName>{basic.lastName}</HeaderName>
          </BasicsNameContainer>
          <HeaderCurrentRole>{professional.currentRole}</HeaderCurrentRole>
          <DetailsTitleContainer>
            {shouldDisplayTitle && <DetailsTitle>Summary</DetailsTitle>}
          </DetailsTitleContainer>
          <SummaryContainer>
            <Summary>{professional.summary}</Summary>
          </SummaryContainer>
          <DetailsTitleContainer>
            {shouldDisplayTitle && <DetailsTitle>Employment</DetailsTitle>}
          </DetailsTitleContainer>
          {professional.work && (
            <DetailsContentContainer>
              {professional.work.map(experience => (
                <div key={experience.id}>
                  {experience.jobTitle && (
                    <EmploymentDetailsContainer>
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
                            {experience.startDate.year ||
                              new Date().getFullYear()}
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
                            {experience.endDate.year ||
                              new Date().getFullYear()}
                          </Year>
                        </Dates>
                      </DateContainer>
                    </EmploymentDetailsContainer>
                  )}

                  <Description>{experience.jobDetails}</Description>
                </div>
              ))}
            </DetailsContentContainer>
          )}

          <DetailsTitleContainer>
            {shouldDisplayTitle && <DetailsTitle>Education</DetailsTitle>}
          </DetailsTitleContainer>
          <DetailsContentContainer>
            {educational.education.map(educ => (
              <div key={educ.id}>
                {educ.school && (
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
                )}

                <Description>{educ.description}</Description>
              </div>
            ))}
          </DetailsContentContainer>
        </ContentContainer>
      </Template>
    </DefaultTemplateContainer>
  );
};

export default DefaultTemplate;
