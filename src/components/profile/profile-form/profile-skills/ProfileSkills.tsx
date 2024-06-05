import React, { FC, useEffect, useState } from 'react';
import { Profile, Skill } from '../../../../types/profile';
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
  SkillsDetailsContainer,
  SkillsContainer,
  SkillItemContainer,
  Input,
  ButtonContainer,
  Button,
  ActionButton,
  ActionButtonContainer,
} from '../ProfileForm.styles';

export interface ProfileSkillsProps {
  existingData: Profile;
  isOpen: boolean;
  toggleAccordion: () => void;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  handleCancelEdit: () => void;
  handleSaveEdit: () => void;
}

const ProfileSkills: FC<ProfileSkillsProps> = ({
  existingData,
  isOpen,
  toggleAccordion,
  isEditing,
  setIsEditing,
  handleCancelEdit,
  handleSaveEdit,
}) => {
  const [skillsData, setSkillsData] = useState<Skill[]>(existingData.skills);

  useEffect(() => {
    if (existingData.skills && existingData.skills.length > 0) {
      setSkillsData(existingData.skills);
    } else {
      setSkillsData([{ id: '', name: '' }]);
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

  return (
    <AccordionSection>
      <AccordionHeader onClick={toggleAccordion}>
        <AccordionHeaderTitle style={{ color: isOpen ? '' : 'gray' }}>
          Skills
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
          <SkillsDetailsContainer>
            <ButtonContainer>
              {!isEditing && (
                <Button onClick={() => setIsEditing(true)}>
                  <FaEdit /> Edit
                </Button>
              )}
            </ButtonContainer>
            {skillsData.map(skill => (
              <SkillsContainer key={skill.id}>
                <SkillItemContainer>
                  <Input
                    type="text"
                    name="skill"
                    placeholder="Skill"
                    value={skill.name}
                    onChange={e => handleInputChange(e, skill.id)}
                    readOnly={!isEditing}
                  />
                </SkillItemContainer>
              </SkillsContainer>
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
          </SkillsDetailsContainer>
        </AccordionContent>
      )}
    </AccordionSection>
  );
};

export default ProfileSkills;
