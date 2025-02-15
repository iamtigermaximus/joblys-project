'use client';

import React from 'react';
import { StyleSheet, Page, Document, Text, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  document: {
    display: 'flex',
    width: '100%',
  },
  page: {
    flexDirection: 'column',
    display: 'flex',
    padding: '50px 30px',
    width: '100%',
    backgroundColor: 'white',
    color: '#232946',
  },
  paragraph: {
    marginBottom: 10,
    lineHeight: 1.5,
    fontSize: 10,
  },
});

interface MiniCoverLetterTemplateProps {
  content: string;
}

const MiniCoverLetterTemplate: React.FC<MiniCoverLetterTemplateProps> = ({
  content,
}) => {
  // Check if content is a string
  if (typeof content !== 'string') {
    console.error('Content is not a string:', content);
    return null; // or return an error message
  }

  // Split the content into paragraphs based on newlines
  const paragraphs = content
    .split('\n')
    .filter(paragraph => paragraph.trim() !== '');
  return (
    <Document style={styles.document}>
      <Page id="coverletter-template" size="A4" style={styles.page}>
        {paragraphs.map((paragraph, index) => (
          <View key={index} style={styles.paragraph}>
            <Text>{paragraph}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );
};

export default MiniCoverLetterTemplate;
