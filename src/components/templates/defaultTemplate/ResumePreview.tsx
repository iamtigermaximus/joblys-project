import React, { useState } from 'react';
import { Resume } from '@/types/profile';
import { useRouter } from 'next/navigation';
import { initialResume } from '@/types/profile';
import { FaRegEdit, FaDownload, FaTrashAlt } from 'react-icons/fa';
import { CiMenuKebab } from 'react-icons/ci';
import { IoCloseSharp } from 'react-icons/io5';
import {
  ActionContainer,
  ButtonLabel,
  ContentContainer,
  CreateResumeButton,
  EditButton,
  EditContainer,
  EditContent,
  EditModalContent,
  EditModalOverlay,
  MiniDefault,
  PreviewDownloadButton,
  PreviewEditButton,
  ResumeButton,
  ResumeButtonTitle,
  ResumeCard,
  ResumeContainer,
  ResumeContent,
  SidebarContentContainer,
  SidebarHeader,
  SidebarHeaderClose,
  SidebarHeaderItem,
  SidebarMenuContainer,
} from './ResumePreview.styles';

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
