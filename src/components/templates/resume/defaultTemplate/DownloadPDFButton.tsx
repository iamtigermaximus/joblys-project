import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import DefaultTemplate from './DefaultTemplate';
import { Resume } from '@/types/resume';
import styled from 'styled-components';
import { View, Text } from '@react-pdf/renderer';

const PDFDownload = styled(PDFDownloadLink)<{ disabled?: boolean }>`
  text-decoration: none;
  color: ${props => (props.disabled ? 'gray' : props.color || 'gray')};
  pointer-events: ${props => (props.disabled ? 'none' : 'auto')};

  &:hover {
    color: white;
  }
`;

interface DownloadPDFButtonProps {
  resumeInfo: Resume;
  color?: string;
  disabled?: boolean;
}

const DownloadPDFButton: React.FC<DownloadPDFButtonProps> = ({
  resumeInfo,
  color = 'gray',
  disabled = false,
}) => {
  const fileName = `${resumeInfo.basic.firstName}${resumeInfo.basic.lastName}Resume.pdf`;

  return (
    <View>
      {!disabled ? (
        <PDFDownload
          document={
            <DefaultTemplate resumeInfo={resumeInfo} id="resume-template" />
          }
          fileName={fileName}
          color={color}
          disabled={disabled}
        >
          {({ blob, url, loading, error }) => (
            <View>
              <Text>{loading ? 'Download' : 'Download'}</Text>
            </View>
          )}
        </PDFDownload>
      ) : (
        <View>
          <Text style={{ color: 'white' }}>Download</Text>
        </View>
      )}
    </View>
  );
};

export default DownloadPDFButton;
