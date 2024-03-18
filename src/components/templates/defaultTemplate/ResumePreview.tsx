import React, { useState } from 'react';
import DefaultTemplate from './DefaultTemplate'; // Assuming this is the path to your DefaultTemplate component
import styled from 'styled-components';
import { Resume } from '@/types/profile';
import { breakpoints as bp } from '../../../utils/layout';
import colors from '../../../utils/colors';
import { useRouter } from 'next/navigation';
import { initialResume } from '@/types/profile';
import { FaRegEdit, FaDownload, FaTrashAlt } from 'react-icons/fa';
import { CiMenuKebab } from 'react-icons/ci';
import { IoCloseSharp } from 'react-icons/io5';

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
  overflow: hidden;
  border-radius: 5px;
  object-fit: cover;
  position: relative;
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

export const ResumeContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  transform-origin: top;
  position: relative;
  top: 0;
  width: 100%;
  scale: 0.6;
  position: relative;

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

export const CreateResumeButton = styled.div`
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
  position: relative;

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

export const EditModalOverlay = styled.div`
  position: absolute;
  bottom: calc(100% + 10px);
  right: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const EditModalContent = styled.div`
  background-color: white;
  padding: 10px;
  border-radius: 3px;
  gap: 10px;
  width: 100%;
`;

export const EditContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5vh;
  z-index: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: transparent;
  padding: 10px;

  @media (min-width: ${bp.md}) {
    padding: 10px 20px;
  }

  @media (min-width: ${bp.lg}) {
    padding: 10px 30px;
  }
`;

export const EditButton = styled.button`
  background-color: white;
  /* border: 1px solid green; */
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border: 0.5px solid #f1f1f1;

  &:hover {
    background-color: #f1f1f1;
  }

  &:focus,
  &:active {
    border-color: ${colors.darkPurple};
  }
`;

export const EditContent = styled.div`
  color: gray;
  display: flex;
  padding: 5px 0;
`;

export const SidebarMenuContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  transform: translateX(100%);
  transition: transform 0.5s ease-out;
  border-top: 0.3vh solid #fb5d20;
  color: black;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  z-index: 99;

  &.active {
    transform: translateX(0%);
    transition: transform 0.5s ease-in;
  }

  @media (min-width: ${bp.md}) {
    width: 50%;
  }

  @media (min-width: ${bp.lg}) {
    width: 40%;
  }
`;

export const SidebarHeader = styled.div`
  background-color: ${colors.purple};
  color: ${colors.white};
  height: 6.3vh;
  border-top: 0.3vh solid #fb5d20;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 20px;

  @media (min-width: ${bp.lg}) {
    padding: 20px;
    height: 8.3vh;
  }
`;

export const SidebarHeaderItem = styled.div`
  color: ${colors.white};
  width: 100%;
  display: flex;
  justify-content: center;

  @media (min-width: ${bp.lg}) {
    /* padding: 20px; */
  }
`;

export const ResumeButton = styled.button`
  /* Common button styles go here */
  padding: 8px 16px;
  height: 40px;
  font-size: 16px;
  border: 1px solid white;
  cursor: pointer;
  color: white;
  background-color: transparent;
  border-radius: 3px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const ResumeButtonTitle = styled.h1`
  font-size: 16px;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 5px;
`;

export const SidebarHeaderClose = styled.div`
  color: ${colors.white};
  border: 1px solid white;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 700;
`;

export const SidebarContentContainer = styled.div`
  padding: 20px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  gap: 10px;
`;

export const ActionContainer = styled.div`
  padding: 10px;
  height: 10vh;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PreviewEditButton = styled.button`
  padding: 10px;
  border: 0.5px solid gray;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: transparent;
`;

export const PreviewDownloadButton = styled.button`
  padding: 10px;
  border: none;
  background-color: ${colors.purple};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  color: white;
`;

export const ContentContainer = styled.div`
  padding: 10px;
  height: 100%;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface MiniResumeProps {
  resumes: {
    id: string;
    resumeInfo: Resume;
  }[];
}

const ResumePreview: React.FC<MiniResumeProps> = miniResumeProps => {
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [click, setClick] = useState(false);
  const editMenu = () => setClick(!click);

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

  const handleEditButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    setIsEditModalOpen(prevState => !prevState);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  return (
    <>
      {click && (
        <SidebarMenuContainer
          className={click ? 'category active' : 'category'}
        >
          <SidebarHeader>
            <SidebarHeaderItem>
              <ResumeButton>
                <ResumeButtonTitle>Resume</ResumeButtonTitle>
              </ResumeButton>
            </SidebarHeaderItem>
            <SidebarHeaderClose onClick={editMenu}>
              <IoCloseSharp />
            </SidebarHeaderClose>
          </SidebarHeader>
          <SidebarContentContainer>
            <ContentContainer>RESUME PREVIEW</ContentContainer>
            <ActionContainer>
              <PreviewEditButton>Edit</PreviewEditButton>
              <PreviewDownloadButton>Download</PreviewDownloadButton>
            </ActionContainer>
          </SidebarContentContainer>
        </SidebarMenuContainer>
      )}
      <ResumeContainer>
        <CreateResumeButton>
          <ButtonLabel onClick={handleCreateNewResume}>
            Create new resume
          </ButtonLabel>
        </CreateResumeButton>
        {miniResumeProps.resumes.map(resume => (
          <ResumeCard key={resume.id} onClick={editMenu}>
            <ResumeContent>
              <MiniDefault id={resume.id} resumeInfo={resume.resumeInfo} />
            </ResumeContent>
            <EditContainer>
              <EditButton onClick={event => handleEditButtonClick(event)}>
                <CiMenuKebab />
              </EditButton>
              {isEditModalOpen && (
                <EditModalOverlay>
                  <EditModalContent>
                    <EditContent onClick={e => e.stopPropagation()}>
                      <FaRegEdit style={{ marginRight: '5px' }} />
                      Edit
                    </EditContent>
                    <EditContent onClick={e => e.stopPropagation()}>
                      <FaDownload style={{ marginRight: '5px' }} />
                      Download
                    </EditContent>
                    <EditContent onClick={e => e.stopPropagation()}>
                      <FaTrashAlt style={{ marginRight: '5px' }} />
                      Delete
                    </EditContent>
                  </EditModalContent>
                </EditModalOverlay>
              )}
            </EditContainer>
          </ResumeCard>
        ))}
      </ResumeContainer>
    </>
  );
};

export default ResumePreview;
