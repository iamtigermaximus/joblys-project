import { BasicInfoType } from '@/types/profile';
import { FC } from 'react';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaHome,
  FaLinkedin,
  FaGlobe,
} from 'react-icons/fa';
import { StyleSheet, View, Text } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  basicsItemsContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  basicsNameContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 2,
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '5px 0',
    fontSize: '17px',
    color: 'white',
  },
  basicsItem: {
    fontSize: '12px',
    padding: '5px 0 ',
    maxWidth: '100%',
    color: 'white',
    wordBreak: 'break-all',
    whiteSpace: 'wrap',
  },
  basicsTitle: {
    color: 'white',
    fontSize: '15px',
  },
});

export const BasicInfoComponent: FC<{ basicInfo: BasicInfoType }> = ({
  basicInfo,
}) => (
  <View>
    <View style={styles.basicsItemsContainer}>
      {basicInfo.firstName && (
        <View style={styles.basicsNameContainer}>
          {/* <Text style={styles.iconContainer}>
            <FaUser />
          </Text> */}
          <Text style={styles.basicsItem}>{basicInfo.firstName}</Text>
          <Text style={styles.basicsItem}>{basicInfo.lastName}</Text>
        </View>
      )}
      {basicInfo.email && (
        <View style={styles.basicsNameContainer}>
          {/* <Text style={styles.iconContainer}>
            <FaEnvelope />
          </Text> */}
          <Text style={styles.basicsItem}>{basicInfo.email}</Text>
        </View>
      )}
      {basicInfo.phoneNumber && (
        <View style={styles.basicsNameContainer}>
          {/* <Text style={styles.iconContainer}>
            <FaPhone />
          </Text> */}
          <Text style={styles.basicsItem}>{basicInfo.phoneNumber}</Text>
        </View>
      )}
      {basicInfo.address && (
        <View style={styles.basicsNameContainer}>
          {/* <Text style={styles.iconContainer}>
            <FaHome />
          </Text> */}
          <Text style={styles.basicsItem}>{basicInfo.address}</Text>
        </View>
      )}
      {basicInfo.linkedin && (
        <View style={styles.basicsNameContainer}>
          {/* <Text style={styles.iconContainer}>
            <FaLinkedin />
          </Text> */}
          <Text style={styles.basicsItem}>{basicInfo.linkedin}</Text>
        </View>
      )}
      {basicInfo?.additionalLinks.map(link => (
        <View style={styles.basicsNameContainer} key={link.id}>
          {/* <Text style={styles.iconContainer}>
            <FaGlobe />
          </Text> */}
          <a href={link.url}>
            <Text style={styles.basicsItem}>{link.url}</Text>
          </a>
        </View>
      ))}
    </View>
  </View>
);
