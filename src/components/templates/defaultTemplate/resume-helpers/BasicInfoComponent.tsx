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
import {
  BasicsItemsContainer,
  BasicsNameContainer,
  IconContainer,
  BasicsItem,
} from '../DefaultTemplate.styles';

export const BasicInfoComponent: FC<{ basicInfo: BasicInfoType }> = ({
  basicInfo,
}) => (
  <div>
    <BasicsItemsContainer>
      {basicInfo.firstName && (
        <BasicsNameContainer>
          <IconContainer>
            <FaUser />
          </IconContainer>
          <BasicsItem>{basicInfo.firstName}</BasicsItem>
          <BasicsItem>{basicInfo.lastName}</BasicsItem>
        </BasicsNameContainer>
      )}
      {basicInfo.email && (
        <BasicsNameContainer>
          <IconContainer>
            <FaEnvelope />
          </IconContainer>
          <BasicsItem>{basicInfo.email}</BasicsItem>
        </BasicsNameContainer>
      )}
      {basicInfo.phoneNumber && (
        <BasicsNameContainer>
          <IconContainer>
            <FaPhone />
          </IconContainer>
          <BasicsItem>{basicInfo.phoneNumber}</BasicsItem>
        </BasicsNameContainer>
      )}
      {basicInfo.address && (
        <BasicsNameContainer>
          <IconContainer>
            <FaHome />
          </IconContainer>
          <BasicsItem>{basicInfo.address}</BasicsItem>
        </BasicsNameContainer>
      )}
      {basicInfo.linkedin && (
        <BasicsNameContainer>
          <IconContainer>
            <FaLinkedin />
          </IconContainer>
          <BasicsItem>{basicInfo.linkedin}</BasicsItem>
        </BasicsNameContainer>
      )}
      {basicInfo?.additionalLinks.map(link => (
        <BasicsNameContainer key={link.id}>
          <IconContainer>
            <FaGlobe />
          </IconContainer>
          <a href={link.url}>
            <BasicsItem>{link.url}</BasicsItem>
          </a>
        </BasicsNameContainer>
      ))}
    </BasicsItemsContainer>
  </div>
);
