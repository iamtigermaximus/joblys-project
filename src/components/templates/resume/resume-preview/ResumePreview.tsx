import React, { useEffect, useRef, useState } from 'react';
import { Resume, initialResume } from '@/types/resume';
import { useRouter } from 'next/navigation';
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
  FilenameInput,
  ListContentItem,
  ListCreateResumeButton,
  ListTimestampItem,
  MiniDefault,
  PreviewDownloadButton,
  PreviewEditButton,
  ResumeButtonsContainer,
  ResumeCard,
  ResumeContainer,
  ResumeContent,
  ResumeItem,
  ResumeItemContainer,
  ResumesListContainer,
  ResumeTitle,
  ResumeTitleContainer,
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
import DownloadPDFButton from '../defaultTemplate/DownloadPDFButton';
import { formatDistanceToNow } from 'date-fns';
import ConfirmationModal from '../defaultTemplate/ConfirmationModal';
import UpgradeModal from '../defaultTemplate/resume-helpers/UpgradeModal';

import { FaRegCreditCard } from 'react-icons/fa6';
import { convertProfileToResume } from '@/types/profile';
import { v4 as uuidv4 } from 'uuid';
import { formatFilenameFromDate } from '@/components/helpers/formHelpers';
import { useTranslations } from 'next-intl';
import Classic from '../classic/Classic';

interface MiniResumeProps {
  resumes: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    resumeInfo: Resume;
  }[];
  viewMode: 'list' | 'card';
}

const ResumePreview: React.FC<MiniResumeProps> = ({ resumes, viewMode }) => {
  const t = useTranslations('ResumesPage');
  const router = useRouter();
  const [editModalOpenId, setEditModalOpenId] = useState<string | null>(null);
  const [activeElement, setActiveElement] = useState<string | null>(null);
  const [resumesList, setResumesList] = useState(
    resumes.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    ),
  );
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [resumeIdToDelete, setResumeIdToDelete] = useState<string | null>(null);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [editingFilenameId, setEditingFilenameId] = useState<string | null>(
    null,
  );
  const [newFilename, setNewFilename] = useState<string>('');

  const handleResumeNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNewFilename(event.target.value);
  };

  // save the new name
  const handleResumeNameBlur = async (id: string) => {
    if (!newFilename.trim()) return;

    try {
      const response = await fetch(`/api/cv/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newFilename }),
      });

      if (!response.ok) {
        throw new Error('Failed to update resume name');
      }

      setResumesList(prevResumes =>
        prevResumes.map(resume =>
          resume.id === id ? { ...resume, name: newFilename } : resume,
        ),
      );
      setEditingFilenameId(null);
    } catch (error: any) {
      console.error('Error updating resume name:', error.message);
    }
  };

  const handleResumeNameKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>,
    id: string,
  ) => {
    if (event.key === 'Enter') {
      await handleResumeNameBlur(id);
    }
  };

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

    const handleGetStarted = () => {
      const newId = uuidv4();
      router.push(`/resume-builder/resumes/${newId}`);
    };

    try {
      const response = await fetch('/api/profile');
      if (response.ok) {
        profile = (await response.json())?.content;
      }
    } catch (error: any) {
      console.error('Error while fetching profile:', error.message);
      handleGetStarted();
      return;
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
        const {
          body: { message },
        } = await response.json();
        if (message.includes('Cannot create more than')) {
          setShowUpgradeModal(true);
        }
        throw new Error(message);
      }

      const respJson = await response.json();
      const id = respJson?.body?.id;
      if (!id) {
        throw new Error('Did not receive resume id from server');
      }

      router.push(`/resume-builder/resumes/${id}`);
    } catch (error: any) {
      console.error('Error uploading resume:', error.message);
      return;
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
          <CreateResumeButton onClick={handleCreateNewResume}>
            <ButtonLabel> {t('buttonLabel')}</ButtonLabel>
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
                      isMini={true}
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
                                  {t('edit')}
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
                                <ContentItem>{t('delete')}</ContentItem>
                              </EditContentItem>
                            </EditContent>
                          </EditModalContent>
                        </EditModalOverlay>
                      )}
                  </EditContainer>
                </ResumeCard>
                <FilenameContainer>
                  {editingFilenameId === resume.id ? (
                    <FilenameInput
                      type="text"
                      value={newFilename}
                      onChange={handleResumeNameChange}
                      onBlur={() => handleResumeNameBlur(resume.id)}
                      onKeyDown={e => handleResumeNameKeyDown(e, resume.id)}
                      autoFocus
                    />
                  ) : (
                    <Filename
                      onClick={() => {
                        setEditingFilenameId(resume.id);
                        setNewFilename(resume.name);
                      }}
                    >
                      {resume.name}
                    </Filename>
                  )}{' '}
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
                        <ResumeTitleContainer>
                          <ResumeTitle> {t('previewTitle')}</ResumeTitle>
                        </ResumeTitleContainer>
                      </SidebarHeaderItem>
                      <SidebarHeaderClose onClick={handleCloseEditModal}>
                        <IoCloseSharp />
                      </SidebarHeaderClose>
                    </SidebarHeader>
                    <SidebarContentContainer>
                      <ContentContainer>
                        {selectedResume && (
                          <SidebarResumeContent>
                            <Classic
                              id={selectedResume.id}
                              resumeInfo={selectedResume}
                            />
                          </SidebarResumeContent>
                        )}
                      </ContentContainer>
                    </SidebarContentContainer>
                    <ActionContainer>
                      <PreviewEditButton
                        onClick={() => handleEditResume(resume.id)}
                      >
                        {t('edit')}{' '}
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
            <DeleteMessage> {t('deleteMessage')} </DeleteMessage>
          )}
          {showUpgradeModal && (
            <UpgradeModal onClose={() => setShowUpgradeModal(false)} />
          )}
        </ResumeContainer>
      ) : (
        <ResumesListContainer>
          <ListCreateResumeButton>
            <ButtonLabel onClick={handleCreateNewResume}>
              {t('buttonLabel')}
            </ButtonLabel>
          </ListCreateResumeButton>
          {resumesList.map(resume => (
            <ResumeItemContainer key={resume.id}>
              <ResumeItem>
                Resume_
                {formatFilenameFromDate(resume.createdAt)}
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
            <DeleteMessage>{t('deleteMessage')} </DeleteMessage>
          )}
          {showUpgradeModal && (
            <UpgradeModal onClose={() => setShowUpgradeModal(false)} />
          )}
        </ResumesListContainer>
      )}
    </>
  );
};

export default ResumePreview;
