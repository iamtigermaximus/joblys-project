'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Resume } from '@/types/resume';
import Loader from '../common/loader/Loader';
import { useSession } from 'next-auth/react';
import DashboardPage from './dashboard-page/DashboardPage';
import { Container } from './Dashboard.styles';

const Dashboard = () => {
  const [resumeData, setResumeData] = useState<
    {
      id: string;
      createdAt: string;
      updatedAt: string;
      resumeInfo: Resume;
    }[]
  >([]);

  const [coverletterData, setCoverletterData] = useState<
    {
      id: string;
      content: string;
      jobDescription: string;
      resumeId: string;
      createdAt: string;
      updatedAt: string;
    }[]
  >([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        const [resumeResponse, coverletterResponse] = await Promise.all([
          axios.get('/api/cv'),
          axios.get('/api/coverletterChanges'),
        ]);

        const resumeData = resumeResponse.data.body.resumes.map(
          (resume: {
            id: string;
            content: any;
            createdAt: string;
            updatedAt: string;
          }) => ({
            id: resume.id,
            resumeInfo: resume.content,
            createdAt: resume.createdAt,
            updatedAt: resume.updatedAt,
          }),
        );

        const coverletterData = coverletterResponse.data.coverLetters.map(
          (coverletter: {
            id: string;
            content: string;
            jobDescription: string;
            resumeId: string;
            createdAt: string;
            updatedAt: string;
          }) => ({
            id: coverletter.id,
            content: coverletter.content,
            jobDescription: coverletter.jobDescription,
            resumeId: coverletter.resumeId,
            createdAt: coverletter.createdAt,
            updatedAt: coverletter.updatedAt,
          }),
        );

        const sortedResumes = resumeData.sort(
          (a: { updatedAt: string }, b: { updatedAt: string }) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
        );
        const sortedCoverletters = coverletterData.sort(
          (a: { updatedAt: string }, b: { updatedAt: string }) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
        );

        setResumeData(sortedResumes);
        setCoverletterData(sortedCoverletters);

        // setResumeData(resumeData);
        // setCoverletterData(coverletterData);
        setIsLoading(false);
      } catch (error: any) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    if (session) {
      fetchDashboardData();
    } else {
      const resumes = localStorage.getItem('cachedResumes') || '[]';
      const resumesParsed = JSON.parse(resumes);
      const data = resumesParsed.map((resume: any) => ({
        id: resume.id,
        resumeInfo: resume,
      }));
      setResumeData(data);
      setIsLoading(false);
    }
  }, [session]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container>
      <DashboardPage resumes={resumeData} coverletters={coverletterData} />
    </Container>
  );
};

export default Dashboard;
