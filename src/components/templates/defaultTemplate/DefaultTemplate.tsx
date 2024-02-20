'use client';
import {
  BasicInfoType,
  EducationType,
  LanguageType,
  ProfessionalExperienceType,
  ResumeInfoType,
  SkillType,
} from '@/types/profile';
import React, { FC } from 'react';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaHome,
  FaLinkedin,
  FaGlobe,
} from 'react-icons/fa';
import {
  BasicContentContainer,
  BasicsItem,
  BasicsItemsContainer,
  BasicsNameContainer,
  BasicsTitle,
  BasicsTitleContainer,
  Company,
  ContentContainer,
  Course,
  DateContainer,
  DateSeparator,
  Dates,
  DefaultTemplateContainer,
  Description,
  DetailsContentContainer,
  DetailsTitle,
  DetailsTitleContainer,
  EducationDetail,
  EducationDetailContainer,
  EmploymentDetail,
  EmploymentDetailsContainer,
  HeaderCurrentRole,
  HeaderName,
  IconContainer,
  JobTitle,
  Month,
  School,
  Summary,
  SummaryContainer,
  Template,
  Year,
} from './DefaultTemplate.styles';

const BasicInfoComponent: FC<{ basicInfo: BasicInfoType }> = ({
  basicInfo,
}) => (
  <div>
    <BasicsItemsContainer>
      {basicInfo.firstName && (
        <BasicsNameContainer>
          <IconContainer>
            <FaUser />
          </IconContainer>
          <BasicsItem>{basicInfo.firstName}</BasicsItem>
          <BasicsItem>{basicInfo.lastName}</BasicsItem>
        </BasicsNameContainer>
      )}
      {basicInfo.email && (
        <BasicsNameContainer>
          <IconContainer>
            <FaEnvelope />
          </IconContainer>
          <BasicsItem>{basicInfo.email}</BasicsItem>
        </BasicsNameContainer>
      )}
      {basicInfo.phoneNumber && (
        <BasicsNameContainer>
          <IconContainer>
            <FaPhone />
          </IconContainer>
          <BasicsItem>{basicInfo.phoneNumber}</BasicsItem>
        </BasicsNameContainer>
      )}
      {basicInfo.address && (
        <BasicsNameContainer>
          <IconContainer>
            <FaHome />
          </IconContainer>
          <BasicsItem>{basicInfo.address}</BasicsItem>
        </BasicsNameContainer>
      )}
      {basicInfo.linkedin && (
        <BasicsNameContainer>
          <IconContainer>
            <FaLinkedin />
          </IconContainer>
          <BasicsItem>{basicInfo.linkedin}</BasicsItem>
        </BasicsNameContainer>
      )}
      {basicInfo?.additionalLinks.map(link => (
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
  </div>
);

const SkillsInfoComponent: FC<{ skillInfo: SkillType[] }> = ({ skillInfo }) => (
  <div>
    <DetailsContentContainer>
      {skillInfo.map(skill => (
        <div key={skill.id}>
          <BasicsItem>{skill.name}</BasicsItem>
        </div>
      ))}
    </DetailsContentContainer>
  </div>
);

const LanguagesInfoComponent: FC<{ languageInfo: LanguageType[] }> = ({
  languageInfo,
}) => (
  <div>
    <DetailsContentContainer>
      {languageInfo.map((language, index) => (
        <div key={language.id}>
          <BasicsItem>{language.name}</BasicsItem>
        </div>
      ))}
    </DetailsContentContainer>
  </div>
);

const EmploymentInfoComponent: FC<{
  employmentInfo: ProfessionalExperienceType[];
}> = ({ employmentInfo }) => (
  <DetailsContentContainer>
    {employmentInfo.map((info, index) => (
      <div key={info.id}>
        <EmploymentDetailsContainer>
          <EmploymentDetail>
            <JobTitle>{info.jobTitle}</JobTitle>
            <Company>{info.company}</Company>
          </EmploymentDetail>
          {info.jobTitle && (
            <DateContainer>
              <Dates>
                <Month>
                  {info.startDate.month &&
                  !isNaN(parseInt(info.startDate.month)) ? (
                    <>
                      {new Date(
                        2022,
                        parseInt(info.startDate.month) - 1,
                      ).toLocaleString('default', {
                        month: 'short',
                      })}
                    </>
                  ) : (
                    <>Jan</>
                  )}
                </Month>
                <Year>{info.startDate.year || new Date().getFullYear()}</Year>
              </Dates>
              <DateSeparator> - </DateSeparator>
              <Dates>
                <Month>
                  {info.endDate.month &&
                  !isNaN(parseInt(info.endDate.month)) ? (
                    <>
                      {new Date(
                        2022,
                        parseInt(info.endDate.month) - 1,
                      ).toLocaleString('default', {
                        month: 'short',
                      })}
                    </>
                  ) : (
                    <>Jan</>
                  )}
                </Month>
                <Year>{info.endDate.year || new Date().getFullYear()}</Year>
              </Dates>
            </DateContainer>
          )}
        </EmploymentDetailsContainer>

        <Description>{info.jobDetails}</Description>
      </div>
    ))}
  </DetailsContentContainer>
);

const EducationInfoComponent: FC<{ educationInfo: EducationType[] }> = ({
  educationInfo,
}) => (
  <DetailsContentContainer>
    {educationInfo.map((info, index) => (
      <div key={info.id}>
        <EducationDetailContainer>
          <EducationDetail>
            <Course>{info.course}</Course>
            <School>{info.school}</School>
          </EducationDetail>
          {info.school && (
            <DateContainer>
              <Dates>
                <Month>
                  {info.startDate.month &&
                  !isNaN(parseInt(info.startDate.month)) ? (
                    <>
                      {new Date(
                        2022,
                        parseInt(info.startDate.month) - 1,
                      ).toLocaleString('default', {
                        month: 'short',
                      })}
                    </>
                  ) : (
                    <>Jan</>
                  )}
                </Month>
                <Year>{info.startDate.year || new Date().getFullYear()}</Year>
              </Dates>
              <DateSeparator> - </DateSeparator>

              <Dates>
                <Month>
                  {info.endDate.month &&
                  !isNaN(parseInt(info.endDate.month)) ? (
                    <>
                      {new Date(
                        2022,
                        parseInt(info.endDate.month) - 1,
                      ).toLocaleString('default', {
                        month: 'short',
                      })}
                    </>
                  ) : (
                    <>Jan</>
                  )}
                </Month>
                <Year>{info.endDate.year || new Date().getFullYear()}</Year>
              </Dates>
            </DateContainer>
          )}
        </EducationDetailContainer>
        <Description>{info.description}</Description>
      </div>
    ))}
  </DetailsContentContainer>
);

// Define the Resume component
const DefaultTemplate: FC<{ resumeInfo: ResumeInfoType }> = ({
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
    (skills && skills.skill && skills.skill.length > 1) ||
    (languages && languages.language && languages.language.length > 1) ||
    !!(
      (professional.work && professional.work.length > 1) ||
      professional.summary
    ) ||
    !!(educational.education && educational.education.length > 1);

  // Check the amount of content and decide whether to render it in the current template or split it into a new one

  const shouldSplit =
    professional.work.length > 2 || educational.education.length > 1;

  return (
    <DefaultTemplateContainer>
      {shouldSplit ? (
        <>
          <Template>
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
              {skills && <SkillsInfoComponent skillInfo={skills.skill} />}
              <BasicsTitleContainer>
                {shouldDisplayTitle && <BasicsTitle>Languages</BasicsTitle>}
              </BasicsTitleContainer>
              {languages && (
                <LanguagesInfoComponent languageInfo={languages.language} />
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
              {professional.work.slice(0, 2).map((work, index) => (
                <EmploymentInfoComponent key={index} employmentInfo={[work]} />
              ))}
            </ContentContainer>
          </Template>
          <Template>
            <BasicContentContainer></BasicContentContainer>
            <ContentContainer>
              {professional.work.slice(2).map((work, index) => (
                <EmploymentInfoComponent key={index} employmentInfo={[work]} />
              ))}
              <div>
                <DetailsTitleContainer>
                  {shouldDisplayTitle && <DetailsTitle>Education</DetailsTitle>}
                </DetailsTitleContainer>
                {educational.education.map((education, index) => (
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
        <Template>
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
            {skills && <SkillsInfoComponent skillInfo={skills.skill} />}
            <BasicsTitleContainer>
              {shouldDisplayTitle && <BasicsTitle>Languages</BasicsTitle>}
            </BasicsTitleContainer>
            {languages && (
              <LanguagesInfoComponent languageInfo={languages.language} />
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
            {professional.work.map((work, index) => (
              <EmploymentInfoComponent key={index} employmentInfo={[work]} />
            ))}

            <div>
              <DetailsTitleContainer>
                {shouldDisplayTitle && <DetailsTitle>Education</DetailsTitle>}
              </DetailsTitleContainer>
              {educational.education.map((education, index) => (
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
