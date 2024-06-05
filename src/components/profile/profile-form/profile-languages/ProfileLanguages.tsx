import React, { FC, useState, useEffect } from 'react';
import { Profile } from '../../../../types/profile';
import {
  FaCircleChevronUp,
  FaCircleChevronDown,
  FaCheck,
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
} from '../ProfileForm';

export interface ProfileLanguagesProps {
  existingData: Profile;
  isOpen: boolean;
  toggleAccordion: () => void;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  handleCancelEdit: () => void;
  handleSaveEdit: () => void;
}

const ProfileLanguages: FC<ProfileLanguagesProps> = ({
  existingData,
  isOpen,
  toggleAccordion,
  isEditing,
  setIsEditing,
  handleCancelEdit,
  handleSaveEdit,
}) => {
  const [languagesData, setLanguagesData] = useState(existingData.languages);

  useEffect(() => {
    if (existingData.languages && existingData.languages.length > 0) {
      setLanguagesData(existingData.languages);
    } else {
      setLanguagesData([{ id: '', name: '' }]);
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
  return (
    <AccordionSection>
      <AccordionHeader onClick={toggleAccordion}>
        <AccordionHeaderTitle style={{ color: isOpen ? '' : 'gray' }}>
          Languages
        </AccordionHeaderTitle>
        <span>
          {isOpen ? (
            <IconContainer style={{ fontSize: '24px' }}>
              <FaCircleChevronUp />
            </IconContainer>
          ) : (
            <IconContainer style={{ fontSize: '24px' }}>
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
                    placeholder="Language"
                    value={language.name}
                    onChange={e => handleInputChange(e, language.id)}
                    readOnly={!isEditing}
                  />
                </LanguageItemContainer>
              </LanguagesContainer>
            ))}
            {isEditing && (
              <ActionButtonContainer>
                <ActionButton onClick={handleCancelEdit}>
                  <FaTimes /> Cancel
                </ActionButton>
                <ActionButton onClick={handleSaveEdit}>
                  <FaCheck /> Done
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
