'use client';

import { Resume, SkillType } from '@/types/resume';
import React, { Dispatch, FC, SetStateAction } from 'react';
import {
  AddButton,
  AddNewSkillContainer,
  Container,
  Input,
  InputContainer,
  InputLabel,
  SkillsDetailsContainer,
  TrashIcon,
} from './SkillForm.styles';
import { FaTrash } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import { capitalizeFirstLetter } from '@/components/helpers/formHelpers';

interface SkillsFormProps {
  skills: SkillType[];
  setResumeInfo: Dispatch<SetStateAction<Resume>>;
}

const SkillsForm: FC<SkillsFormProps> = ({ skills, setResumeInfo }) => {
  const handleInputChange = (id: string, value: string) => {
    setResumeInfo(prevInfo => ({
      ...prevInfo,
      skills: prevInfo.skills.map(enteredSkill =>
        enteredSkill.id === id
          ? { ...enteredSkill, name: value }
          : enteredSkill,
      ),
    }));
  };

  const handleAddMoreSkills = () => {
    const newId = uuidv4();
    setResumeInfo(prevInfo => ({
      ...prevInfo,
      skills: [...prevInfo.skills, { id: newId, name: '' }],
    }));
  };

  const handleDeleteSkill = (id: string) => {
    setResumeInfo(prevInfo => ({
      ...prevInfo,
      skills: prevInfo.skills.filter(skill => skill.id !== id),
    }));
  };

  return (
    <Container>
      <SkillsDetailsContainer>
        <InputLabel>Skill:</InputLabel>
        {skills &&
          skills.length > 0 &&
          skills.map(enteredSkill => (
            <InputContainer key={enteredSkill.id}>
              <InputLabel>Skill:</InputLabel>
              <AddNewSkillContainer>
                <Input
                  type="text"
                  placeholder="eg. Javascript"
                  value={enteredSkill.name}
                  onChange={e =>
                    handleInputChange(
                      enteredSkill.id,
                      capitalizeFirstLetter(e.target.value),
                    )
                  }
                />
                <TrashIcon onClick={() => handleDeleteSkill(enteredSkill.id)}>
                  <FaTrash style={{ color: '#2e033b' }} />
                </TrashIcon>
              </AddNewSkillContainer>
            </InputContainer>
          ))}
        <AddNewSkillContainer>
          <AddButton onClick={handleAddMoreSkills}>Add new skill</AddButton>
        </AddNewSkillContainer>
      </SkillsDetailsContainer>
    </Container>
  );
};

export default SkillsForm;
