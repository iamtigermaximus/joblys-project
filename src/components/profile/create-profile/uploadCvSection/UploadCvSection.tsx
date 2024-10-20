import React from 'react';
import {
  CreateProfileSection,
  FileType,
  FileTypeContainer,
  InputContainer,
  SectionSubTitle,
  SectionTitle,
  SectionTitleContainer,
  UploadButton,
  UploadCVSection,
} from './UploadCvSection.styles';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

const UploadCvSection = () => {
  const t = useTranslations('ProfileBuilder');
  const router = useRouter();

  const handleUpload = () => {
    // router.push('/pages/navbar-links/profile/upload-cv');
    router.push('/eazyCV/profile/upload-cv');
  };
  return (
    <CreateProfileSection>
      <SectionTitleContainer>
        <SectionTitle>{t('uploadCvTitle')}</SectionTitle>
      </SectionTitleContainer>
      <UploadCVSection>
        <SectionSubTitle>{t('dropFileTitle')}</SectionSubTitle>
        <InputContainer>
          <UploadButton onClick={handleUpload}>
            {t('chooseFileButton')}
          </UploadButton>
        </InputContainer>
        <FileTypeContainer>
          <FileType>
            File types: .docx, .doc, .pdf, .txt, .odt or .rtf.
          </FileType>
          <FileType>Upload up to 2.5 MB</FileType>
        </FileTypeContainer>
      </UploadCVSection>
    </CreateProfileSection>
  );
};

export default UploadCvSection;
