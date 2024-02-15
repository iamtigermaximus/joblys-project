import React from 'react';
import PageHeader from '@/components/common/page-header/PageHeader';
import { Container } from '../../page.styles';
import UploadCV from '@/components/upload-cv/UploadCV';

const UploadCvPage = () => {
  return (
    <Container>
      <div>
        <title>UPLOAD CV</title>
      </div>
      {/* <PageHeader /> */}
      <UploadCV />
    </Container>
  );
};

export default UploadCvPage;
