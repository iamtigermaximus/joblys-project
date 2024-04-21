'use client';
import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { Resume } from '@/types/profile';
import DefaultTemplate from '../templates/defaultTemplate/DefaultTemplate';

import styled from 'styled-components';
import { breakpoints as bp } from '../../utils/layout';

export const Container = styled.div`
  width: 100%;
`;

export const ResumeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding-bottom: 100px;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: row;
`;

const Select = styled.select`
  padding: 10px;
  cursor: pointer;
  padding-right: 10px;
  outline: none;
  width: 100%;
`;

const Option = styled.option`
  width: 100%;
`;

export const SelectedResumeContainer = styled.div`
  padding: 20px;
`;

interface ResumesDropdownProps {
  resumes: {
    id: string;
    createdAt: string;
    updatedAt: string;
    resumeInfo: Resume;
  }[];
}

const ResumesDropdown: React.FC<ResumesDropdownProps> = ({ resumes }) => {
  const [profileData, setProfileData] = useState<
    | { id: string; createdAt: string; updatedAt: string; resumeInfo: Resume }[]
    | null
  >(null);
  const [error, setError] = useState(null);
  const [resumesList, setResumesList] = useState(resumes);
  const [selectedResume, setSelectedResume] = useState<string>('');

  useEffect(() => {
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
        console.log('DATA', data);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchProfileData();
  }, []);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedResume(event.target.value);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profileData) {
    return <div>No profile data available</div>;
  }

  const selectedResumeData = resumes.find(
    resume => resume.id === selectedResume,
  );
  if (
    selectedResumeData &&
    Object.keys(selectedResumeData.resumeInfo).length !== 0
  ) {
    return (
      <Container>
        <Select onChange={handleSelectChange} value={selectedResume}>
          <Option value="">Select a resume</Option>
          {resumesList &&
            resumesList.map(resume => {
              const filename = `${resume.resumeInfo.basic.firstName} ${resume.resumeInfo.basic.lastName}`;
              return (
                <Option key={resume.id} value={resume.id}>
                  {filename}
                </Option>
              );
            })}
        </Select>
        <SelectedResumeContainer>
          <DefaultTemplate
            id={selectedResumeData.id}
            resumeInfo={selectedResumeData.resumeInfo}
          />
        </SelectedResumeContainer>
      </Container>
    );
  } else {
    return (
      <Container>
        <Select onChange={handleSelectChange} value={selectedResume}>
          <Option value="">Select a resume</Option>
          {resumesList &&
            resumesList.map(resume => {
              const filename = `${resume.resumeInfo.basic.firstName} ${resume.resumeInfo.basic.lastName}`;
              return (
                <Option key={resume.id} value={resume.id}>
                  {filename}
                </Option>
              );
            })}
        </Select>
        <p>No resume selected</p>
      </Container>
    );
  }
};
export default ResumesDropdown;
