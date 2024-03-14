import React from 'react';
import DefaultTemplate from './DefaultTemplate'; // Assuming this is the path to your DefaultTemplate component
import styled from 'styled-components';
import { Resume } from '@/types/profile';
import { breakpoints as bp } from '../../../utils/layout';
import { useRouter } from 'next/navigation';

export const ResumeContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
`;

export const ResumeCard = styled.div`
  height: 250px;
  max-width: calc(50% - 10px);
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
    max-width: calc(25% - 20px);
    height: 300px;
  }

  @media (min-width: ${bp.lg}) {
    height: 350px;
    translate: scale(0.42);
  }
`;

export const CreateResumeButton = styled.button`
  border: 1px dashed gray;
  width: 100%;
  height: 250px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  max-width: calc(50% - 10px);

  &:hover {
    color: #520668;
    border: 1px dashed #520668;
  }
  @media (min-width: ${bp.sm}) {
    height: 350px;
  }

  @media (min-width: ${bp.md}) {
    max-width: calc(25% - 20px);
    height: 300px;
  }

  @media (min-width: ${bp.lg}) {
    height: 350px;
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
`;

interface MiniResumeProps {
  resumeInfo: Resume; // Declare the type of the resumeInfo prop
}

const MiniResume: React.FC<MiniResumeProps> = ({ resumeInfo }) => {
  const modifiedResumeInfo = { ...resumeInfo };
  const router = useRouter();

  const handleCreateNewResume = () => {
    router.push('/profile-builder');
  };
  return (
    <ResumeContainer>
      <CreateResumeButton>
        <ButtonLabel onClick={handleCreateNewResume}>
          Create new resume
        </ButtonLabel>
      </CreateResumeButton>
      <ResumeCard>
        <MiniDefault resumeInfo={modifiedResumeInfo} />
      </ResumeCard>
    </ResumeContainer>
  );
};

export default MiniResume;
