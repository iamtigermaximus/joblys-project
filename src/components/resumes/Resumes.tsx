'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Resume } from '@/types/profile';
import { Container, HeaderContainer, PageName } from './Resumes.styles';
import ResumePreview from '../templates/defaultTemplate/ResumePreview';
import Loader from '../common/loader/Loader';
import { useSession } from 'next-auth/react';

const Resumes = () => {
  const [profileData, setProfileData] = useState<
    | { id: string; createdAt: string; updatedAt: string; resumeInfo: Resume }[]
    | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session } = useSession();

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
      setProfileData(data);
      setIsLoading(false);
      return;
    }

    const fetchProfileData = async () => {
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
        setProfileData(data);
        setIsLoading(false);
        console.log('DATA', data);
      } catch (error: any) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profileData) {
    return <div>No profile data available</div>;
  }

  return (
    <Container>
      <HeaderContainer>
        <PageName>Resumes</PageName>
      </HeaderContainer>
      <ResumePreview resumes={profileData} />
    </Container>
  );
};

export default Resumes;
