import React, { useEffect, useRef, useState } from 'react';
import { Resume, convertProfileToResume } from '@/types/profile';
import { useRouter } from 'next/navigation';
import { initialResume } from '@/types/profile';
import { FaRegEdit, FaDownload, FaTrashAlt } from 'react-icons/fa';
import { CiMenuKebab } from 'react-icons/ci';
import { IoCloseSharp } from 'react-icons/io5';
import {
  ActionContainer,
  ButtonLabel,
  CardContainer,
  ContentContainer,
  ContentItem,
  CreateResumeButton,
  DeleteMessage,
  EditButton,
  EditContainer,
  EditContent,
  EditContentItem,
  EditModalContent,
  EditModalOverlay,
  Filename,
  FilenameContainer,
  ListContentItem,
  ListCreateResumeButton,
  ListTimestampItem,
  MiniDefault,
  PreviewDownloadButton,
  PreviewEditButton,
  ResumeButton,
  ResumeButtonTitle,
  ResumeButtonsContainer,
  ResumeCard,
  ResumeContainer,
  ResumeContent,
  ResumeItem,
  ResumeItemContainer,
  ResumesListContainer,
  SidebarContentContainer,
  SidebarHeader,
  SidebarHeaderClose,
  SidebarHeaderItem,
  SidebarMenuContainer,
  SidebarResumeContent,
  SidebarTimestampContainer,
  Timestamp,
  TimestampContainer,
  TimestampItem,
} from './ResumePreview.styles';
import DownloadPDFButton from './DownloadPDFButton';
import { formatDistanceToNow } from 'date-fns';
import ConfirmationModal from './ConfirmationModal';
import { FaRegCreditCard } from 'react-icons/fa6';

interface MiniResumeProps {
  resumes: {
    id: string;
    createdAt: string;
    updatedAt: string;
    resumeInfo: Resume;
  }[];
  viewMode: 'list' | 'card';
}

const ResumePreview: React.FC<MiniResumeProps> = ({ resumes, viewMode }) => {
  const router = useRouter();
  const [editModalOpenId, setEditModalOpenId] = useState<string | null>(null);
  const [activeElement, setActiveElement] = useState<string | null>(null);
  const [resumesList, setResumesList] = useState(resumes);
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [resumeIdToDelete, setResumeIdToDelete] = useState<string | null>(null);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const sidebarMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarMenuRef.current &&
        !sidebarMenuRef.current.contains(event.target as Node)
      ) {
        handleCloseSidebarMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (showDeleteMessage) {
      timeout = setTimeout(() => {
        setShowDeleteMessage(false);
      }, 3000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [showDeleteMessage]);

  const handleCloseSidebarMenu = () => {
    // Close the sidebar menu container
    setEditModalOpenId(null);
    setActiveElement(null);
    setSelectedResume(null);
  };

  const handleCreateNewResume = async () => {
    let profile;
    try {
      const response = await fetch('/api/profile');
      if (response.ok) {
        profile = (await response.json())?.content;
      }
    } catch (error: any) {
      console.error('Error while fetching profile:', error.message);
    }

    try {
      let resume: Resume;
      if (profile) {
        resume = convertProfileToResume(profile);
      } else {
        resume = initialResume();
      }

      const response = await fetch('/api/cv/upload', {
        method: 'POST',
        body: JSON.stringify({ resume }),
      });

      if (!response.ok) {
        throw new Error('Failed to upload resume');
      }

      const respJson = await response.json();
      const id = respJson?.body?.id;
      if (!id) {
        throw new Error('Did not receive resume id from server');
      }

      router.push(`/resume-builder/resumes/${id}`);
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

  const handleEditResume = (id: string) => {
    router.push(`/resume-builder/resumes/${id}`);
  };

  const handleDeleteResume = (id: string) => {
    setResumeIdToDelete(id);
    setShowConfirmationModal(true);
  };

  const handleDeleteConfirmation = async () => {
    if (resumeIdToDelete) {
      try {
        const response = await fetch(`/api/cv/${resumeIdToDelete}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete resume');
        }

        const updatedResumes = resumesList.filter(
          resume => resume.id !== resumeIdToDelete,
        );
        setResumesList(updatedResumes);
        setShowConfirmationModal(false);
        setShowDeleteMessage(true);
      } catch (error: any) {
        console.error('Error deleting resume:', error.message);
      }
    }
  };

  return (
    <>
      {viewMode === 'card' ? (
        <ResumeContainer>
          <CreateResumeButton>
            <ButtonLabel onClick={handleCreateNewResume}>
              Create new resume
            </ButtonLabel>
          </CreateResumeButton>
          {resumesList.map(resume => (
            <React.Fragment key={resume.id}>
              <CardContainer>
                <ResumeCard
                  onClick={() =>
                    handleResumeCardClick(resume.id, resume.resumeInfo)
                  }
                  isLast={true}
                >
                  <ResumeContent>
                    <MiniDefault
                      id={resume.id}
                      resumeInfo={resume.resumeInfo}
                    />
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
                                <ContentItem
                                  onClick={() => handleEditResume(resume.id)}
                                >
                                  Edit
                                </ContentItem>
                              </EditContentItem>
                            </EditContent>
                            <EditContent onClick={e => e.stopPropagation()}>
                              <EditContentItem>
                                <ContentItem>
                                  <FaDownload style={{ marginRight: '5px' }} />
                                </ContentItem>
                                <ContentItem>
                                  <DownloadPDFButton
                                    resumeInfo={resume.resumeInfo}
                                  />
                                </ContentItem>
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
                <FilenameContainer>
                  <Filename>
                    Resume {resume.resumeInfo.basic.firstName}{' '}
                    {resume.resumeInfo.basic.lastName}
                  </Filename>
                  {/* <h4>Created At: {formatTimestamp(resume.createdAt)}</h4> */}
                  {/* <Timestamp>Edited {formatTimestamp(resume.updatedAt)}</Timestamp> */}
                  {resume.updatedAt && (
                    <Timestamp>
                      Edited {formatTimestamp(resume.updatedAt)}
                    </Timestamp>
                  )}
                </FilenameContainer>
              </CardContainer>
              {editModalOpenId === resume.id &&
                activeElement === 'sidebarMenu' && (
                  <SidebarMenuContainer
                    key={resume.id}
                    className={'category active'}
                    ref={sidebarMenuRef}
                  >
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
                          <SidebarResumeContent>
                            <MiniDefault
                              id={selectedResume.id}
                              resumeInfo={selectedResume}
                            />
                          </SidebarResumeContent>
                        )}
                        {/* <SidebarTimestampContainer>
                    <TimestampContainer>
                      <TimestampItem>Created</TimestampItem>
                      <TimestampItem>
                        {formatTimestamp(resume.createdAt)}
                      </TimestampItem>
                    </TimestampContainer>
                    <TimestampContainer>
                      <TimestampItem>Edited</TimestampItem>
                      <TimestampItem>
                        {formatTimestamp(resume.updatedAt)}
                      </TimestampItem>
                    </TimestampContainer>
                  </SidebarTimestampContainer> */}
                      </ContentContainer>
                    </SidebarContentContainer>
                    <ActionContainer>
                      <PreviewEditButton
                        onClick={() => handleEditResume(resume.id)}
                      >
                        Edit
                      </PreviewEditButton>
                      <PreviewDownloadButton>
                        <DownloadPDFButton
                          resumeInfo={resume.resumeInfo}
                          color="white"
                        />
                      </PreviewDownloadButton>
                    </ActionContainer>
                  </SidebarMenuContainer>
                )}
            </React.Fragment>
          ))}

          {showConfirmationModal && (
            <ConfirmationModal
              onConfirm={handleDeleteConfirmation}
              onCancel={() => setShowConfirmationModal(false)}
            />
          )}
          {showDeleteMessage && (
            <DeleteMessage>Resume deleted successfully!</DeleteMessage>
          )}
        </ResumeContainer>
      ) : (
        <ResumesListContainer>
          <ListCreateResumeButton>
            <ButtonLabel onClick={handleCreateNewResume}>
              + Create new resume
            </ButtonLabel>
          </ListCreateResumeButton>
          {resumesList.map(resume => (
            <ResumeItemContainer key={resume.id}>
              <ResumeItem>
                Resume {resume.resumeInfo.basic.firstName}{' '}
                {resume.resumeInfo.basic.lastName}
              </ResumeItem>
              <ListTimestampItem>
                {resume.updatedAt && (
                  <Timestamp>
                    Edited {formatTimestamp(resume.updatedAt)}
                  </Timestamp>
                )}
              </ListTimestampItem>
              <ResumeButtonsContainer>
                <ListContentItem onClick={() => handleEditResume(resume.id)}>
                  <FaRegCreditCard />
                </ListContentItem>
                <ListContentItem>
                  <FaDownload />
                </ListContentItem>
                <ListContentItem onClick={() => handleDeleteResume(resume.id)}>
                  <FaTrashAlt />
                </ListContentItem>
              </ResumeButtonsContainer>
            </ResumeItemContainer>
          ))}
          {showConfirmationModal && (
            <ConfirmationModal
              onConfirm={handleDeleteConfirmation}
              onCancel={() => setShowConfirmationModal(false)}
            />
          )}
          {showDeleteMessage && (
            <DeleteMessage>Resume deleted successfully!</DeleteMessage>
          )}
        </ResumesListContainer>
      )}
    </>
  );
};

export default ResumePreview;
