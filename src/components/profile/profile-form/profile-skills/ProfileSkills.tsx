import React, { FC, useEffect, useState } from 'react';
import { Profile, Skill } from '../../../../types/profile';
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
  SkillsDetailsContainer,
  SkillsContainer,
  SkillItemContainer,
  Input,
  ButtonContainer,
  Button,
  ActionButton,
  ActionButtonContainer,
  AddButtonContainer,
  AddButton,
} from '../ProfileForm.styles';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useTranslations } from 'next-intl';

export interface ProfileSkillsProps {
  existingData: Profile;
  setExistingData: React.Dispatch<React.SetStateAction<Profile | null>>;
  isOpen: boolean;
  toggleAccordion: () => void;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  handleCancelEdit: () => void;
}

const ProfileSkills: FC<ProfileSkillsProps> = ({
  existingData,
  isOpen,
  toggleAccordion,
  isEditing,
  setIsEditing,
  handleCancelEdit,
  setExistingData,
}) => {
  const t = useTranslations('ProfilePage');
  const [skillsData, setSkillsData] = useState<Skill[]>(existingData.skills);

  // useEffect(() => {
  //   if (existingData.skills && existingData.skills.length > 0) {
  //     setSkillsData(existingData.skills);
  //   } else {
  //     setSkillsData([{ id: '', name: '' }]);
  //   }
  // }, [existingData.skills]);

  useEffect(() => {
    // Generate unique IDs for existing skills if needed
    if (existingData.skills && existingData.skills.length > 0) {
      setSkillsData(
        existingData.skills.map(skill =>
          skill.id ? skill : { ...skill, id: uuidv4() },
        ),
      );
    } else {
      setSkillsData([{ id: uuidv4(), name: '' }]);
    }
  }, [existingData.skills]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
  ) => {
    const { value } = e.target;
    setSkillsData(prevData =>
      prevData.map(skill =>
        skill.id === id ? { ...skill, name: value } : skill,
      ),
    );
  };

  const handleAddSkill = () => {
    setSkillsData(prevData => [...prevData, { id: uuidv4(), name: '' }]);
  };

  const handleDeleteSkill = (id: string) => {
    setSkillsData(prevData => prevData.filter(skill => skill.id !== id));
  };

  const updateSkillsData = async (skills: Skill[]) => {
    try {
      const response = await axios.post('/api/profile', {
        profile: { ...existingData, skills },
      });
      if (response.status === 200) {
        console.log('Skills updated successfully');
        setExistingData(prev => ({
          ...prev!,
          skills,
        }));
      } else {
        console.error('Failed to update skills');
      }
    } catch (error) {
      console.error('Error updating skills:', error);
    }
  };

  const handleSaveEdit = async () => {
    await updateSkillsData(skillsData);
    setIsEditing(false);
  };

  return (
    <AccordionSection>
      <AccordionHeader onClick={toggleAccordion}>
        <AccordionHeaderTitle style={{ color: isOpen ? '' : 'gray' }}>
          {t('skillsTitle')}{' '}
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
          <SkillsDetailsContainer>
            <ButtonContainer>
              {!isEditing && (
                <Button onClick={() => setIsEditing(true)}>
                  <FaEdit /> {t('edit')}
                </Button>
              )}
            </ButtonContainer>
            {skillsData.map(skill => (
              <SkillsContainer key={skill.id}>
                <SkillItemContainer>
                  <Input
                    type="text"
                    name="skill"
                    placeholder="{t('skillPlaceholder')}"
                    value={skill.name}
                    onChange={e => handleInputChange(e, skill.id)}
                    readOnly={!isEditing}
                  />
                  {isEditing && (
                    <IconContainer onClick={() => handleDeleteSkill(skill.id)}>
                      <FaTrash style={{ color: '#2e033b' }} />
                    </IconContainer>
                  )}
                </SkillItemContainer>
              </SkillsContainer>
            ))}
            {isEditing && (
              <AddButtonContainer>
                <AddButton onClick={handleAddSkill}>
                  {t('addNewSkill')}
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
          </SkillsDetailsContainer>
        </AccordionContent>
      )}
    </AccordionSection>
  );
};

export default ProfileSkills;
