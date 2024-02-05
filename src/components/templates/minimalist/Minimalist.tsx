'use client';

import React, { FC, useState } from 'react';
import { ResumeInfoType } from '@/types/profile';
import {
  BasicDetail,
  BasicNameContainer,
  Company,
  ContentContainer,
  ContentContainerA,
  ContentContainerB,
  Course,
  CurrentRole,
  DateContainer,
  DateSeparator,
  Dates,
  Detail,
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
  HeadContainer,
  Item,
  JobTitle,
  LanguagesDetailsContent,
  LastName,
  MinimalistContainer,
  MinimalistTemplate,
  Month,
  NameContainer,
  PersonalDetailsContainer,
  PersonalDetailsTitle,
  School,
  SkillsDetailsContent,
  SummaryContainer,
  SummaryDetailsContainer,
  Year,
} from './Minimalist.styles';

interface Resume2TemplateProps {
  resumeInfo: ResumeInfoType;
}
const Minimalist: FC<Resume2TemplateProps> = ({ resumeInfo }) => {
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
    <MinimalistContainer>
      <MinimalistTemplate>
        <HeadContainer>
          <NameContainer>
            <FirstName>{basic.firstName}</FirstName>
            <LastName>{basic.lastName}</LastName>
          </NameContainer>
          <CurrentRole>{professional.currentRole}</CurrentRole>
        </HeadContainer>
        <ContentContainer>
          <SummaryDetailsContainer>
            <PersonalDetailsTitle>Summary</PersonalDetailsTitle>
          </SummaryDetailsContainer>
          <SummaryContainer>{professional.summary}</SummaryContainer>
        </ContentContainer>
        <ContentContainer>
          <PersonalDetailsContainer>
            <PersonalDetailsTitle>Personal Details</PersonalDetailsTitle>
          </PersonalDetailsContainer>
          <ContentContainer>
            <Item>
              <ContentContainerA>
                <Detail>Name</Detail>
              </ContentContainerA>
              <ContentContainerB>
                <BasicNameContainer>
                  <BasicDetail>{basic.firstName}</BasicDetail>
                  <BasicDetail>{basic.lastName}</BasicDetail>
                </BasicNameContainer>
              </ContentContainerB>
            </Item>
            <Item>
              <ContentContainerA>
                <Detail>Email</Detail>
              </ContentContainerA>
              <ContentContainerB>
                <BasicDetail>{basic.email}</BasicDetail>
              </ContentContainerB>
            </Item>
            <Item>
              <ContentContainerA>
                <Detail>Phone Number</Detail>
              </ContentContainerA>
              <ContentContainerB>
                <BasicDetail>{basic.phoneNumber}</BasicDetail>
              </ContentContainerB>
            </Item>
            <Item>
              <ContentContainerA>
                <Detail>Address</Detail>
              </ContentContainerA>
              <ContentContainerB>
                <BasicDetail>{basic.address}</BasicDetail>
              </ContentContainerB>
            </Item>
            <Item>
              <ContentContainerA>
                <Detail>LinkedIn</Detail>
              </ContentContainerA>
              <ContentContainerB>
                <a href={basic.linkedin}>
                  <BasicDetail>{basic.linkedin}</BasicDetail>
                </a>
              </ContentContainerB>
            </Item>
            <Item>
              <ContentContainerA>
                <Detail>Link</Detail>
              </ContentContainerA>
              <ContentContainerB>
                {basic?.additionalLinks.map(link => (
                  <div key={link.id}>
                    <a href={link.url}>
                      <BasicDetail>{link.url}</BasicDetail>
                    </a>
                  </div>
                ))}
              </ContentContainerB>
            </Item>
          </ContentContainer>
          <PersonalDetailsContainer>
            <PersonalDetailsTitle>Employment</PersonalDetailsTitle>
          </PersonalDetailsContainer>
          <ContentContainer>
            {professional.work.map(experience => (
              <Item key={experience.id}>
                <ContentContainerA>
                  <Detail>
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
                          {experience.endDate.year || new Date().getFullYear()}
                        </Year>
                      </Dates>
                    </DateContainer>
                  </Detail>
                </ContentContainerA>
                <ContentContainerB>
                  <EmploymentDetailContainer>
                    <EmploymentDetail>
                      <JobTitle>{experience.jobTitle}</JobTitle>
                      <Company>{experience.company}</Company>
                    </EmploymentDetail>
                  </EmploymentDetailContainer>
                  <EmploymentDescription>
                    {experience.jobDetails}
                  </EmploymentDescription>
                </ContentContainerB>
              </Item>
            ))}
          </ContentContainer>
          <PersonalDetailsContainer>
            <PersonalDetailsTitle>Education</PersonalDetailsTitle>
          </PersonalDetailsContainer>
          <ContentContainer>
            {educational.education.map(educ => (
              <Item key={educ.id}>
                <ContentContainerA>
                  <Detail>
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
                  </Detail>
                </ContentContainerA>
                <ContentContainerB>
                  <EducationDetailContainer>
                    <EducationDetail>
                      <Course>{educ.course}</Course>
                      <School>{educ.school}</School>
                    </EducationDetail>
                  </EducationDetailContainer>
                  <EducationDescription>
                    {educ.description}
                  </EducationDescription>
                </ContentContainerB>
              </Item>
            ))}
          </ContentContainer>
          <PersonalDetailsContainer>
            <PersonalDetailsTitle>Skills</PersonalDetailsTitle>
          </PersonalDetailsContainer>
          <ContentContainer>
            <Item>
              <ContentContainerA>
                <SkillsDetailsContent>
                  {skills?.skill.map(enteredSkill => (
                    <EnteredSkillsContainer key={enteredSkill.id}>
                      <EnteredSkill>{enteredSkill.name}</EnteredSkill>
                    </EnteredSkillsContainer>
                  ))}
                </SkillsDetailsContent>
              </ContentContainerA>
              <ContentContainerB></ContentContainerB>
            </Item>
          </ContentContainer>
          <PersonalDetailsContainer>
            <PersonalDetailsTitle>Languages</PersonalDetailsTitle>
          </PersonalDetailsContainer>
          <ContentContainer>
            <Item>
              <ContentContainerA>
                <LanguagesDetailsContent>
                  {languages?.language.map(enteredLanguage => (
                    <EnteredLanguagesContainer key={enteredLanguage.id}>
                      <EnteredLanguage>{enteredLanguage.name}</EnteredLanguage>
                    </EnteredLanguagesContainer>
                  ))}
                </LanguagesDetailsContent>
              </ContentContainerA>
              <ContentContainerB></ContentContainerB>
            </Item>
          </ContentContainer>
        </ContentContainer>
      </MinimalistTemplate>
    </MinimalistContainer>
  );
};

export default Minimalist;
