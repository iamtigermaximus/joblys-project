'use client';
import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { Resume } from '@/types/resume';
import styled from 'styled-components';
import { breakpoints as bp } from '../../utils/layout';
import DefaultTemplate from '../templates/resume/defaultTemplate/DefaultTemplate';
import { formatFilenameFromDate } from '../helpers/formHelpers';
import { formatDistanceToNow } from 'date-fns';
import { useTranslations } from 'next-intl';
import Classic from '../templates/resume/classic/Classic';

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
  margin-top: 20px;
  max-height: 500px;
  overflow-y: auto;
  display: flex;
  justify-content: center;

  @media (min-width: ${bp.md}) {
    padding: 0 10px;
  }

  @media (min-width: ${bp.md}) {
    padding: 0 30px;
  }

  @media (min-width: ${bp.md}) {
    padding: 0 100px;
  }

  @media (min-width: ${bp.lg}) {
    padding: 0 0 30px;
  }

  @media (min-width: ${bp.xl}) {
    padding: 0 0 30px;
  }
`;

export const SelectedResume = styled.div`
  display: flex;
  justify-content: center;
  transform-origin: top;
  position: relative;
  top: 0;
  transform: scale(1, 0.5);

  @media (min-width: ${bp.sm}) {
    transform: scale(1, 0.7);
  }

  @media (min-width: ${bp.md}) {
    transform: scale(1, 0.8);
    max-width: 400px;
  }

  @media (min-width: ${bp.lg}) {
    transform: scale(0.8, 0.6);
    width: 400px;
  }

  @media (min-width: ${bp.xl}) {
    transform: scale(1, 0.6);
    width: 400px;
  }
`;

const NoResumeSelected = styled.p`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px;
`;

export const Timestamp = styled.h1`
  font-size: 10px;
  color: gray;
  font-size: 10px;
  margin-left: 10px;

  @media (min-width: ${bp.sm}) {
    font-size: 12px;
  }

  @media (min-width: ${bp.lg}) {
    font-size: 13px;
  }
`;

interface ResumesDropdownProps {
  selectedResumeId: string;
  setSelectedResumeId: (id: string) => void;
}

type ResumeData = {
  id: string;
  createdAt: string;
  updatedAt: string;
  resumeInfo: Resume;
  name?: string;
};

const ResumesDropdown: React.FC<ResumesDropdownProps> = ({
  selectedResumeId,
  setSelectedResumeId,
}) => {
  const t = useTranslations('CoverletterBuilder');
  const [profileData, setProfileData] = useState<ResumeData[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [resumesList, setResumesList] = useState<ResumeData[]>([]);
  const [selectedResume, setSelectedResume] =
    useState<string>(selectedResumeId);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('/api/cv');
        console.log('Response:', response.data);
        const resumes = response.data.body.resumes;

        const data: ResumeData[] = resumes.map(
          (resume: {
            id: string;
            content: any;
            createdAt: string;
            updatedAt: string;
            name: string;
          }) => {
            return {
              id: resume.id,
              resumeInfo: resume.content,
              createdAt: resume.createdAt,
              updatedAt: resume.updatedAt,
              name: resume.name,
            };
          },
        );
        const modifiedResumes: ResumeData[] = data.filter(
          (resume: any) => resume.updatedAt !== resume.createdAt,
        );

        setProfileData(data);
        setResumesList(modifiedResumes);
      } catch (error: any) {
        console.error('Error fetching profile data:', error.message);
        const localResumes = localStorage.getItem('localResumes');
        if (localResumes) {
          setProfileData(JSON.parse(localResumes));
        } else {
          setProfileData([]);
          setResumesList([]);
        }
      }
    };

    fetchProfileData();
  }, []);

  useEffect(() => {
    setSelectedResume(selectedResumeId);
  }, [selectedResumeId]);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedResume(event.target.value);
    setSelectedResumeId(event.target.value);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profileData || profileData.length === 0) {
    return null;
  }

  const selectedResumeData = profileData.find(
    resume => resume.id === selectedResume,
  );
  if (
    selectedResumeData &&
    Object.keys(selectedResumeData.resumeInfo).length !== 0
  ) {
    return (
      <Container>
        <Select onChange={handleSelectChange} value={selectedResume}>
          <Option value="">{t('selectResume')}</Option>
          {resumesList &&
            resumesList.map(resume => {
              const filename =
                resume.name ||
                `Resume ${formatFilenameFromDate(resume.createdAt)}`;

              return (
                <Option key={resume.id} value={resume.id}>
                  {filename}
                  {''}
                  {resume.updatedAt && (
                    <Timestamp>
                      Edited {formatTimestamp(resume.updatedAt)}
                    </Timestamp>
                  )}
                </Option>
              );
            })}
        </Select>
        <SelectedResumeContainer>
          <SelectedResume>
            <Classic
              id={selectedResumeData.id}
              resumeInfo={selectedResumeData.resumeInfo}
            />
          </SelectedResume>
        </SelectedResumeContainer>
      </Container>
    );
  } else {
    return (
      <Container>
        <Select onChange={handleSelectChange} value={selectedResume}>
          <Option value="">{t('selectResume')}</Option>
          {resumesList &&
            resumesList.map(resume => {
              const filename =
                resume.name ||
                `Resume ${formatFilenameFromDate(resume.createdAt)}`;

              return (
                <Option key={resume.id} value={resume.id}>
                  {filename}
                  {''}
                  {resume.updatedAt && (
                    <Timestamp>
                      Edited {formatTimestamp(resume.updatedAt)}
                    </Timestamp>
                  )}
                </Option>
              );
            })}
        </Select>
        <NoResumeSelected>{t('noResumeSelected')}</NoResumeSelected>
      </Container>
    );
  }
};
export default ResumesDropdown;
