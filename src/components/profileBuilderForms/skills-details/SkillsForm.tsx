'use client';

import { ResumeInfoType, SkillType } from '@/types/profile';
import React, {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useState
} from 'react';
import {
  AddButton,
  AddNewSkillContainer,
  Container,
  DoneButton,
  Input,
  InputContainer,
  InputLabel,
  SkillsDetailsContainer,
  TrashIcon
} from './SkillForm.styles';
import { FaTrash } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';

interface SkillsFormProps {
  resumeInfo: { skills: { skill: SkillType[] } };
  setResumeInfo: Dispatch<SetStateAction<ResumeInfoType>>;
}

const SkillsForm: FC<SkillsFormProps> = ({ resumeInfo, setResumeInfo }) => {
  // const [newSkill, setNewSkill] = useState('');

  const handleInputChange = (id: string, value: string) => {
    setResumeInfo(prevInfo => ({
      ...prevInfo,
      skills: {
        ...prevInfo.skills,
        skill: prevInfo.skills.skill.map(enteredSkill =>
          enteredSkill.id === id
            ? { ...enteredSkill, name: value }
            : enteredSkill
        )
      }
    }));
  };
  const handleAddMoreSkills = () => {
    const newId = uuidv4();
    setResumeInfo(prevInfo => ({
      ...prevInfo,
      skills: {
        ...prevInfo.skills,
        skill: [...prevInfo.skills.skill, { id: newId, name: '' }]
      }
    }));
  };

  const handleDeleteSkill = (id: string) => {
    setResumeInfo(prevInfo => ({
      ...prevInfo,
      skills: {
        ...prevInfo.skills,
        skill: prevInfo.skills.skill.filter(skill => skill.id !== id)
      }
    }));
  };

  return (
    <Container>
      <SkillsDetailsContainer>
        {resumeInfo.skills.skill.map(enteredSkill => (
          <InputContainer key={enteredSkill.id}>
            <InputLabel>Skill:</InputLabel>
            <AddNewSkillContainer>
              <Input
                type="text"
                placeholder="eg. Javascript"
                value={enteredSkill.name}
                onChange={e =>
                  handleInputChange(enteredSkill.id, e.target.value)
                }
              />
              <TrashIcon onClick={() => handleDeleteSkill(enteredSkill.id)}>
                <FaTrash />
              </TrashIcon>
            </AddNewSkillContainer>
          </InputContainer>
        ))}
        <AddButton onClick={handleAddMoreSkills}>Add new skill</AddButton>
      </SkillsDetailsContainer>
    </Container>
  );
};

export default SkillsForm;
