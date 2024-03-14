import React from 'react';
import DefaultTemplate from './DefaultTemplate'; // Assuming this is the path to your DefaultTemplate component
import styled from 'styled-components';
import { Resume } from '@/types/profile';
import { breakpoints as bp } from '../../../utils/layout';
import { useRouter } from 'next/navigation';

export const ResumeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding-bottom: 100px;
  align-items: flex-start;
`;

export const ResumeCard = styled.div`
  flex: 1 1 calc(50% - 10px); /* Initially, each card takes 50% width */
  max-width: calc(50% - 10px); /* Maximum width of each card */
  height: 250px;
  border: 1px solid #ccc;
  overflow: hidden;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: ${bp.sm}) {
    height: 350px;
  }

  @media (min-width: ${bp.md}) {
    max-width: calc(33.33% - 15px);
    height: 350px;
  }

  @media (min-width: ${bp.lg}) {
    max-width: calc(25% - 10px);
  }
`;

export const CreateResumeButton = styled.button`
  flex: 1 1 calc(50% - 10px); /* Initially, each card takes 50% width */
  max-width: calc(50% - 10px); /* Maximum width of each card */
  height: 250px;
  border: 1px solid #ccc;
  overflow: hidden;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: ${bp.sm}) {
    height: 350px;
  }

  @media (min-width: ${bp.md}) {
    max-width: calc(33.33% - 15px);
    height: 350px;
  }

  @media (min-width: ${bp.lg}) {
    max-width: calc(25% - 50px);
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
      <ResumeCard>
        <MiniDefault resumeInfo={modifiedResumeInfo} />
      </ResumeCard>
      <ResumeCard>
        <MiniDefault resumeInfo={modifiedResumeInfo} />
      </ResumeCard>
      <ResumeCard>
        <MiniDefault resumeInfo={modifiedResumeInfo} />
      </ResumeCard>
    </ResumeContainer>
  );
};

export default MiniResume;
