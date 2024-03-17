import React from 'react';
import DefaultTemplate from './DefaultTemplate'; // Assuming this is the path to your DefaultTemplate component
import styled from 'styled-components';
import { Resume } from '@/types/profile';
import { breakpoints as bp } from '../../../utils/layout';
import { useRouter } from 'next/navigation';
import { initialResume } from '@/types/profile';

export const ResumeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding-bottom: 100px;
  align-items: flex-start;
`;

export const ResumeCard = styled.div`
  flex: 1 1 calc(50% - 10px);
  max-width: calc(50% - 10px);
  height: 250px;
  /* border: 1px solid #ccc; */
  overflow: hidden;
  border-radius: 5px;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
  object-fit: cover;

  @media (min-width: ${bp.sm}) {
    height: 350px;
  }

  @media (min-width: ${bp.md}) {
    max-width: calc(33.33% - 15px);
    height: 350px;
  }

  @media (min-width: ${bp.lg}) {
    max-width: calc(25% - 15px);
    height: 300px;
  }

  @media (min-width: ${bp.xl}) {
    max-width: calc(25% - 20px);
    height: 300px;
  }
`;

export const ResumeContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  transform-origin: top;
  position: relative;
  top: 0;
  width: 100%;
  scale: 0.6;

  @media (min-width: ${bp.sm}) {
    scale: 0.9;
  }

  @media (min-width: ${bp.md}) {
    scale: 0.65;
  }

  @media (min-width: ${bp.lg}) {
    scale: 0.32;
    top: 0;
  }

  @media (min-width: ${bp.xl}) {
    scale: 0.4;
  }
`;

export const CreateResumeButton = styled.button`
  flex: 1 1 calc(50% - 10px);
  max-width: calc(50% - 10px);
  height: 250px;
  border: 1px solid #ccc;
  overflow: hidden;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  @media (min-width: ${bp.sm}) {
    height: 350px;
  }

  @media (min-width: ${bp.md}) {
    max-width: calc(33.33% - 15px);
    height: 350px;
  }

  @media (min-width: ${bp.lg}) {
    max-width: calc(25% - 15px);
    height: 300px;
  }

  @media (min-width: ${bp.xl}) {
    max-width: calc(25% - 20px);
    height: 300px;
  }
`;

export const ButtonLabel = styled.h1`
  font-size: 16px;
  color: #b0b0b0;

  &:hover {
    color: #520668;
  }
`;

export const MiniDefault = styled(DefaultTemplate)`
  width: 100%;
  min-height: 300px;
  min-width: 250px;
`;

interface MiniResumeProps {
  resumes: {
    id: string;
    resumeInfo: Resume;
  }[];
}

const ResumePreview: React.FC<MiniResumeProps> = (miniResumeProps) => {
  const router = useRouter();

  const handleCreateNewResume = async () => {
    try {
      const response = await fetch('/api/cv/upload', {
        method: 'POST',
        body: JSON.stringify({ resume: initialResume() }),
      });

      if (!response.ok) {
        throw new Error('Failed to upload resume');
      }

      console.log('Resume uploaded successfully!');

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

  return (
    <ResumeContainer>
      <CreateResumeButton>
        <ButtonLabel onClick={handleCreateNewResume}>
          Create new resume
        </ButtonLabel>
      </CreateResumeButton>
      {miniResumeProps.resumes.map((resume) => (
        <ResumeCard key={resume.id}>
          <ResumeContent>
            <MiniDefault
              id={resume.id}
              resumeInfo={resume.resumeInfo}
            />
          </ResumeContent>
        </ResumeCard>))}
    </ResumeContainer>
  );
};

export default ResumePreview;
