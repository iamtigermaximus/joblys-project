import { FC } from 'react';
import { StyleSheet, View, Text } from '@react-pdf/renderer';
import { ProfessionalExperienceType } from '@/types/resume';

const styles = StyleSheet.create({
  detailsContentContainer: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '12px',
    width: '100%',
    padding: '5px 0 10px',
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
    padding: '2px 0',
    width: '100%',
    height: '100%',
  },
  jobTitle: {
    fontWeight: 700,
    fontSize: '12px',
  },
  company: {
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
  description: {
    fontSize: '10px',
    padding: '5px 0',
    lineHeight: '1.2',
  },
});

const formatMonth = (month: string) => {
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
    present: 'Present',
  };
  return monthMapping[month] || '';
};

const formatDate = (date: string | { month: string; year: string }) => {
  if (typeof date === 'string') {
    if (date.toLowerCase() === 'present') {
      return { month: 'Present', year: '' };
    }
    return { month: '', year: '' };
  } else if (date && typeof date === 'object') {
    return {
      month: formatMonth(date.month),
      year: date.year || '',
    };
  } else {
    return { month: '', year: '' };
  }
};

export const EmploymentInfoComponent: FC<{
  employmentInfo: ProfessionalExperienceType[];
}> = ({ employmentInfo }) => (
  <View style={styles.detailsContentContainer}>
    {employmentInfo.map(info => {
      const startDate = formatDate(info.startDate);
      const endDate = formatDate(info.endDate);

      return (
        <View key={info.id}>
          <View style={styles.employmentDetailsContainer}>
            <View style={styles.employmentDetail}>
              <Text style={styles.jobTitle}>{info.jobTitle}</Text>
              <Text style={styles.company}>{info.company}</Text>
            </View>
            {info.jobTitle && (
              <View style={styles.dateContainer}>
                <View style={styles.dates}>
                  <Text style={styles.month}>{startDate.month}</Text>
                  <Text style={styles.year}>{startDate.year}</Text>
                </View>
                <Text style={styles.dateSeparator}> - </Text>
                <View style={styles.dates}>
                  <Text style={styles.month}>
                    {endDate.month === 'present' ? 'Present' : endDate.month}
                  </Text>
                  <Text style={styles.year}>{endDate.year}</Text>
                </View>
              </View>
            )}
          </View>
          <Text style={styles.description}>{info.jobDetails}</Text>
        </View>
      );
    })}
  </View>
);
