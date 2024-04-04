import { SkillType } from '@/types/profile';
import { FC } from 'react';
import { DetailsContentContainer, BasicsItem } from '../DefaultTemplate.styles';
import { StyleSheet, Page, View, Text } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  detailsContentContainer: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '12px',
    width: '100%',
    padding: '5px 0',
  },
  basicsItem: {
    fontSize: '12px',
    padding: '5px 0 ',
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
export const SkillsInfoComponent: FC<{ skillInfo: SkillType[] }> = ({
  skillInfo,
}) => (
  <div>
    <View style={styles.detailsContentContainer}>
      {skillInfo &&
        skillInfo.length > 0 &&
        skillInfo.map(skill => (
          <View style={styles.basicsItemContainer} key={skill.id}>
            <Text style={styles.basicsItem}>{skill.name}</Text>
          </View>
        ))}
    </View>
  </div>
);
