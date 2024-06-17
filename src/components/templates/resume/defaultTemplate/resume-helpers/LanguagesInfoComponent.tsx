import { LanguageType } from '@/types/resume';
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
  basicsItem: {
    fontSize: '10px',
    padding: '3px 0 ',
    maxWidth: '100%',
    color: 'white',
    wordBreak: 'break-all',
    whiteSpace: 'wrap',
  },
  basicsItemContainer: {
    padding: '2px 0 ',
    maxWidth: '100%',
  },
});

export const LanguagesInfoComponent: FC<{ languageInfo: LanguageType[] }> = ({
  languageInfo,
}) => (
  <View>
    <View style={styles.detailsContentContainer}>
      {languageInfo &&
        languageInfo.map((language, index) => (
          <View style={styles.basicsItemContainer} key={language.id}>
            <Text style={styles.basicsItem}>{language.name}</Text>
          </View>
        ))}
    </View>
  </View>
);
