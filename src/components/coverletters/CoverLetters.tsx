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
import { Coverletter } from '@/types/coverletter';

interface CoverletterData {
  id: string;
  createdAt: string;
  updatedAt: string;
  coverLetterInfo: Coverletter;
}

const CoverLetters = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');
  const [coverLetters, setCoverLetters] = useState<Coverletter[]>([]);

  useEffect(() => {
    const fetchCoverLetters = async () => {
      try {
        const response = await fetch('/api/coverletterChanges');

        const data = await response.json();
        console.log(data); // Log data to check its structure
        setCoverLetters(data.coverLetters || []);
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
