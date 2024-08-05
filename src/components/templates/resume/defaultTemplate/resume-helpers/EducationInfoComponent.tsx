import React, { FC } from 'react';
import { StyleSheet, View, Text } from '@react-pdf/renderer';
import { EducationType } from '@/types/resume';

const styles = StyleSheet.create({
  detailsContentContainer: {
    display: 'flex',
    flexDirection: 'column',
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
    padding: '5px 0',
    width: '100%',
  },
  course: {
    fontWeight: 700,
    fontSize: '12px',
  },
  school: {
    fontWeight: 700,
    fontSize: '12px',
  },
  dateContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    padding: '2px 0',
  },
  dates: { display: 'flex', flexDirection: 'row', gap: 5 },
  month: { fontSize: '12px' },
  year: { fontSize: '12px' },
  dateSeparator: { fontSize: '12px' },
  description: { fontSize: '12px', padding: '5px 0', lineHeight: '1.2' },
});

const monthMapping: Record<string, string> = {
  January: 'Jan',
  February: 'Feb',
  March: 'Mar',
  April: 'Apr',
  May: 'May',
  June: 'Jun',
  July: 'Jul',
  August: 'Aug',
  September: 'Sep',
  October: 'Oct',
  November: 'Nov',
  December: 'Dec',
};

const formatMonth = (month: string) => monthMapping[month] || 'Jan';

export const EducationInfoComponent: FC<{ educationInfo: EducationType[] }> = ({
  educationInfo,
}) => (
  <View style={styles.detailsContentContainer}>
    {educationInfo &&
      educationInfo.length > 0 &&
      educationInfo.map(info => (
        <View key={info.id}>
          <View style={styles.educationDetailContainer}>
            <View style={styles.educationDetail}>
              <Text style={styles.course}>{info.course}</Text>
              <Text style={styles.school}>{info.school}</Text>
            </View>
            {info.school && (
              <View style={styles.dateContainer}>
                <View style={styles.dates}>
                  <Text style={styles.month}>
                    {formatMonth(info.startDate.month)}
                  </Text>
                  <Text style={styles.year}>
                    {info.startDate.year || new Date().getFullYear()}
                  </Text>
                </View>
                <Text style={styles.dateSeparator}> - </Text>
                <View style={styles.dates}>
                  <Text style={styles.month}>
                    {formatMonth(info.endDate.month)}
                  </Text>
                  <Text style={styles.year}>
                    {info.endDate.year || new Date().getFullYear()}
                  </Text>
                </View>
              </View>
            )}
          </View>
          {/* <Text style={styles.description}>{info.description}</Text> */}
        </View>
      ))}
  </View>
);
