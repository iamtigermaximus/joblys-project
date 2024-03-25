import { LanguageType } from '@/types/profile';
import { FC } from 'react';
import { DetailsContentContainer, BasicsItem } from '../DefaultTemplate.styles';

export const LanguagesInfoComponent: FC<{ languageInfo: LanguageType[] }> = ({
  languageInfo,
}) => (
  <div>
    <DetailsContentContainer>
      {languageInfo &&
        languageInfo.map((language, index) => (
          <div key={language.id}>
            <BasicsItem>{language.name}</BasicsItem>
          </div>
        ))}
    </DetailsContentContainer>
  </div>
);
