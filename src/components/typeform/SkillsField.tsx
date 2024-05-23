import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaTrash } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import { Skill } from '@/types/profile';
import { breakpoints as bp } from '@/utils/layout';

const SkillsFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 200px;

  @media (min-width: ${bp.md}) {
    width: 400px;
  }
`;

const QuestionContainer = styled.div`
  padding: 20px 10px;

  @media (min-width: ${bp.md}) {
    width: 100%;
  }
`;
const TextInputContainer = styled.div`
  width: 100%;
  margin-top: 10px;
`;
const TextInput = styled.input`
  width: 100%;
  padding: 10px;
  /* margin-bottom: 5px; */
  border: none;
  background-color: #f5f5f5;
  outline: none;
  border-bottom: 0.5px solid gray;

  &:focus {
    border-bottom: 1px solid gray;
  }
`;

const AddMoreSkillContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
`;

const AddMoreSkill = styled.button`
  padding: 10px;
`;

export const TrashIcon = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border: none;
  margin: 0 5px;
  font-size: 14px;
  cursor: pointer;
`;

const TextInputItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

interface SkillsFieldProps {
  value: Skill[];
  onChange: (value: Skill[]) => void;
}

const SkillsField: React.FC<SkillsFieldProps> = ({ value, onChange }) => {
  const [skills, setSkills] = useState<Skill[]>(value);

  const handleSkillChange = (id: string, newValue: string) => {
    const updatedSkills = skills.map(skill => {
      if (skill.id === id) {
        return { ...skill, name: newValue };
      }
      return skill;
    });
    setSkills(updatedSkills);
    onChange(updatedSkills);
  };

  const handleAddSkill = () => {
    const newSkill: Skill = { id: uuidv4(), name: '' };
    const newSkills = [...skills, newSkill];
    setSkills(newSkills);
    onChange(newSkills);
  };

  const handleRemoveSkill = (id: string) => {
    const updatedSkills = skills.filter(skill => skill.id !== id);
    setSkills(updatedSkills);
    onChange(updatedSkills);
  };

  // useEffect(() => {
  //   onChange(skills);
  // }, [skills, onChange]);

  return (
    <SkillsFieldContainer>
      <motion.div
        className="col-md-6 offset-md-3"
        initial={{ y: '50vh' }}
        animate={{ y: 0 }}
        transition={{ stiffness: 150 }}
        style={{ width: '100%' }}
      >
        <QuestionContainer>
          <h4>8.Add your skills:</h4>
        </QuestionContainer>
        {value.map(skill => (
          <TextInputContainer key={skill.id}>
            <TextInputItem>
              <TextInput
                type="text"
                placeholder="Skill"
                value={skill.name}
                onChange={e => handleSkillChange(skill.id, e.target.value)}
              />
              <TrashIcon onClick={() => handleRemoveSkill(skill.id)}>
                <FaTrash />
              </TrashIcon>
            </TextInputItem>
          </TextInputContainer>
        ))}
        <AddMoreSkillContainer>
          <AddMoreSkill onClick={handleAddSkill}>Add Skill</AddMoreSkill>
        </AddMoreSkillContainer>
      </motion.div>
    </SkillsFieldContainer>
  );
};

export default SkillsField;
