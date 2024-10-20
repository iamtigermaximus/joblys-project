import { Profile } from '@/types/profile';
import { useRouter } from 'next/navigation';
import React, { useState, ReactNode } from 'react';
import {
  FormContainer,
  FieldContainer,
  ButtonGroup,
  Button,
} from './TypeForm.styles';
import { useTranslations } from 'next-intl';
interface TypeFormProps {
  children: ReactNode[];
  formData: Profile;
  setFormData: (data: Profile) => void;
  onSubmit: () => void;
}

const TypeForm: React.FC<TypeFormProps> = ({
  children,
  formData,
  setFormData,
  onSubmit,
}) => {
  const t = useTranslations('ProfileBuilder');
  const [fields, setFields] = useState(0);
  const router = useRouter();

  const nextField = () => {
    if (fields < children.length - 1) setFields(prev => prev + 1);
  };

  const prevField = () => {
    if (fields > 0) setFields(prev => prev - 1);
  };

  const handleSubmit = async () => {
    try {
      await onSubmit();
      router.push('/eazyCV/profile');
    } catch (error: any) {
      console.error('Error:', error);
    }
  };
  return (
    <>
      <FormContainer onSubmit={handleSubmit}>
        <FieldContainer> {children[fields]}</FieldContainer>
      </FormContainer>
      <ButtonGroup>
        {fields > 0 && <Button onClick={prevField}>{t('backButton')}</Button>}
        {fields < children.length - 1 && (
          <Button onClick={nextField}>{t('nextButton')}</Button>
        )}
        {fields === children.length - 1 && (
          <Button onClick={handleSubmit}>{t('submitButton')}</Button>
        )}
      </ButtonGroup>
    </>
  );
};

export default TypeForm;
