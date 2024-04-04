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
import { StyleSheet, Page, View, Text, Document } from '@react-pdf/renderer';

interface DefaultTemplateProps {
  id: string;
  resumeInfo: Resume;
}

const styles = StyleSheet.create({
  document: {
    flexDirection: 'column',
    display: 'flex',
    width: '100%',
    gap: 20,
  },
  page: {
    flexDirection: 'row',
    display: 'flex',
    minHeight: '800px',
    width: '100%',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  basicContentContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#232946',
    width: '35%',
    padding: '50px 20px',
    color: 'white',
    minWidth: '100px',
    height: '100%',
    minHeight: '800px',
  },
  basicTitleContainer: {
    display: 'flex',
    padding: '5px 0',
    borderBottom: '.5px solid white',
  },
  basicsTitle: {
    color: 'white',
    fontSize: '17px',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fffffe',
    width: '65%',
    padding: '50px 20px',
    height: '100%',
    minHeight: '800px',
  },
  basicsNameContainer: { display: 'flex', flexDirection: 'row', gap: 2 },
  headerName: {
    color: '#232946',
    fontSize: '30px',
    maxWidth: '100%',
    wordBreak: 'break-all',
    whiteSpace: 'wrap',
  },
  headerCurrentRole: {
    color: '#232946',
    fontSize: '17px',
    maxWidth: '100%',
    wordBreak: 'break-all',
    whiteSpace: 'wrap',
  },
  detailsTitleContainer: {
    display: 'flex',
    padding: '5px 0',
  },
  detailsTitle: {
    color: '#232946',
    fontSize: '15px',
    paddingBottom: '5px',
    borderBottom: '0.5px solid #232946',
  },
  summaryContainer: {
    display: 'flex',
    width: '100%',
  },
  summary: {
    color: '#232946',
    maxWidth: '100%',
    fontSize: '12px',
    wordBreak: 'break-all',
    whiteSpace: 'wrap',
    padding: '5px 0',
  },
});

const DefaultTemplate: FC<DefaultTemplateProps> = ({ id, resumeInfo }) => {
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
    <Document style={styles.document}>
      {shouldSplit ? (
        <>
          <Page id="resume-template" size="A4" style={styles.page}>
            <View style={styles.basicContentContainer}>
              {shouldDisplayTitle && (
                <View style={styles.basicTitleContainer}>
                  <Text style={styles.basicsTitle}>Personal Details</Text>
                </View>
              )}
              {basic && <BasicInfoComponent basicInfo={basic} />}
              {shouldDisplayTitle && (
                <View style={styles.basicTitleContainer}>
                  <Text style={styles.basicsTitle}>Skills</Text>
                </View>
              )}
              {skills && <SkillsInfoComponent skillInfo={skills} />}
              {shouldDisplayTitle && (
                <View style={styles.basicTitleContainer}>
                  <Text style={styles.basicsTitle}>Languages</Text>
                </View>
              )}
              {languages && <LanguagesInfoComponent languageInfo={languages} />}
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.basicsNameContainer}>
                <Text style={styles.headerName}>{basic.firstName}</Text>
                <Text style={styles.headerName}>{basic.lastName}</Text>
              </View>
              <Text style={styles.headerCurrentRole}>
                {professional.currentRole}
              </Text>
              {shouldDisplayTitle && (
                <View style={styles.detailsTitleContainer}>
                  <Text style={styles.detailsTitle}>Summary</Text>
                </View>
              )}
              <View style={styles.summaryContainer}>
                <Text style={styles.summary}>{professional.summary}</Text>
              </View>
              {shouldDisplayTitle && (
                <View style={styles.detailsTitleContainer}>
                  <Text style={styles.detailsTitle}>Employment</Text>
                </View>
              )}
              {professional.work.slice(0, 3).map((work, index) => (
                <EmploymentInfoComponent key={index} employmentInfo={[work]} />
              ))}
            </View>
          </Page>
          <Page id="resume-template" size="A4" style={styles.page}>
            <View style={styles.basicContentContainer}></View>
            <View style={styles.contentContainer}>
              {professional.work.slice(3).map((work, index) => (
                <EmploymentInfoComponent key={index} employmentInfo={[work]} />
              ))}
              <div>
                {shouldDisplayTitle && (
                  <View style={styles.detailsTitleContainer}>
                    <Text style={styles.detailsTitle}>Education</Text>
                  </View>
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
            </View>
          </Page>
        </>
      ) : (
        <Page id="resume-template" size="A4" style={styles.page}>
          <View style={styles.basicContentContainer}>
            {shouldDisplayTitle && (
              <View style={styles.basicTitleContainer}>
                <Text style={styles.basicsTitle}>Personal Details</Text>
              </View>
            )}
            {basic && <BasicInfoComponent basicInfo={basic} />}
            {shouldDisplayTitle && (
              <View style={styles.basicTitleContainer}>
                <Text style={styles.basicsTitle}>Skills</Text>
              </View>
            )}
            {skills && <SkillsInfoComponent skillInfo={skills} />}
            {shouldDisplayTitle && (
              <View style={styles.basicTitleContainer}>
                <Text style={styles.basicsTitle}>Languages</Text>
              </View>
            )}
            {languages && <LanguagesInfoComponent languageInfo={languages} />}
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.basicsNameContainer}>
              <Text style={styles.headerName}>{basic.firstName}</Text>
              <Text style={styles.headerName}>{basic.lastName}</Text>
            </View>
            <Text style={styles.headerCurrentRole}>
              {professional.currentRole}
            </Text>
            {shouldDisplayTitle && (
              <View style={styles.detailsTitleContainer}>
                <Text style={styles.detailsTitle}>Summary</Text>
              </View>
            )}
            <View style={styles.summaryContainer}>
              <Text style={styles.summary}>{professional.summary}</Text>
            </View>
            {shouldDisplayTitle && (
              <View style={styles.detailsTitleContainer}>
                <Text style={styles.detailsTitle}>Employment</Text>
              </View>
            )}
            {professional.work.map((work, index) => (
              <EmploymentInfoComponent key={index} employmentInfo={[work]} />
            ))}
            <div>
              {shouldDisplayTitle && (
                <View style={styles.detailsTitleContainer}>
                  <Text style={styles.detailsTitle}>Education</Text>
                </View>
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
          </View>
        </Page>
      )}
    </Document>
  );
};

export default DefaultTemplate;
