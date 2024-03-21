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

const ResumePreview: React.FC<MiniResumeProps> = ({ resumes }) => {
  const router = useRouter();
  const [editModalOpenId, setEditModalOpenId] = useState<string | null>(null);
  const [activeElement, setActiveElement] = useState<string | null>(null);

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
    id: string,
  ) => {
    event.stopPropagation();
    setEditModalOpenId(id === editModalOpenId ? null : id);
    setActiveElement('editModal');
  };

  const handleResumeCardClick = (id: string) => {
    setActiveElement('sidebarMenu');
    setEditModalOpenId(id);
  };

  const handleCloseEditModal = () => {
    setEditModalOpenId(null);
    setActiveElement(null);
  };

  return (
    <ResumeContainer>
      <CreateResumeButton>
        <ButtonLabel onClick={handleCreateNewResume}>
          Create new resume
        </ButtonLabel>
      </CreateResumeButton>
      {resumes.map(resume => (
        <React.Fragment key={resume.id}>
          <ResumeCard onClick={() => handleResumeCardClick(resume.id)}>
            <ResumeContent>
              <MiniDefault id={resume.id} resumeInfo={resume.resumeInfo} />
            </ResumeContent>
            <EditContainer>
              <EditButton
                onClick={event => handleEditButtonClick(event, resume.id)}
              >
                <CiMenuKebab />
              </EditButton>
              {editModalOpenId === resume.id &&
                activeElement === 'editModal' && (
                  <EditModalOverlay onClick={handleCloseEditModal}>
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
          {editModalOpenId === resume.id && activeElement === 'sidebarMenu' && (
            <SidebarMenuContainer key={resume.id} className={'category active'}>
              <SidebarHeader>
                <SidebarHeaderItem>
                  <ResumeButton>
                    <ResumeButtonTitle>Resume</ResumeButtonTitle>
                  </ResumeButton>
                </SidebarHeaderItem>
                <SidebarHeaderClose onClick={handleCloseEditModal}>
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
        </React.Fragment>
      ))}
    </ResumeContainer>
  );
};

export default ResumePreview;
