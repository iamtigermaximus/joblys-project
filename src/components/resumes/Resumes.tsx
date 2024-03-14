'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Resume } from '@/types/profile';
import { Container, HeaderContainer, PageName } from './Resumes.styles';
import MiniResume from '../templates/defaultTemplate/MiniResume';

const Resumes = () => {
  const [profileData, setProfileData] = useState<Resume | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('/api/cv');

        const profile = response.data.body.profile;

        setProfileData(profile);
        setIsLoading(false);
      } catch (error: any) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
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
      <MiniResume resumeInfo={profileData} />
    </Container>
  );
};

export default Resumes;
