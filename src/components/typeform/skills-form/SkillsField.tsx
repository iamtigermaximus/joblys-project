import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTrash } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import { Skill } from '@/types/profile';
import { capitalizeFirstLetter } from '../../helpers/formHelpers';
import {
  AddMoreSkill,
  AddMoreSkillContainer,
  Question,
  QuestionContainer,
  SkillsFieldContainer,
  TextInput,
  TextInputContainer,
  TextInputItem,
  TrashIcon,
} from './SkillsField.styles';
import { useTranslations } from 'next-intl';

interface SkillsFieldProps {
  value: Skill[];
  onChange: (value: Skill[]) => void;
}

const SkillsField: React.FC<SkillsFieldProps> = ({ value, onChange }) => {
  const t = useTranslations('ProfileBuilder');
  const [skills, setSkills] = useState<Skill[]>(() => {
    return value.length > 0 ? value : [{ id: uuidv4(), name: '' }];
  });

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
          <Question>{t('qSkills')}</Question>
        </QuestionContainer>
        {skills.map(skill => (
          <TextInputContainer key={skill.id}>
            <TextInputItem>
              <TextInput
                type="text"
                placeholder={t('skillPlaceholder')}
                value={skill.name}
                onChange={e =>
                  handleSkillChange(
                    skill.id,
                    capitalizeFirstLetter(e.target.value),
                  )
                }
              />
              <TrashIcon onClick={() => handleRemoveSkill(skill.id)}>
                <FaTrash />
              </TrashIcon>
            </TextInputItem>
          </TextInputContainer>
        ))}
        <AddMoreSkillContainer>
          <AddMoreSkill onClick={handleAddSkill}>{t('addSkill')}</AddMoreSkill>
        </AddMoreSkillContainer>
      </motion.div>
    </SkillsFieldContainer>
  );
};

export default SkillsField;
