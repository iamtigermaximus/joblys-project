'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Resume } from '@/types/profile';
import Loader from '../common/loader/Loader';
import { useSession } from 'next-auth/react';
import styled from 'styled-components';
import { breakpoints as bp } from '../../utils/layout';
import DashboardPage from './DashboardPage';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (min-width: ${bp.lg}) {
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding-bottom: 20px;
`;

export const PageName = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: black;
`;

const Dashboard = () => {
  const [profileData, setProfileData] = useState<
    | { id: string; createdAt: string; updatedAt: string; resumeInfo: Resume }[]
    | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);
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
      // setIsLoading(true);
      return;
    }

    const fetchProfileData = async () => {
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
        setProfileData(data);
        setIsLoading(false);
        console.log('DATA', data);
      } catch (error: any) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [session]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profileData) {
    return <div></div>;
  }

  return (
    <Container>
      <DashboardPage resumes={profileData} />
    </Container>
  );
};

export default Dashboard;
