'use client';
import React, { useEffect, useState } from 'react';
import { Container, HeaderContainer, PageName } from './CoverLetters.styles';
import CoverLetterPreview from '../templates/coverletterTemplate/CoverLetterPreview';
import Loader from '../common/loader/Loader';

const CoverLetters = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));

        setIsLoading(false);
      } catch (error: any) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  
  return (
    <Container>
      <HeaderContainer>
        <PageName>Cover Letters</PageName>
      </HeaderContainer>
      <CoverLetterPreview />
    </Container>
  );
};
export default CoverLetters;
