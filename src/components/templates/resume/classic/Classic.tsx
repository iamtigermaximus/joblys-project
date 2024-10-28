'use client';

import React, { FC, useState } from 'react';
import { Resume } from '@/types/resume';
import { StyleSheet, Page, View, Text, Document } from '@react-pdf/renderer';

interface ClassicTemplateProps {
  resumeInfo: Resume;
  id: string;
}

const styles = StyleSheet.create({
  document: {
    flexDirection: 'column',
    display: 'flex',
    width: '100%',
  },
  page: {
    flexDirection: 'column',
    display: 'flex',
    width: '100%',
    paddingLeft: 50,
    paddingRight: 50,
    paddingBottom: 50,
    paddingTop: 50,
    backgroundColor: 'white',
  },
  sectionContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 5,
    marginBottom: 10,
  },

  skillsSectionContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 3,
    // border: '1px solid gray',
    padding: 5,
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  skillsItemContainer: {
    marginBottom: 5,
    minWidth: '150px',
    display: 'flex',
    flexDirection: 'row',
  },
  skill: {
    fontWeight: 700,
    // whiteSpace: 'nowrap',
    fontSize: 10,
  },
  bulletContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  languagesSectionContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 3,
    // border: '1px solid gray',
    padding: 5,
    marginBottom: 10,
  },

  sectionItemContainer: {
    display: 'flex',
    flexDirection: 'row',
  },

  languagesItemContainer: {
    marginBottom: 5,
    minWidth: '100px',
    display: 'flex',
    flexDirection: 'row',
  },

  basicContentContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '35%',
    minWidth: '100px',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '65%',
    minWidth: '100px',
    flexWrap: 'wrap',
  },
  basicTitleContainer: {
    display: 'flex',
    padding: '5px 0',
    borderBottom: '.3px solid gray',
  },
  basicsTitle: {
    color: 'black',
    fontSize: 14,
    fontWeight: 700,
    paddingLeft: 5,
  },

  basicsItemTitle: {
    color: 'black',
    fontSize: 10,
    textDecoration: 'none',
    flexWrap: 'wrap',
    marginBottom: 3,
  },

  basicsNameContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 2,
  },

  headerNameContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 2,
    // border: '1px solid gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerName: {
    color: '#232946',
    // fontSize: '25px',
    maxWidth: '100%',
    // wordBreak: 'break-all',
    whiteSpace: 'wrap',
    fontSize: 16,
  },
  currentRoleContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3,
  },
  headerCurrentRole: {
    color: '#232946',
    fontSize: 12,
    maxWidth: '100%',
    // wordBreak: 'break-all',
    // whiteSpace: 'wrap',
  },
  detailsTitleContainer: {
    display: 'flex',
    padding: '5px 0',
  },
  detailsTitle: {
    color: '#232946',
    fontSize: 14,
    paddingBottom: 5,
    borderBottom: '0.5px solid #232946',
  },
  summaryContainer: {
    display: 'flex',
    width: '100%',
    // paddingBottom: '10px',
    gap: 3,
    // border: '1px solid gray',
    padding: 5,
    marginBottom: 10,
  },
  summary: {
    color: '#232946',
    width: '100%',
    // wordBreak: 'break-all',
    // whiteSpace: 'wrap',
    padding: '5px 0',
    // lineHeight: '1.2',
    fontSize: 10,
  },
  additionalLinksContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  detailsContentContainer: {
    display: 'flex',
    flexDirection: 'column',
    // fontSize: '12px',
    width: '100%',
    // padding: '5px 0',
  },
  educationDetailContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  educationDetail: {
    display: 'flex',
    flexDirection: 'column',
    // gap: 2,
    padding: '5px 0',
    width: '100%',
  },
  course: {
    fontWeight: 700,
    // whiteSpace: 'nowrap',
    fontSize: 10,
    marginBottom: 3,
  },
  school: {
    fontWeight: 700,
    // whiteSpace: 'nowrap',
    fontSize: 10,
    marginBottom: 3,
  },
  jobTitle: {
    fontWeight: 700,
    // whiteSpace: 'nowrap',
    fontSize: 10,
    marginBottom: 3,
  },
  company: {
    fontWeight: 700,
    // whiteSpace: 'nowrap',
    fontSize: 10,
    marginBottom: 3,
  },

  language: {
    fontWeight: 700,
    // whiteSpace: 'nowrap',
    fontSize: 10,
  },
  dateContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    padding: '2px 0',
    flexWrap: 'wrap',
  },
  dates: { display: 'flex', flexDirection: 'row', gap: 5, marginBottom: 3 },
  month: { fontSize: '10px' },
  year: { fontSize: 10, marginRight: 5 },
  dateSeparator: {
    fontSize: 14,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    fontSize: 10,
    padding: '5px 0',
    // lineHeight: '1.2',
    // flexWrap: 'wrap',
  },
  bulletPoint: {
    fontSize: 10,
    marginRight: 5,
  },

  skillsContentContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '65%',
    minWidth: '100px',
    flexWrap: 'wrap',
  },
});

const Classic: FC<ClassicTemplateProps> = ({ resumeInfo }) => {
  const basic = resumeInfo?.basic;
  const professional = resumeInfo?.professional;
  const educational = resumeInfo?.educational;
  const skills = resumeInfo?.skills;
  const languages = resumeInfo?.languages;

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

  return (
    <Document style={styles.document}>
      <Page id="resume-template" style={styles.page}>
        <View style={styles.headerNameContainer}>
          <Text style={styles.headerName}>{basic.firstName}</Text>
          <Text style={styles.headerName}>{basic.lastName}</Text>
        </View>
        <View style={styles.currentRoleContainer}>
          <Text style={styles.headerCurrentRole}>
            {professional.currentRole}
          </Text>
        </View>

        {shouldDisplayTitle && (
          <View style={styles.basicTitleContainer}>
            <Text style={styles.basicsTitle}>Summary</Text>
          </View>
        )}
        <View style={styles.summaryContainer}>
          <Text style={styles.summary}>{professional.summary}</Text>
        </View>
        {shouldDisplayTitle && (
          <View style={styles.basicTitleContainer}>
            <Text style={styles.basicsTitle}>Personal Details</Text>
          </View>
        )}

        <View style={styles.sectionContainer}>
          <View style={styles.sectionItemContainer}>
            {shouldDisplayTitle && (
              <View style={styles.basicContentContainer}>
                <Text style={styles.basicsItemTitle}>Name</Text>
              </View>
            )}
            <View style={styles.contentContainer}>
              <View style={styles.basicsNameContainer}>
                <Text style={styles.basicsItemTitle}>{basic.firstName}</Text>
                <Text style={styles.basicsItemTitle}>{basic.lastName}</Text>
              </View>
            </View>
          </View>
          <View style={styles.sectionItemContainer}>
            {shouldDisplayTitle && (
              <View style={styles.basicContentContainer}>
                <Text style={styles.basicsItemTitle}>Email address</Text>
              </View>
            )}
            <View style={styles.contentContainer}>
              <Text style={styles.basicsItemTitle}>{basic.email}</Text>
            </View>
          </View>
          <View style={styles.sectionItemContainer}>
            {shouldDisplayTitle && (
              <View style={styles.basicContentContainer}>
                <Text style={styles.basicsItemTitle}>Phone number</Text>
              </View>
            )}
            <View style={styles.contentContainer}>
              <Text style={styles.basicsItemTitle}>{basic.phoneNumber}</Text>
            </View>
          </View>
          <View style={styles.sectionItemContainer}>
            {shouldDisplayTitle && (
              <View style={styles.basicContentContainer}>
                <Text style={styles.basicsItemTitle}>Address</Text>
              </View>
            )}
            <View style={styles.contentContainer}>
              <Text style={styles.basicsItemTitle}>{basic.address}</Text>
            </View>
          </View>
          <View style={styles.sectionItemContainer}>
            {shouldDisplayTitle && (
              <View style={styles.basicContentContainer}>
                <Text style={styles.basicsItemTitle}>LinkedIn</Text>
              </View>
            )}
            <View style={styles.contentContainer}>
              <Text style={styles.basicsItemTitle}>{basic.linkedin}</Text>
            </View>
          </View>
          <View style={styles.additionalLinksContainer}>
            {basic?.additionalLinks.map(link => (
              <>
                <View style={styles.sectionItemContainer}>
                  {shouldDisplayTitle && (
                    <View style={styles.basicContentContainer}>
                      <Text style={styles.basicsItemTitle}>
                        Additional link
                      </Text>
                    </View>
                  )}
                  <View style={styles.contentContainer} key={link.id}>
                    <a href={link.url} style={{ textDecoration: 'none' }}>
                      <Text style={styles.basicsItemTitle}>{link.url}</Text>
                    </a>
                  </View>
                </View>
              </>
            ))}
          </View>
        </View>
        {shouldDisplayTitle && (
          <View style={styles.basicTitleContainer}>
            <Text style={styles.basicsTitle}>Education</Text>
          </View>
        )}
        <View style={styles.sectionContainer}>
          {educational?.length > 0 &&
            educational.map(info => (
              <View style={styles.sectionItemContainer} key={info.id}>
                {info.school && (
                  <View style={styles.basicContentContainer}>
                    <View style={styles.dateContainer}>
                      <View style={styles.dates}>
                        <Text style={styles.month}>
                          {formatDate(info.startDate.month)}
                        </Text>
                        <Text style={styles.year}>
                          {info.startDate.year || new Date().getFullYear()}
                        </Text>
                      </View>
                      <Text style={styles.dateSeparator}> - </Text>
                      <View style={styles.dates}>
                        <Text style={styles.month}>
                          {formatDate(info.endDate.month)}
                        </Text>
                        <Text style={styles.year}>
                          {formatYear(info.endDate)}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
                <View style={styles.contentContainer}>
                  <Text style={styles.course}>{info.course}</Text>
                  <Text style={styles.school}>{info.school}</Text>
                </View>
              </View>
            ))}
        </View>
        {shouldDisplayTitle && (
          <View style={styles.basicTitleContainer}>
            <Text style={styles.basicsTitle}>Employment</Text>
          </View>
        )}
        <View style={styles.sectionContainer}>
          {professional.work.map(info => (
            <View style={styles.sectionItemContainer} key={info.id}>
              {info.jobTitle && (
                <View style={styles.basicContentContainer}>
                  <View style={styles.dateContainer}>
                    <View style={styles.dates}>
                      <Text style={styles.month}>
                        {formatDate(info.startDate.month)}
                      </Text>
                      <Text style={styles.year}>
                        {info.startDate.year || new Date().getFullYear()}
                      </Text>
                    </View>
                    <Text style={styles.dateSeparator}> - </Text>
                    <View style={styles.dates}>
                      <Text style={styles.month}>
                        {formatDate(info.endDate.month)}
                      </Text>
                      <Text style={styles.year}>
                        {formatYear(info.endDate)}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
              <View style={styles.contentContainer}>
                <Text style={styles.jobTitle}>{info.jobTitle}</Text>
                <Text style={styles.company}>{info.company}</Text>
                <Text style={styles.description}>{info.jobDetails}</Text>
              </View>
            </View>
          ))}
        </View>
        {shouldDisplayTitle && (
          <View style={styles.basicTitleContainer}>
            <Text style={styles.basicsTitle}>Skills</Text>
          </View>
        )}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionItemContainer}>
            <View style={styles.basicContentContainer}></View>
            <View style={styles.skillsContentContainer}>
              {skills &&
                skills.map(skill => (
                  <View style={styles.skillsItemContainer} key={skill.id}>
                    <Text style={styles.bulletPoint}>•</Text>
                    <Text style={styles.skill}>{skill.name}</Text>
                  </View>
                ))}
            </View>
          </View>
        </View>
        {shouldDisplayTitle && (
          <View style={styles.basicTitleContainer}>
            <Text style={styles.basicsTitle}>Languages</Text>
          </View>
        )}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionItemContainer}>
            <View style={styles.basicContentContainer}></View>
            <View style={styles.contentContainer}>
              {languages &&
                languages.map(language => (
                  <View style={styles.languagesItemContainer} key={language.id}>
                    <Text style={styles.bulletPoint}>•</Text>
                    <Text style={styles.language}>{language.name}</Text>
                  </View>
                ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Classic;
