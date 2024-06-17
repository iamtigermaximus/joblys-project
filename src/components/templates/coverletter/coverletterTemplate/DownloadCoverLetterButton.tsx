import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import styled from 'styled-components';
import { View, Text } from '@react-pdf/renderer';
// import CoverLetterTemplate from './CoverLetterTemplate';
import MiniCoverLetterTemplate from './MiniCoverLetterTemplate';
import { Coverletter } from '@/types/coverletter';

const PDFDownload = styled(PDFDownloadLink)`
  text-decoration: none;
  color: ${props => props.color || 'gray'};

  &:hover {
    color: white;
  }
`;

interface DownloadCoverLetterButtonProps {
  coverLetterInfo?: Coverletter;
  color?: string;
}

const DownloadCoverLetterButton: React.FC<DownloadCoverLetterButtonProps> = ({
  coverLetterInfo,
  color = 'gray',
}) => {
  const content = coverLetterInfo?.content || '';
  return (
    <View>
      <PDFDownload
        document={<MiniCoverLetterTemplate content={content} />}
        color={color}
      >
        {({ blob, url, loading, error }) => (
          <View>
            <Text>Download</Text>
          </View>
        )}
      </PDFDownload>
    </View>
  );
};

export default DownloadCoverLetterButton;
