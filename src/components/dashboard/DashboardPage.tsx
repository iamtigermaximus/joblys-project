'use client';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import styled from 'styled-components';
import { breakpoints as bp } from '../../utils/layout';
import { FaChevronCircleRight } from 'react-icons/fa';
import { Resume, initialCoverletter, initialResume } from '@/types/profile';
import DefaultTemplate from '../templates/defaultTemplate/DefaultTemplate';
import { formatDistanceToNow } from 'date-fns';
import { useRouter } from 'next/navigation';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 30px 20px;

  @media (min-width: ${bp.lg}) {
    flex-direction: row;
  }
`;

export const ResumesSectionContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: ${bp.lg}) {
    /* max-width: calc(50% - 10px); */
    width: 50%;
  }
`;
export const CoverlettersSectionContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: ${bp.lg}) {
    /* max-width: calc(50% - 10px); */
    width: 50%;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;

  @media (min-width: ${bp.lg}) {
    padding-top: 20px;
  }
`;

export const TitleItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 900;
  padding: 10px 20px;
  letter-spacing: 1px;
`;

export const IconItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 900;
  padding: 10px 20px;
  cursor: pointer;
`;

export const ItemsContainer = styled.h1`
  display: flex;
  /* justify-content: space-around; */
  flex-direction: row;
  width: 100%;
`;

export const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: calc(50% - 10px);
  width: 100%;
  padding: 10px;

  @media (min-width: ${bp.sm}) {
    padding: 20px;
  }

  @media (min-width: ${bp.md}) {
    padding: 20px;
  }

  @media (min-width: ${bp.lg}) {
    max-width: calc(50% - 10px);
  }
`;

export const CardItem = styled.div`
  width: 100%;
  overflow: hidden;
  height: 200px;

  @media (min-width: ${bp.xs}) {
    height: 250px;
    width: 170px;
  }

  @media (min-width: ${bp.sm}) {
    height: 250px;
    width: 200px;
  }

  @media (min-width: ${bp.md}) {
    height: 350px;
    width: 270px;
  }
  @media (min-width: ${bp.lg}) {
    height: 350px;
    width: 250px;
  }
`;

export const ResumeContent = styled.div`
  display: flex;
  justify-content: center;
  transform-origin: left top;
  position: relative;
  top: 0;
  left: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transform: scale(0.45, 0.25);

  @media (min-width: ${bp.xs}) {
    transform: scale(0.48, 0.35);
  }

  @media (min-width: ${bp.sm}) {
    transform: scale(0.55, 0.35);
  }

  @media (min-width: ${bp.md}) {
    transform: scale(0.77, 0.35);
  }

  @media (min-width: ${bp.lg}) {
    transform: scale(0.7, 0.45);
  }
`;

export const CreateButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: calc(50% - 10px);
  width: 100%;
  padding: 10px;

  @media (min-width: ${bp.sm}) {
    padding: 20px;
  }

  @media (min-width: ${bp.md}) {
    padding: 20px;
  }

  @media (min-width: ${bp.lg}) {
    max-width: calc(50% - 10px);
  }
`;

export const CreateButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 11px;
  color: gray;
  border: 1px dashed gray;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  overflow-y: hidden;
  height: 200px;

  &:hover {
    color: purple;
  }

  @media (min-width: ${bp.xs}) {
    height: 250px;
    width: 170px;
  }

  @media (min-width: ${bp.sm}) {
    height: 250px;
    width: 200px;
    font-size: 14px;
  }

  @media (min-width: ${bp.md}) {
    height: 350px;
    width: 270px;
  }
  @media (min-width: ${bp.lg}) {
    height: 350px;
    width: 250px;
    font-size: 16px;
  }
`;

export const TimeStampContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 10px 0;
  gap: 10px;

  @media (min-width: ${bp.xs}) {
    width: 170px;
  }

  @media (min-width: ${bp.sm}) {
    width: 200px;
  }

  @media (min-width: ${bp.md}) {
    width: 270px;
    padding: 10px 10px;
  }
`;

export const Filename = styled.div`
  color: black;
  font-weight: bolder;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 11px;

  @media (min-width: ${bp.sm}) {
    font-size: 14px;
  }

  @media (min-width: ${bp.lg}) {
    font-size: 16px;
  }
`;

export const Timestamp = styled.div`
  font-size: 10px;
  color: gray;
  font-size: 10px;

  @media (min-width: ${bp.sm}) {
    font-size: 12px;
  }

  @media (min-width: ${bp.lg}) {
    font-size: 13px;
  }
`;

export const MiniDefault = styled(DefaultTemplate)`
  width: 100%;
  height: 100%;
`;

interface DashboardPageProps {
  resumes: {
    id: string;
    createdAt: string;
    updatedAt: string;
    resumeInfo: Resume;
  }[];
}

const DashboardPage: React.FC<DashboardPageProps> = ({ resumes }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [resumesList, setResumesList] = useState(resumes);

  const formatTimestamp = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      console.error('Error parsing timestamp:', error);
      return 'Invalid timestamp';
    }
  };

  const handleResumesPage = () => {
    router.push('/joblys/resumes');
  };

  const handleCoverlettersPage = () => {
    router.push('/joblys/cover-letters');
  };

  const handleCreateNewResume = async () => {
    try {
      const response = await fetch('/api/cv/upload', {
        method: 'POST',
        body: JSON.stringify({ resume: initialResume() }),
      });

      if (!response.ok) {
        throw new Error('Failed to upload resume');
      }

      const respJson = await response.json();
      const id = respJson?.body?.id;
      if (!id) {
        throw new Error('Did not receive resume id from server');
      }

      router.push(`/profile-builder/resumes/${id}`);
    } catch (error: any) {
      console.error('Error uploading resume:', error.message);
    }
  };

  const handleCreateNewCoverLetter = async () => {
    try {
      const response = await fetch('/api/resume/upload', {
        method: 'POST',
        body: JSON.stringify({ coverletter: initialCoverletter() }),
      });

      if (!response.ok) {
        throw new Error('Failed to upload resume');
      }

      const respJson = await response.json();
      const id = respJson?.body?.id;
      if (!id) {
        throw new Error('Did not receive resume id from server');
      }

      router.push(`/coverletter-builder/coverletters/${id}`);
    } catch (error: any) {
      console.error('Error uploading resume:', error.message);
    }
  };

  return (
    <Container>
      {resumesList.length === 0 ? (
        <ResumesSectionContainer>
          <TitleContainer>
            <TitleItem>Resume</TitleItem>
            <IconItem>
              <FaChevronCircleRight onClick={handleResumesPage} />
            </IconItem>
          </TitleContainer>
          <CreateButtonContainer>
            <CreateButton onClick={handleCreateNewResume}>
              Create new resume
            </CreateButton>
          </CreateButtonContainer>
        </ResumesSectionContainer>
      ) : (
        <ResumesSectionContainer>
          <TitleContainer>
            <TitleItem>Resume</TitleItem>
            <IconItem>
              <FaChevronCircleRight onClick={handleResumesPage} />
            </IconItem>
          </TitleContainer>
          <ItemsContainer>
            {resumesList &&
              resumesList.slice(0, 2).map(resume => (
                <>
                  <CardContainer>
                    <CardItem>
                      <ResumeContent>
                        <MiniDefault
                          id={resume.id}
                          resumeInfo={resume.resumeInfo}
                        />
                      </ResumeContent>
                    </CardItem>
                    <TimeStampContainer>
                      <Filename>
                        Resume {resume.resumeInfo.basic.firstName}{' '}
                        {resume.resumeInfo.basic.lastName}
                      </Filename>
                      <Timestamp>
                        Edited {formatTimestamp(resume.updatedAt)}
                      </Timestamp>
                    </TimeStampContainer>
                  </CardContainer>
                </>
              ))}
          </ItemsContainer>
        </ResumesSectionContainer>
      )}

      {resumesList.length === 0 ? (
        <CoverlettersSectionContainer>
          <TitleContainer>
            <TitleItem>Cover Letters</TitleItem>
            <IconItem>
              <FaChevronCircleRight onClick={handleCoverlettersPage} />
            </IconItem>
          </TitleContainer>
          <CreateButtonContainer>
            <CreateButton onClick={handleCreateNewCoverLetter}>
              Create new cover letter
            </CreateButton>
          </CreateButtonContainer>
        </CoverlettersSectionContainer>
      ) : (
        <CoverlettersSectionContainer>
          <TitleContainer>
            <TitleItem>Cover Letters</TitleItem>
            <IconItem>
              <FaChevronCircleRight onClick={handleCoverlettersPage} />
            </IconItem>
          </TitleContainer>
          <ItemsContainer>
            {resumesList &&
              resumesList.slice(0, 2).map(resume => (
                <>
                  <CardContainer>
                    <CardItem>
                      <ResumeContent>
                        <MiniDefault
                          id={resume.id}
                          resumeInfo={resume.resumeInfo}
                        />
                      </ResumeContent>
                    </CardItem>
                    <TimeStampContainer>
                      <Filename>
                        Resume {resume.resumeInfo.basic.firstName}{' '}
                        {resume.resumeInfo.basic.lastName}
                      </Filename>
                      <Timestamp>
                        Edited {formatTimestamp(resume.updatedAt)}
                      </Timestamp>
                    </TimeStampContainer>
                  </CardContainer>
                </>
              ))}
          </ItemsContainer>
        </CoverlettersSectionContainer>
      )}
    </Container>
  );
};

export default DashboardPage;
