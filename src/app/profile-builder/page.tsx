import React from 'react';
import {
  Container,
  FormViewerContainer,
  ResumeFormContainer,
} from '../page.styles';
import PageHeader from '@/components/common/page-header/PageHeader';
import ResumeForm from '@/components/profileBuilderForms/profile-form/ResumeForm';
import ResumeTemplate from '@/components/profileBuilderForms/resume-template/ResumeTemplate';

const ProfileBuilderPage = () => {
  return (
    <Container>
      <div>
        <title>Profile Builder Page</title>
      </div>
      <PageHeader />
      <FormViewerContainer>
        <ResumeFormContainer>
          <ResumeForm />
        </ResumeFormContainer>
        <ResumeFormContainer>
          <ResumeTemplate />
        </ResumeFormContainer>
      </FormViewerContainer>
    </Container>
  );
};

export default ProfileBuilderPage;
