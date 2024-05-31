'use client';
import React, { useEffect, useState } from 'react';
import {
  Container,
  HeaderContainer,
  PageName,
  ViewMode,
  ViewModeContainer,
} from './CoverLetters.styles';
import Loader from '../common/loader/Loader';
import CoverLetterPreview from '../templates/coverletter/coverletterTemplate/CoverLetterPreview';
import { MdViewModule, MdViewList } from 'react-icons/md';

const CoverLetters = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');
  const [coverLetters, setCoverLetters] = useState([]);

  useEffect(() => {
    const fetchCoverLetters = async () => {
      try {
        const response = await fetch('/api/coverletterChanges');
        if (!response.ok) {
          throw new Error('Failed to fetch cover letters');
        }
        const data = await response.json();
        setCoverLetters(data.coverLetters);
        setIsLoading(false);
      } catch (error: any) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchCoverLetters();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleViewModeChange = (mode: 'card' | 'list') => {
    setViewMode(mode);
  };

  return (
    <Container>
      <HeaderContainer>
        <PageName>Cover Letters</PageName>
        <ViewModeContainer>
          <ViewMode
            onClick={() => handleViewModeChange('card')}
            active={viewMode === 'card'}
          >
            <MdViewModule />
          </ViewMode>
          <ViewMode
            onClick={() => handleViewModeChange('list')}
            active={viewMode === 'list'}
          >
            <MdViewList />
          </ViewMode>
        </ViewModeContainer>
      </HeaderContainer>
      <CoverLetterPreview viewMode={viewMode} coverLetters={coverLetters} />
    </Container>
  );
};
export default CoverLetters;
