'use client';

import React from 'react';
import { StyleSheet, Page, View, Text, Document } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  document: {
    flexDirection: 'column',
    display: 'flex',
    width: '100%',
    gap: 20,
  },
  page: {
    flexDirection: 'row',
    display: 'flex',
    minHeight: '800px',
    width: '100%',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
    color: '#232946',
    justifyContent: 'center',
  },
});

const CoverLetterTemplate = () => {
  return (
    <Document style={styles.document}>
      <Page id="resume-template" size="A4" style={styles.page}>
        Cover Letter Template
      </Page>
    </Document>
  );
};

export default CoverLetterTemplate;
