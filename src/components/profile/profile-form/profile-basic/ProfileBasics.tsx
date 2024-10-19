import React, { FC, useState, useEffect } from 'react';
import { Profile } from '../../../../types/profile';
import {
  FaCircleChevronUp,
  FaCircleChevronDown,
  FaPlus,
  FaTrash,
  FaCheck,
} from 'react-icons/fa6';
import { FaEdit, FaTimes } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import {
  AccordionSection,
  AccordionHeader,
  AccordionHeaderTitle,
  IconContainer,
  AccordionContent,
  BasicDetailsContainer,
  InputRow,
  InputContainer,
  InputLabel,
  Input,
  NewLinkContainer,
  Button,
  ButtonContainer,
  AddButtonContainer,
  ActionButtonContainer,
  ActionButton,
  AddButton,
} from '../ProfileForm.styles';
import axios from 'axios';
import { useTranslations } from 'next-intl';

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  links: Link[];
}

interface Link {
  id: string;
  url: string;
}

export interface ProfileBasicsProps {
  existingData: Profile;
  setExistingData: React.Dispatch<React.SetStateAction<Profile | null>>;
  isOpen: boolean;
  toggleAccordion: () => void;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  handleCancelEdit: () => void;
}

const ProfileBasics: FC<ProfileBasicsProps> = ({
  existingData,
  setExistingData,
  isOpen,
  toggleAccordion,
  isEditing,
  setIsEditing,
  handleCancelEdit,
}) => {
  const t = useTranslations('ProfilePage');
  const [profileData, setProfileData] = useState<ProfileData>(existingData);

  useEffect(() => {
    setProfileData(prevData => ({
      ...prevData,
      firstName: existingData.firstName || '',
      lastName: existingData.lastName || '',
      email: existingData.email || '',
      contact: existingData.contact || '',
      links:
        existingData.links.length > 0
          ? existingData.links
          : [{ id: uuidv4(), url: '' }],
    }));
  }, [existingData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
  ) => {
    const { value } = e.target;
    setProfileData(prevData => {
      const updatedData = { ...prevData, [fieldName]: value };
      console.log(`Updated ${fieldName}:`, updatedData);
      return updatedData;
    });
  };

  const handleLinkChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
  ) => {
    const { value } = e.target;
    setProfileData(prevData => {
      const updatedLinks = prevData.links.map(link =>
        link.id === id ? { ...link, url: value } : link,
      );
      console.log('Updated links:', updatedLinks);
      return { ...prevData, links: updatedLinks };
    });
  };

  const addNewLink = () => {
    setProfileData(prevData => {
      const newLinks = [...prevData.links, { id: uuidv4(), url: '' }];
      console.log('Added new link:', newLinks);
      return { ...prevData, links: newLinks };
    });
  };

  const removeLink = (id: string) => {
    setProfileData(prevData => {
      const filteredLinks = prevData.links.filter(link => link.id !== id);
      console.log('Removed link:', filteredLinks);
      return { ...prevData, links: filteredLinks };
    });
  };

  const updateExistingData = async (
    profileData: ProfileData,
  ): Promise<void> => {
    try {
      const response = await axios.post('/api/profile', {
        profile: profileData,
      });

      if (response.status === 200) {
        console.log('Profile updated successfully');
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleSaveEdit = async (updatedData: ProfileData) => {
    await updateExistingData(updatedData);
    setIsEditing(false);
  };

  return (
    <AccordionSection>
      <AccordionHeader onClick={toggleAccordion}>
        <AccordionHeaderTitle style={{ color: isOpen ? '' : 'gray' }}>
          {t('basicsTitle')}{' '}
        </AccordionHeaderTitle>
        <span>
          {isOpen ? (
            <IconContainer style={{ fontSize: '24px', color: '#2e033b' }}>
              <FaCircleChevronUp />
            </IconContainer>
          ) : (
            <IconContainer style={{ fontSize: '24px', color: '#2e033b' }}>
              <FaCircleChevronDown />
            </IconContainer>
          )}
        </span>
      </AccordionHeader>
      {isOpen && (
        <AccordionContent>
          <BasicDetailsContainer>
            <ButtonContainer>
              {!isEditing && (
                <Button onClick={() => setIsEditing(true)}>
                  <FaEdit /> {t('edit')}
                </Button>
              )}
            </ButtonContainer>
            <InputRow>
              <InputContainer>
                <InputLabel>{t('firstname')}</InputLabel>
                <Input
                  type="text"
                  placeholder={t('firstnamePlaceholder')}
                  value={profileData.firstName}
                  onChange={e => handleInputChange(e, 'firstName')}
                  readOnly={!isEditing}
                />
              </InputContainer>
              <InputContainer>
                <InputLabel>{t('lastname')}</InputLabel>
                <Input
                  type="text"
                  placeholder={t('lastnamePlaceholder')}
                  value={profileData.lastName}
                  onChange={e => handleInputChange(e, 'lastName')}
                  readOnly={!isEditing}
                />
              </InputContainer>
            </InputRow>
            <InputRow>
              <InputContainer>
                <InputLabel>{t('email')}</InputLabel>
                <Input
                  type="email"
                  placeholder={t('emailPlaceholder')}
                  value={profileData.email}
                  onChange={e => handleInputChange(e, 'email')}
                  readOnly={!isEditing}
                />
              </InputContainer>
              <InputContainer>
                <InputLabel>{t('phone')}</InputLabel>
                <Input
                  type="tel"
                  placeholder={t('phonePlaceholder')}
                  value={profileData.contact}
                  onChange={e => handleInputChange(e, 'contact')}
                  readOnly={!isEditing}
                />
              </InputContainer>
            </InputRow>
            <InputRow>
              {profileData.links.map(link => (
                <InputContainer key={link.id}>
                  <InputLabel>{t('link')}</InputLabel>
                  <NewLinkContainer>
                    <Input
                      type="url"
                      placeholder="https://example.com"
                      value={link.url}
                      onChange={e => handleLinkChange(e, link.id)}
                      readOnly={!isEditing}
                    />
                    {isEditing && (
                      <IconContainer onClick={() => removeLink(link.id)}>
                        <FaTrash style={{ color: '#2e033b' }} />
                      </IconContainer>
                    )}
                  </NewLinkContainer>
                </InputContainer>
              ))}
            </InputRow>

            {isEditing && (
              <AddButtonContainer>
                <AddButton onClick={addNewLink}>{t('addNewLink')}</AddButton>
              </AddButtonContainer>
            )}
            {isEditing && (
              <ActionButtonContainer>
                <ActionButton onClick={handleCancelEdit}>
                  <FaTimes /> {t('cancel')}
                </ActionButton>
                <ActionButton onClick={() => handleSaveEdit(profileData)}>
                  <FaCheck /> {t('done')}
                </ActionButton>
              </ActionButtonContainer>
            )}
          </BasicDetailsContainer>
        </AccordionContent>
      )}
    </AccordionSection>
  );
};

export default ProfileBasics;
