import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Skill {
  id: number;
  name: string;
}

const SkillsFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  min-height: 200px;
`;

const QuestionContainer = styled.div`
  width: 100%;
  padding: 20px 10px;
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

const SkillsField: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([
    {
      id: 1,
      name: '',
    },
  ]);

  const handleAddSkill = () => {
    const newId = skills.length + 1;
    setSkills([
      ...skills,
      {
        id: newId,
        name: '',
      },
    ]);
  };

  const handleChange = (id: number, value: string) => {
    setSkills(
      skills.map(skill =>
        skill.id === id ? { ...skill, name: value } : skill,
      ),
    );
  };

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
        {skills.map(skill => (
          <TextInputContainer key={skill.id}>
            <TextInput
              type="text"
              placeholder="Skill"
              value={skill.name}
              onChange={e => handleChange(skill.id, e.target.value)}
            />
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
