import { ProfessionalExperienceType } from '@/types/profile';
import { FC } from 'react';
import { StyleSheet, View, Text } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  detailsContentContainer: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '12px',
    width: '100%',
    padding: '5px 0',
  },
  employmentDetailsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  employmentDetail: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    padding: '5px 0',
    width: '100%',
    height: '100%',
  },
  jobTitle: {
    fontWeight: 700,
    // whiteSpace: 'nowrap',
    fontSize: '13px',
  },
  company: {
    fontWeight: 700,
    // whiteSpace: 'nowrap',
    fontSize: '13px',
  },
  dateContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    padding: '5px 0',
  },
  dates: { display: 'flex', flexDirection: 'row', gap: 5 },
  month: { fontSize: '13px' },
  year: { fontSize: '13px' },
  dateSeparator: { fontSize: '13px' },
  description: { fontSize: '12px', padding: '5px 0' },
});

export const EmploymentInfoComponent: FC<{
  employmentInfo: ProfessionalExperienceType[];
}> = ({ employmentInfo }) => (
  <View style={styles.detailsContentContainer}>
    {employmentInfo.map(info => (
      <View key={info.id}>
        <View style={styles.employmentDetailsContainer}>
          <View style={styles.employmentDetail}>
            <Text style={styles.jobTitle}>{info.jobTitle}</Text>
            <Text style={styles.company}>{info.company}</Text>
          </View>
          {info.jobTitle && (
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
                </Text>
                <Text style={styles.year}>
                  {typeof info.endDate === 'string' ||
                  (typeof info.endDate === 'object' && 'year' in info.endDate)
                    ? typeof info.endDate === 'string'
                      ? info.endDate === 'Present'
                        ? ''
                        : ''
                      : info.endDate.year
                    : ''}
                </Text>
              </View>
            </View>
          )}
        </View>

        <Text style={styles.description}>{info.jobDetails}</Text>
      </View>
    ))}
  </View>
);
