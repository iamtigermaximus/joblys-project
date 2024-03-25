import { SkillType } from '@/types/profile';
import { FC } from 'react';
import { DetailsContentContainer, BasicsItem } from '../DefaultTemplate.styles';

export const SkillsInfoComponent: FC<{ skillInfo: SkillType[] }> = ({
  skillInfo,
}) => (
  <div>
    <DetailsContentContainer>
      {skillInfo &&
        skillInfo.length > 0 &&
        skillInfo.map(skill => (
          <div key={skill.id}>
            <BasicsItem>{skill.name}</BasicsItem>
          </div>
        ))}
    </DetailsContentContainer>
  </div>
);
