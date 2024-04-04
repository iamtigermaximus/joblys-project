import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import DefaultTemplate from './DefaultTemplate';
import { Resume } from '@/types/profile';
import styled from 'styled-components';

// Styled component for the PDFDownloadLink
const PDFDownload = styled(PDFDownloadLink)`
  text-decoration: none;
  color: gray;

  &:hover {
    color: white;
  }
`;

interface DownloadPDFButtonProps {
  resumeInfo: Resume;
}

const DownloadPDFButton: React.FC<DownloadPDFButtonProps> = ({
  resumeInfo,
}) => (
  <div>
    <PDFDownload
      document={
        <DefaultTemplate resumeInfo={resumeInfo} id="resume-template" />
      }
      fileName="resume.pdf"
    >
      {({ blob, url, loading, error }) =>
        loading ? 'Loading document...' : 'Download'
      }
    </PDFDownload>
  </div>
);

export default DownloadPDFButton;
