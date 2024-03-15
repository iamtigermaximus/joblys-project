'use client';
import {
  BasicInfoType,
  EducationType,
  LanguageType,
  ProfessionalExperienceType,
  Resume,
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
      {skillInfo &&
        skillInfo.length > 0 &&
        skillInfo.map(skill => (
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
      {languageInfo &&
        languageInfo.map((language, index) => (
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
    {employmentInfo.map(info => (
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
                  {typeof info.endDate === 'string' ||
                  (typeof info.endDate === 'object' && 'month' in info.endDate)
                    ? typeof info.endDate === 'string'
                      ? info.endDate === 'Present'
                        ? 'Present'
                        : 'Present'
                      : new Date(
                          2022,
                          parseInt(info.endDate.month) - 1,
                        ).toLocaleString('default', {
                          month: 'short',
                        })
                    : 'Jan'}
                </Month>
                <Year>
                  {typeof info.endDate === 'string' ||
                  (typeof info.endDate === 'object' && 'year' in info.endDate)
                    ? typeof info.endDate === 'string'
                      ? info.endDate === 'Present'
                        ? ''
                        : ''
                      : info.endDate.year
                    : ''}
                </Year>
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
    {educationInfo &&
      educationInfo?.length > 0 &&
      educationInfo.map((info, index) => (
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

const DefaultTemplate: FC<{ resumeInfo: Resume }> = ({ resumeInfo }) => {
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

  // const shouldSplit = professional.work.length > 2 || educational.length > 1;

  return (
    <DefaultTemplateContainer>
      <Template>
        <BasicContentContainer>
          {shouldDisplayTitle && (
            <BasicsTitleContainer>
              <BasicsTitle>Personal Details</BasicsTitle>
            </BasicsTitleContainer>
          )}

          {basic && <BasicInfoComponent basicInfo={basic} />}

          {shouldDisplayTitle && (
            <BasicsTitleContainer>
              <BasicsTitle>Skills</BasicsTitle>{' '}
            </BasicsTitleContainer>
          )}

          {skills && <SkillsInfoComponent skillInfo={skills} />}

          {shouldDisplayTitle && (
            <BasicsTitleContainer>
              <BasicsTitle>Languages</BasicsTitle>{' '}
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
          <DetailsTitleContainer>
            {shouldDisplayTitle && <DetailsTitle>Summary</DetailsTitle>}
          </DetailsTitleContainer>
          <SummaryContainer>
            <Summary>{professional.summary}</Summary>
          </SummaryContainer>
          <DetailsTitleContainer>
            {shouldDisplayTitle && <DetailsTitle>Employment</DetailsTitle>}
          </DetailsTitleContainer>
          {professional.work.map(work => (
            <EmploymentInfoComponent key={work.id} employmentInfo={[work]} />
          ))}
          <DetailsTitleContainer>
            {shouldDisplayTitle && <DetailsTitle>Education</DetailsTitle>}
          </DetailsTitleContainer>
          {educational &&
            educational.length > 0 &&
            educational.map(education => (
              <EducationInfoComponent
                key={education.id}
                educationInfo={[education]}
              />
            ))}
        </ContentContainer>
      </Template>
    </DefaultTemplateContainer>
  );
};

export default DefaultTemplate;
