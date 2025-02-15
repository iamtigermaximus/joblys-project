'use client';

import React, { useEffect, useState } from 'react';
import { StyleSheet, Page, Document, Text, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  document: {
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  miniPage: {
    flexDirection: 'column',
    display: 'flex',
    paddingBottom: 40,
    paddingTop: 40,
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  page: {
    flexDirection: 'column',
    display: 'flex',
    paddingBottom: 40,
    paddingTop: 40,
    paddingLeft: 50,
    paddingRight: 50,
    width: '100%',
    height: '100%',

    backgroundColor: 'white',
    color: '#232946',
  },
  miniParagraph: {
    marginBottom: 10,
    lineHeight: 1.5,
    fontSize: 6,
  },
  paragraph: {
    marginBottom: 10,
    lineHeight: 1.5,
    fontSize: 10,
  },
});

interface CoverLetterTemplateProps {
  content: string;
  isMini?: boolean;
}

const CoverLetterTemplate: React.FC<CoverLetterTemplateProps> = ({
  content,
  isMini,
}) => {
  const [displayedContent, setDisplayedContent] = useState('');

  useEffect(() => {
    setDisplayedContent(content);
  }, [content]);

  // Check if content is a string
  if (typeof content !== 'string') {
    console.error('Content is not a string:', content);
    return null; // or return an error message
  }

  // Split the displayed content into paragraphs based on newlines
  const paragraphs = displayedContent
    .split('\n')
    .filter(paragraph => paragraph.trim() !== '');
  return (
    <Document style={styles.document}>
      <Page
        id="coverletter-template"
        size="A4"
        style={isMini ? styles.miniPage : styles.page}
      >
        {paragraphs.map((paragraph, index) => (
          <View
            key={index}
            style={isMini ? styles.miniParagraph : styles.paragraph}
          >
            <Text>{paragraph}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );
};

export default CoverLetterTemplate;
