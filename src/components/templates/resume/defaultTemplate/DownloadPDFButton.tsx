import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import DefaultTemplate from './DefaultTemplate';
import { Resume } from '@/types/profile';
import styled from 'styled-components';
import { StyleSheet, Page, View, Text, Document } from '@react-pdf/renderer';

const PDFDownload = styled(PDFDownloadLink)`
  text-decoration: none;
  color: ${props => props.color || 'gray'};

  &:hover {
    color: white;
  }
`;

interface DownloadPDFButtonProps {
  resumeInfo: Resume;
  color?: string;
}

const DownloadPDFButton: React.FC<DownloadPDFButtonProps> = ({
  resumeInfo,
  color = 'gray',
}) => {
  // Combine firstName and lastName to generate the file name
  const fileName = `${resumeInfo.basic.firstName}${resumeInfo.basic.lastName}Resume.pdf`;

  return (
    <View>
      <PDFDownload
        document={
          <DefaultTemplate resumeInfo={resumeInfo} id="resume-template" />
        }
        fileName={fileName}
        color={color}
      >
        {({ blob, url, loading, error }) => (
          <View>
            {loading ? <Text>Loading document...</Text> : <Text>Download</Text>}
          </View>
        )}
      </PDFDownload>
    </View>
  );
};

export default DownloadPDFButton;
