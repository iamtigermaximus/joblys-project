import { EducationType } from '@/types/profile';
import { FC } from 'react';
import {
  DetailsContentContainer,
  EducationDetailContainer,
  EducationDetail,
  Course,
  School,
  DateContainer,
  Dates,
  Month,
  Year,
  DateSeparator,
  Description,
} from '../DefaultTemplate.styles';
import { StyleSheet, Page, View, Text } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  detailsContentContainer: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '12px',
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
    gap: 2,
    padding: '5px 0',
  },
  course: {
    width: '100%',
    fontWeight: 700,
    whiteSpace: 'nowrap',
    fontSize: '13px',
  },
  school: {
    width: '100%',
    fontWeight: 700,
    whiteSpace: 'nowrap',
    fontSize: '13px',
  },
  dateContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
  dates: { display: 'flex', flexDirection: 'row', gap: 5 },
  month: { fontSize: '13px' },
  year: { fontSize: '13px' },
  dateSeparator: { fontSize: '13px' },
  description: { fontSize: '12px', padding: '5px 0' },
});

export const EducationInfoComponent: FC<{ educationInfo: EducationType[] }> = ({
  educationInfo,
}) => (
  <View style={styles.detailsContentContainer}>
    {educationInfo &&
      educationInfo?.length > 0 &&
      educationInfo.map((info, index) => (
        <div key={info.id}>
          <View style={styles.educationDetailContainer}>
            <View style={styles.educationDetail}>
              <Text style={styles.course}>{info.course}</Text>
              <Text style={styles.school}>{info.school}</Text>
            </View>
            {info.school && (
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
            )}
          </View>
          <Text style={styles.description}>{info.description}</Text>
        </div>
      ))}
  </View>
);
