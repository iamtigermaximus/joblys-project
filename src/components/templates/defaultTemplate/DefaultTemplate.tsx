'use client';
import { Resume } from '@/types/profile';
import React, { FC } from 'react';
import {
  BasicContentContainer,
  BasicsNameContainer,
  BasicsTitle,
  BasicsTitleContainer,
  ContentContainer,
  DefaultTemplateContainer,
  DetailsTitle,
  DetailsTitleContainer,
  HeaderCurrentRole,
  HeaderName,
  Summary,
  SummaryContainer,
  Template,
} from './DefaultTemplate.styles';
import { BasicInfoComponent } from './resume-helpers/BasicInfoComponent';
import { EmploymentInfoComponent } from './resume-helpers/EmploymentInfoComponent';
import { SkillsInfoComponent } from './resume-helpers/SkillsInfoComponent';
import { LanguagesInfoComponent } from './resume-helpers/LanguagesInfoComponent';
import { EducationInfoComponent } from './resume-helpers/EducationInfoComponent';

const DefaultTemplate: FC<{ id: string; resumeInfo: Resume }> = ({
  id,
  resumeInfo,
}) => {
  const basic = resumeInfo?.basic;
  const professional = resumeInfo?.professional;
  const educational = resumeInfo?.educational;
  const skills = resumeInfo?.skills;
  const languages = resumeInfo?.languages;

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
    (skills && skills && skills.length > 1) ||
    (languages && languages && languages.length > 1) ||
    !!(
      (professional.work && professional.work.length > 1) ||
      professional.summary
    ) ||
    !!(educational && educational.length > 1);

  const shouldSplit = professional.work.length > 3 || educational.length > 4;

  return (
    <DefaultTemplateContainer>
      {shouldSplit ? (
        <>
          <Template id={id}>
            <BasicContentContainer>
              {shouldDisplayTitle && (
                <BasicsTitleContainer>
                  <BasicsTitle>Personal Details</BasicsTitle>
                </BasicsTitleContainer>
              )}
              {basic && <BasicInfoComponent basicInfo={basic} />}
              {shouldDisplayTitle && (
                <BasicsTitleContainer>
                  <BasicsTitle>Skills</BasicsTitle>
                </BasicsTitleContainer>
              )}
              {skills && <SkillsInfoComponent skillInfo={skills} />}
              {shouldDisplayTitle && (
                <BasicsTitleContainer>
                  <BasicsTitle>Languages</BasicsTitle>
                </BasicsTitleContainer>
              )}
              {languages && <LanguagesInfoComponent languageInfo={languages} />}
            </BasicContentContainer>
            <ContentContainer>
              <BasicsNameContainer>
                <HeaderName>{basic.firstName}</HeaderName>
                <HeaderName>{basic.lastName}</HeaderName>
              </BasicsNameContainer>
              <HeaderCurrentRole>{professional.currentRole}</HeaderCurrentRole>
              {shouldDisplayTitle && (
                <DetailsTitleContainer>
                  <DetailsTitle>Summary</DetailsTitle>
                </DetailsTitleContainer>
              )}
              <SummaryContainer>
                <Summary>{professional.summary}</Summary>
              </SummaryContainer>
              {shouldDisplayTitle && (
                <DetailsTitleContainer>
                  <DetailsTitle>Employment</DetailsTitle>
                </DetailsTitleContainer>
              )}
              {professional.work.slice(0, 3).map((work, index) => (
                <EmploymentInfoComponent key={index} employmentInfo={[work]} />
              ))}
            </ContentContainer>
          </Template>
          <Template id={id}>
            <BasicContentContainer></BasicContentContainer>
            <ContentContainer>
              {professional.work.slice(3).map((work, index) => (
                <EmploymentInfoComponent key={index} employmentInfo={[work]} />
              ))}
              <div>
                {shouldDisplayTitle && (
                  <DetailsTitleContainer>
                    <DetailsTitle>Education</DetailsTitle>
                  </DetailsTitleContainer>
                )}
                {educational &&
                  educational.length > 0 &&
                  educational.map((education, index) => (
                    <EducationInfoComponent
                      key={index}
                      educationInfo={[education]}
                    />
                  ))}
              </div>
            </ContentContainer>
          </Template>
        </>
      ) : (
        <Template id={id}>
          <BasicContentContainer>
            <BasicsTitleContainer>
              {shouldDisplayTitle && (
                <BasicsTitle>Personal Details</BasicsTitle>
              )}
            </BasicsTitleContainer>
            {basic && <BasicInfoComponent basicInfo={basic} />}
            <BasicsTitleContainer>
              {shouldDisplayTitle && <BasicsTitle>Skills</BasicsTitle>}
            </BasicsTitleContainer>
            {skills && <SkillsInfoComponent skillInfo={skills} />}
            <BasicsTitleContainer>
              {shouldDisplayTitle && <BasicsTitle>Languages</BasicsTitle>}
            </BasicsTitleContainer>
            {languages && <LanguagesInfoComponent languageInfo={languages} />}
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
            {professional.work.map((work, index) => (
              <EmploymentInfoComponent key={index} employmentInfo={[work]} />
            ))}
            <div>
              <DetailsTitleContainer>
                {shouldDisplayTitle && <DetailsTitle>Education</DetailsTitle>}
              </DetailsTitleContainer>
              {educational &&
                educational.length > 0 &&
                educational.map((education, index) => (
                  <EducationInfoComponent
                    key={index}
                    educationInfo={[education]}
                  />
                ))}
            </div>
          </ContentContainer>
        </Template>
      )}
    </DefaultTemplateContainer>
  );
};

export default DefaultTemplate;
