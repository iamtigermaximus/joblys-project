'use client';

import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import {
  AddMoreLinksButton,
  AddMoreLinksContainer,
  BasicDetailsContainer,
  Container,
  Input,
  InputContainer,
  InputLabel,
  InputRow,
  NewLinkContainer,
  TrashIcon,
} from './BasicDetailsForm.styles';
import { BasicInfoType, Resume } from '@/types/resume';
import { v4 as uuidv4 } from 'uuid';
import { FaTrash } from 'react-icons/fa';
import { capitalizeFirstLetter } from '@/components/helpers/formHelpers';
import { useTranslations } from 'next-intl';

interface BasicDetailsFormProps {
  basic: BasicInfoType;
  setResumeInfo: Dispatch<SetStateAction<Resume>>;
}

const BasicDetailsForm: FC<BasicDetailsFormProps> = ({
  basic,
  setResumeInfo,
}) => {
  const t = useTranslations('ResumeBuilder');
  const [additionalLinks, setAdditionalLinks] = useState<string[]>(['']);

  const handleAddMoreLinks = () => {
    const newId = uuidv4();
    setResumeInfo(prevInfo => ({
      ...prevInfo,
      basic: {
        ...prevInfo.basic,
        additionalLinks: [
          ...prevInfo.basic.additionalLinks,
          { id: newId, url: '' },
        ],
      },
    }));
  };

  const handleDeleteLink = (id: string) => {
    setResumeInfo(prevInfo => ({
      ...prevInfo,
      basic: {
        ...prevInfo.basic,
        additionalLinks: prevInfo.basic.additionalLinks.filter(
          link => link.id !== id,
        ),
      },
    }));
  };

  const handleAdditionalLinkChange = (id: string, value: string) => {
    setResumeInfo(prevInfo => ({
      ...prevInfo,
      basic: {
        ...prevInfo.basic,
        additionalLinks: prevInfo.basic.additionalLinks.map(link =>
          link.id === id ? { ...link, url: value } : link,
        ),
      },
    }));
  };

  const handleInputChange = (field: keyof BasicInfoType, value: string) => {
    if (field === 'additionalLinks') {
      setAdditionalLinks([value]);
    } else {
      setResumeInfo(prevInfo => ({
        ...prevInfo,
        basic: {
          ...prevInfo.basic,
          [field]: value,
        },
      }));
    }
  };

  return (
    <Container>
      <BasicDetailsContainer>
        <InputRow>
          <InputContainer>
            <InputLabel>{t('firstname')}</InputLabel>
            <Input
              type="text"
              placeholder={t('firstnamePlaceholder')}
              value={basic.firstName}
              onChange={e =>
                handleInputChange(
                  'firstName',
                  capitalizeFirstLetter(e.target.value),
                )
              }
            />
          </InputContainer>
          <InputContainer>
            <InputLabel>{t('lastname')}</InputLabel>
            <Input
              type="text"
              placeholder={t('lastnamePlaceholder')}
              value={basic.lastName}
              onChange={e =>
                handleInputChange(
                  'lastName',
                  capitalizeFirstLetter(e.target.value),
                )
              }
            />
          </InputContainer>
        </InputRow>
        <InputRow>
          <InputContainer>
            <InputLabel>{t('phone')}</InputLabel>
            <Input
              type="tel"
              placeholder={t('phonePlaceholder')}
              value={basic.phoneNumber}
              onChange={e => handleInputChange('phoneNumber', e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <InputLabel>{t('email')}</InputLabel>
            <Input
              type="email"
              placeholder={t('emailPlaceholder')}
              value={basic.email}
              onChange={e => handleInputChange('email', e.target.value)}
            />
          </InputContainer>
        </InputRow>
        <InputRow>
          <InputContainer>
            <InputLabel>{t('address')}</InputLabel>
            <Input
              type="text"
              placeholder={t('addressPlaceholder')}
              value={basic.address}
              onChange={e =>
                handleInputChange(
                  'address',
                  capitalizeFirstLetter(e.target.value),
                )
              }
            />
          </InputContainer>
        </InputRow>
        <InputRow>
          <InputContainer>
            <InputLabel>{t('linkedin')}</InputLabel>
            <Input
              type="url"
              placeholder="https://example.com"
              value={basic.linkedin}
              onChange={e => handleInputChange('linkedin', e.target.value)}
            />
          </InputContainer>
        </InputRow>
        {basic.additionalLinks.map(link => (
          <InputContainer key={link.id}>
            <InputLabel>{t('link')}</InputLabel>
            <NewLinkContainer>
              <Input
                type="url"
                placeholder="https://example.com"
                value={link.url}
                onChange={e =>
                  handleAdditionalLinkChange(link.id, e.target.value)
                }
              />
              <TrashIcon onClick={() => handleDeleteLink(link.id)}>
                <FaTrash style={{ color: '#2e033b' }} />
              </TrashIcon>
            </NewLinkContainer>
          </InputContainer>
        ))}

        <AddMoreLinksContainer>
          <AddMoreLinksButton onClick={handleAddMoreLinks}>
            {t('addNewLink')}
          </AddMoreLinksButton>
        </AddMoreLinksContainer>
      </BasicDetailsContainer>
    </Container>
  );
};

export default BasicDetailsForm;
