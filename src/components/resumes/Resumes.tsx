'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Resume } from '@/types/profile';
import { Container, HeaderContainer, PageName } from './Resumes.styles';
import ResumePreview from '../templates/defaultTemplate/ResumePreview';
import Loader from '../common/loader/Loader';

const Resumes = () => {
  const [profileData, setProfileData] = useState<
    { id: string; resumeInfo: Resume }[] | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('/api/cv');
        const resumes = response.data.body.resumes;

        const data = resumes.map((resume: { id: string; content: any }) => {
          return {
            id: resume.id,
            resumeInfo: resume.content,
          };
        });
        console.log(data);
        setProfileData(data);
        setIsLoading(false);
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
