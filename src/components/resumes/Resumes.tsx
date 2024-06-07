'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Resume } from '@/types/profile';
import {
  Container,
  HeaderContainer,
  PageName,
  ViewMode,
  ViewModeContainer,
} from './Resumes.styles';
import Loader from '../common/loader/Loader';
import { useSession } from 'next-auth/react';
import { MdViewModule, MdViewList } from 'react-icons/md';
import ResumePreview from '../templates/resume/defaultTemplate/ResumePreview';

const Resumes = () => {
  const [resumeData, setResumeData] = useState<
    | { id: string; createdAt: string; updatedAt: string; resumeInfo: Resume }[]
    | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session } = useSession();
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');

  useEffect(() => {
    if (!session) {
      const resumes = localStorage.getItem('cachedResumes') || '[]';
      const resumesParsed = JSON.parse(resumes);
      const data = resumesParsed.map((resume: any) => {
        return {
          id: resume.id,
          resumeInfo: resume,
        };
      });
      setResumeData(data);
      setIsLoading(false);
      return;
    }

    const fetchResumeData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('/api/cv');
        const resumes = response.data.body.resumes;

        const data = resumes.map(
          (resume: {
            id: string;
            content: any;
            createdAt: string;
            updatedAt: string;
          }) => {
            return {
              id: resume.id,
              resumeInfo: resume.content,
              createdAt: resume.createdAt,
              updatedAt: resume.updatedAt,
            };
          },
        );
        setResumeData(data);
        setIsLoading(false);
        console.log('DATA', data);
      } catch (error: any) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchResumeData();
  }, [session]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!resumeData) {
    return <div>No profile data available</div>;
  }
  const handleViewModeChange = (mode: 'card' | 'list') => {
    setViewMode(mode);
  };

  return (
    <Container>
      <HeaderContainer>
        <PageName>Resumes</PageName>
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
      <ResumePreview resumes={resumeData} viewMode={viewMode} />
    </Container>
  );
};

export default Resumes;
