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
  ContentItem,
  CreateResumeButton,
  EditButton,
  EditContainer,
  EditContent,
  EditContentItem,
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
  const [resumesList, setResumesList] = useState(resumes);
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);

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

  const handleResumeCardClick = (id: string, resumeInfo: Resume) => {
    setActiveElement('sidebarMenu');
    setEditModalOpenId(id);
    setSelectedResume(resumeInfo);
  };

  const handleCloseEditModal = () => {
    setEditModalOpenId(null);
    setActiveElement(null);
    setSelectedResume(null);
  };

  const handleDeleteResume = async (id: string) => {
    try {
      const response = await fetch(`/api/cv/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete resume');
      }

      const updatedResumes = resumesList.filter(resume => resume.id !== id);

      setResumesList(updatedResumes);

      console.log('Resume deleted successfully!');
    } catch (error: any) {
      console.error('Error deleting resume:', error.message);
    }
  };

  const handleEditResume = (id: string) => {
    router.push(`/profile-builder/resumes/${id}`);
  };

  return (
    <ResumeContainer>
      <CreateResumeButton>
        <ButtonLabel onClick={handleCreateNewResume}>
          Create new resume
        </ButtonLabel>
      </CreateResumeButton>
      {resumesList.map(resume => (
        <React.Fragment key={resume.id}>
          <ResumeCard
            onClick={() => handleResumeCardClick(resume.id, resume.resumeInfo)}
          >
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
                        <EditContentItem>
                          <ContentItem>
                            <FaRegEdit style={{ marginRight: '5px' }} />
                          </ContentItem>
                          <ContentItem> Edit</ContentItem>
                        </EditContentItem>
                      </EditContent>
                      <EditContent onClick={e => e.stopPropagation()}>
                        <EditContentItem>
                          <ContentItem>
                            <FaDownload style={{ marginRight: '5px' }} />
                          </ContentItem>
                          <ContentItem> Download</ContentItem>
                        </EditContentItem>
                      </EditContent>
                      <EditContent onClick={e => e.stopPropagation()}>
                        <EditContentItem
                          onClick={() => handleDeleteResume(resume.id)}
                        >
                          <ContentItem>
                            <FaTrashAlt style={{ marginRight: '5px' }} />
                          </ContentItem>
                          <ContentItem> Delete</ContentItem>
                        </EditContentItem>
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
                <ContentContainer>
                  {selectedResume && (
                    <MiniDefault
                      id={selectedResume.id}
                      resumeInfo={selectedResume}
                    />
                  )}
                </ContentContainer>
              </SidebarContentContainer>
              <ActionContainer>
                <PreviewEditButton onClick={() => handleEditResume(resume.id)}>
                  Edit
                </PreviewEditButton>
                <PreviewDownloadButton>Download</PreviewDownloadButton>
              </ActionContainer>
            </SidebarMenuContainer>
          )}
        </React.Fragment>
      ))}
    </ResumeContainer>
  );
};

export default ResumePreview;
