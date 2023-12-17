import React from 'react';
import { Container } from '../page.styles';
import PageHeader from '@/components/common/page-header/PageHeader';
import BasicDetailsForm from '@/components/profileBuilderForms/basic-details/BasicDetailsForm';
import ProfessionalDetailsForm from '@/components/profileBuilderForms/professional-details/ProfessionalDetailsForm';
import EducationalDetailsForm from '@/components/profileBuilderForms/education-details/EducationalDetailsForm';
import ResumeForm from '@/components/profileBuilderForms/profile-form/ResumeForm';
// import Resumes from '@/components/resumes/CreateProfile';

const ProfileBuilderPage = () => {
  return (
    <Container>
      <div>
        <title>Profile Builder Page</title>
      </div>
      <PageHeader />
      {/* <Resumes /> */}
      <div>
        <ResumeForm />
        {/* <BasicDetailsForm /> */}
        {/* <ProfessionalDetailsForm />
        <EducationalDetailsForm /> */}
      </div>
    </Container>
  );
};

export default ProfileBuilderPage;
