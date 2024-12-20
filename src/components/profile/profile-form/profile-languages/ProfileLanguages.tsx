import React, { FC, useState, useEffect } from 'react';
import { Profile, Language } from '../../../../types/profile';
import {
  FaCircleChevronUp,
  FaCircleChevronDown,
  FaCheck,
  FaTrash,
} from 'react-icons/fa6';
import { FaEdit, FaTimes } from 'react-icons/fa';

import {
  AccordionSection,
  AccordionHeader,
  AccordionHeaderTitle,
  IconContainer,
  AccordionContent,
  LanguagesDetailsContainer,
  LanguagesContainer,
  LanguageItemContainer,
  Input,
  ButtonContainer,
  Button,
  ActionButton,
  ActionButtonContainer,
  AddButton,
  AddButtonContainer,
} from '../ProfileForm.styles';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useTranslations } from 'next-intl';

export interface ProfileLanguagesProps {
  existingData: Profile;
  setExistingData: React.Dispatch<React.SetStateAction<Profile | null>>;
  isOpen: boolean;
  toggleAccordion: () => void;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  handleCancelEdit: () => void;
}

const ProfileLanguages: FC<ProfileLanguagesProps> = ({
  existingData,
  isOpen,
  toggleAccordion,
  isEditing,
  setIsEditing,
  handleCancelEdit,
  setExistingData,
}) => {
  const t = useTranslations('ProfilePage');
  const [languagesData, setLanguagesData] = useState<Language[]>(
    existingData.languages,
  );

  // useEffect(() => {
  //   if (existingData.languages && existingData.languages.length > 0) {
  //     setLanguagesData(existingData.languages);
  //   } else {
  //     setLanguagesData([{ id: '', name: '' }]);
  //   }
  // }, [existingData.languages]);

  useEffect(() => {
    // Generate unique IDs for existing skills if needed
    if (existingData.languages && existingData.languages.length > 0) {
      setLanguagesData(
        existingData.languages.map(language =>
          language.id ? language : { ...language, id: uuidv4() },
        ),
      );
    } else {
      setLanguagesData([{ id: uuidv4(), name: '' }]);
    }
  }, [existingData.languages]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
  ) => {
    const { value } = e.target;
    setLanguagesData(prevData =>
      prevData.map(language =>
        language.id === id ? { ...language, name: value } : language,
      ),
    );
  };

  const handleAddLanguage = () => {
    setLanguagesData(prevData => [...prevData, { id: uuidv4(), name: '' }]);
  };

  const handleDeleteLanguage = (id: string) => {
    setLanguagesData(prevData =>
      prevData.filter(language => language.id !== id),
    );
  };

  const updateLanguagesData = async (languages: Language[]) => {
    try {
      const response = await axios.post('/api/profile', {
        profile: { ...existingData, languages },
      });
      if (response.status === 200) {
        console.log('Languages updated successfully');
        setExistingData(prev => ({
          ...prev!,
          languages,
        }));
      } else {
        console.error('Failed to update languages');
      }
    } catch (error) {
      console.error('Error updating languages:', error);
    }
  };

  const handleSaveEdit = async () => {
    await updateLanguagesData(languagesData);
    setIsEditing(false);
  };
  return (
    <AccordionSection>
      <AccordionHeader onClick={toggleAccordion}>
        <AccordionHeaderTitle style={{ color: isOpen ? '' : 'gray' }}>
          {t('languagesTitle')}{' '}
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
          <LanguagesDetailsContainer>
            <ButtonContainer>
              {!isEditing && (
                <Button onClick={() => setIsEditing(true)}>
                  <FaEdit /> Edit
                </Button>
              )}
            </ButtonContainer>
            {languagesData.map(language => (
              <LanguagesContainer key={language.id}>
                <LanguageItemContainer>
                  <Input
                    type="text"
                    name="language"
                    placeholder={t('languagePlaceholder')}
                    value={language.name}
                    onChange={e => handleInputChange(e, language.id)}
                    readOnly={!isEditing}
                  />
                  {isEditing && (
                    <IconContainer
                      onClick={() => handleDeleteLanguage(language.id)}
                    >
                      <FaTrash style={{ color: '#2e033b' }} />
                    </IconContainer>
                  )}
                </LanguageItemContainer>
              </LanguagesContainer>
            ))}
            {isEditing && (
              <AddButtonContainer>
                <AddButton onClick={handleAddLanguage}>
                  {t('addNewLanguage')}{' '}
                </AddButton>
              </AddButtonContainer>
            )}
            {isEditing && (
              <ActionButtonContainer>
                <ActionButton onClick={handleCancelEdit}>
                  <FaTimes /> {t('cancel')}
                </ActionButton>
                <ActionButton onClick={handleSaveEdit}>
                  <FaCheck /> {t('done')}
                </ActionButton>
              </ActionButtonContainer>
            )}
          </LanguagesDetailsContainer>
        </AccordionContent>
      )}
    </AccordionSection>
  );
};

export default ProfileLanguages;
