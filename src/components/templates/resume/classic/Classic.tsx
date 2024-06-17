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
    gap: 20,
  },
  page: {
    flexDirection: 'column',
    display: 'flex',
    // minHeight: '800px',
    width: '100%',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    // border: '1px solid red',
    padding: '50px',
    backgroundColor: 'white',
  },
  sectionContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
    border: '1px solid gray',
    padding: '5px',
    marginBottom: '10px',
  },

  skillsSectionContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
    border: '1px solid gray',
    padding: '5px',
    marginBottom: '10px',
  },
  languagesSectionContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
    border: '1px solid gray',
    padding: '5px',
    marginBottom: '10px',
  },

  sectionItemContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  skillsItemContainer: {
    display: 'flex',
    padding: '3px 0',
  },
  languagesItemContainer: {
    display: 'flex',
  },

  basicContentContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '35%',
    minWidth: '100px',
    // height: '100%',
    // minHeight: '800px',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '65%',
    minWidth: '250px',
  },
  basicTitleContainer: {
    display: 'flex',
    padding: '5px 0',
    borderBottom: '.5px solid gray',
    backgroundColor: 'gray',
  },
  basicsTitle: {
    color: 'white',
    fontSize: '14px',
    fontWeight: 700,
    paddingLeft: '5px',
  },

  basicsItemTitle: {
    color: 'black',
    fontSize: '13px',
    textDecoration: 'none',
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
    wordBreak: 'break-all',
    whiteSpace: 'wrap',
    fontSize: '20px',
  },
  currentRoleContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '3px',
  },
  headerCurrentRole: {
    color: '#232946',
    fontSize: '14px',
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
    fontSize: '14px',
    paddingBottom: '5px',
    borderBottom: '0.5px solid #232946',
  },
  summaryContainer: {
    display: 'flex',
    width: '100%',
    // paddingBottom: '10px',
    gap: '3px',
    border: '1px solid gray',
    padding: '5px',
    marginBottom: '10px',
  },
  summary: {
    color: '#232946',
    maxWidth: '100%',
    wordBreak: 'break-all',
    whiteSpace: 'wrap',
    padding: '5px 0',
    lineHeight: '1.2',
    fontSize: '13px',
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
    padding: '5px 0',
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
    fontSize: '13px',
  },
  school: {
    fontWeight: 700,
    // whiteSpace: 'nowrap',
    fontSize: '13px',
  },
  dateContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    padding: '2px 0',
  },
  dates: { display: 'flex', flexDirection: 'row', gap: 5 },
  month: { fontSize: '13px' },
  year: { fontSize: '13px' },
  dateSeparator: { fontSize: '13px' },
  description: { fontSize: '13px', padding: '5px 0', lineHeight: '1.2' },
});
const Classic: FC<ClassicTemplateProps> = ({ resumeInfo }) => {
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

  const shouldSplit = professional.work.length > 2;

  return (
    <Document style={styles.document}>
      {shouldSplit ? (
        <>
          <Page id="resume-template" size="A4" style={styles.page}>
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
                    <Text>{basic.firstName}</Text>
                    <Text>{basic.lastName}</Text>
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
                  <Text style={styles.basicsItemTitle}>
                    {basic.phoneNumber}
                  </Text>
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
                        <a href={link.url}>
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
                            </Text>
                            <Text style={styles.year}>
                              {info.startDate.year || new Date().getFullYear()}
                            </Text>
                          </View>
                          <Text style={styles.dateSeparator}> - </Text>
                          <View style={styles.dates}>
                            <Text style={styles.month}>
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
                            </Text>
                            <Text style={styles.year}>
                              {info.endDate.year || new Date().getFullYear()}
                            </Text>
                          </View>
                        </View>
                      </View>
                    )}
                    <View style={styles.contentContainer}>
                      <Text>{info.course}</Text>
                      <Text>{info.school}</Text>
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
              {professional.work.slice(0, 2).map(info => (
                <View style={styles.sectionItemContainer} key={info.id}>
                  {info.jobTitle && (
                    <View style={styles.basicContentContainer}>
                      <View style={styles.dateContainer}>
                        <View style={styles.dates}>
                          <Text style={styles.month}>
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
                          </Text>
                          <Text style={styles.year}>
                            {info.startDate.year || new Date().getFullYear()}
                          </Text>
                        </View>
                        <Text style={styles.dateSeparator}> - </Text>
                        <View style={styles.dates}>
                          <Text style={styles.month}>
                            {typeof info.endDate === 'string' ||
                            (typeof info.endDate === 'object' &&
                              'month' in info.endDate)
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
                          </Text>
                          <Text style={styles.year}>
                            {typeof info.endDate === 'string' ||
                            (typeof info.endDate === 'object' &&
                              'year' in info.endDate)
                              ? typeof info.endDate === 'string'
                                ? info.endDate === 'Present'
                                  ? ''
                                  : ''
                                : info.endDate.year
                              : ''}
                          </Text>
                        </View>
                      </View>
                    </View>
                  )}
                  <View style={styles.contentContainer}>
                    <Text>{info.jobTitle}</Text>
                    <Text>{info.company}</Text>
                    <Text style={styles.description}>{info.jobDetails}</Text>
                  </View>
                </View>
              ))}
            </View>
          </Page>
          <Page id="resume-template" size="A4" style={styles.page}>
            <View style={styles.sectionContainer}>
              {professional.work.slice(2).map(info => (
                <View style={styles.sectionItemContainer} key={info.id}>
                  {info.jobTitle && (
                    <View style={styles.basicContentContainer}>
                      <View style={styles.dateContainer}>
                        <View style={styles.dates}>
                          <Text style={styles.month}>
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
                          </Text>
                          <Text style={styles.year}>
                            {info.startDate.year || new Date().getFullYear()}
                          </Text>
                        </View>
                        <Text style={styles.dateSeparator}> - </Text>
                        <View style={styles.dates}>
                          <Text style={styles.month}>
                            {typeof info.endDate === 'string' ||
                            (typeof info.endDate === 'object' &&
                              'month' in info.endDate)
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
                          </Text>
                          <Text style={styles.year}>
                            {typeof info.endDate === 'string' ||
                            (typeof info.endDate === 'object' &&
                              'year' in info.endDate)
                              ? typeof info.endDate === 'string'
                                ? info.endDate === 'Present'
                                  ? ''
                                  : ''
                                : info.endDate.year
                              : ''}
                          </Text>
                        </View>
                      </View>
                    </View>
                  )}
                  <View style={styles.contentContainer}>
                    <Text>{info.jobTitle}</Text>
                    <Text>{info.company}</Text>
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
            <View style={styles.skillsSectionContainer}>
              {skills &&
                skills.map(skill => (
                  <View style={styles.skillsItemContainer} key={skill.id}>
                    <Text>{skill.name}</Text>
                  </View>
                ))}
            </View>
            {shouldDisplayTitle && (
              <View style={styles.basicTitleContainer}>
                <Text style={styles.basicsTitle}>Languages</Text>
              </View>
            )}
            <View style={styles.languagesSectionContainer}>
              {languages &&
                languages.map(language => (
                  <View style={styles.languagesItemContainer} key={language.id}>
                    <Text>{language.name}</Text>
                  </View>
                ))}
            </View>
          </Page>
        </>
      ) : (
        <Page id="resume-template" size="A4" style={styles.page}>
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
                      <a href={link.url}>
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
                          </Text>
                          <Text style={styles.year}>
                            {info.startDate.year || new Date().getFullYear()}
                          </Text>
                        </View>
                        <Text style={styles.dateSeparator}> - </Text>
                        <View style={styles.dates}>
                          <Text style={styles.month}>
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
                          </Text>
                          <Text style={styles.year}>
                            {info.endDate.year || new Date().getFullYear()}
                          </Text>
                        </View>
                      </View>
                    </View>
                  )}
                  <View style={styles.contentContainer}>
                    <Text>{info.course}</Text>
                    <Text>{info.school}</Text>
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
                        </Text>
                        <Text style={styles.year}>
                          {info.startDate.year || new Date().getFullYear()}
                        </Text>
                      </View>
                      <Text style={styles.dateSeparator}> - </Text>
                      <View style={styles.dates}>
                        <Text style={styles.month}>
                          {typeof info.endDate === 'string' ||
                          (typeof info.endDate === 'object' &&
                            'month' in info.endDate)
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
                        </Text>
                        <Text style={styles.year}>
                          {typeof info.endDate === 'string' ||
                          (typeof info.endDate === 'object' &&
                            'year' in info.endDate)
                            ? typeof info.endDate === 'string'
                              ? info.endDate === 'Present'
                                ? ''
                                : ''
                              : info.endDate.year
                            : ''}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
                <View style={styles.contentContainer}>
                  <Text>{info.jobTitle}</Text>
                  <Text>{info.company}</Text>
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
          <View style={styles.skillsSectionContainer}>
            {skills &&
              skills.map(skill => (
                <View style={styles.skillsItemContainer} key={skill.id}>
                  <Text>{skill.name}</Text>
                </View>
              ))}
          </View>
          {shouldDisplayTitle && (
            <View style={styles.basicTitleContainer}>
              <Text style={styles.basicsTitle}>Languages</Text>
            </View>
          )}
          <View style={styles.languagesSectionContainer}>
            {languages &&
              languages.map(language => (
                <View style={styles.languagesItemContainer} key={language.id}>
                  <Text>{language.name}</Text>
                </View>
              ))}
          </View>
        </Page>
      )}
    </Document>
  );
};

export default Classic;
