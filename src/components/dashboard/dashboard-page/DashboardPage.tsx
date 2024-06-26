'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { FaChevronCircleRight } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';
import { useRouter } from 'next/navigation';
import { FaRegEdit, FaDownload, FaTrashAlt } from 'react-icons/fa';
import { CiMenuKebab } from 'react-icons/ci';
import { IoCloseSharp } from 'react-icons/io5';
import DownloadPDFButton from '../../templates/resume/defaultTemplate/DownloadPDFButton';
import ConfirmationModal from '../../templates/resume/defaultTemplate/ConfirmationModal';
import {
  Container,
  ResumesSectionContainer,
  TitleContainer,
  TitleItem,
  IconItem,
  CreateButtonContainer,
  CreateButton,
  ItemsContainer,
  CardContainer,
  CardItem,
  ResumeContent,
  MiniDefault,
  EditContainer,
  EditButton,
  EditModalOverlay,
  EditModalContent,
  EditContent,
  EditContentItem,
  ContentItem,
  TimeStampContainer,
  Filename,
  Timestamp,
  SidebarMenuContainer,
  SidebarHeader,
  SidebarHeaderItem,
  ResumeButton,
  ResumeButtonTitle,
  SidebarHeaderClose,
  SidebarContentContainer,
  ContentContainer,
  SidebarResumeContent,
  ActionContainer,
  PreviewEditButton,
  PreviewDownloadButton,
  DeleteMessage,
  CoverlettersSectionContainer,
  CoverLetterContent,
  MiniCoverLetter,
} from './DashboardPage.styles';
import { Resume, initialResume } from '@/types/resume';
import { Coverletter, initialCoverletter } from '@/types/coverletter';
import { convertProfileToResume } from '@/types/profile';

interface DashboardPageProps {
  resumes: {
    id: string;
    createdAt: string;
    updatedAt: string;
    resumeInfo: Resume;
  }[];
  coverletters: {
    id: string;
    createdAt: string;
    updatedAt: string;
    content: string;
  }[];
}

const DashboardPage: React.FC<DashboardPageProps> = ({
  resumes,
  coverletters,
}) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [editModalOpenId, setEditModalOpenId] = useState<string | null>(null);
  const [activeElement, setActiveElement] = useState<string | null>(null);
  const [resumesList, setResumesList] = useState(resumes);
  const [coverLettersList, setCoverLettersList] = useState(coverletters);
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);
  const [selectedCoverletter, setSelectedCoverletter] =
    useState<Coverletter | null>(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [resumeIdToDelete, setResumeIdToDelete] = useState<string | null>(null);
  const [coverletterIdToDelete, setCoverletterIdToDelete] = useState<
    string | null
  >(null);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  const [error, setError] = useState(null);

  console.log('Cover Letters Prop:', coverletters);

  const formatTimestamp = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      console.error('Error parsing timestamp:', error);
      return 'Invalid timestamp';
    }
  };

  const generateFilename = (coverLetter: Coverletter) => {
    const contentSnippet = coverLetter.createdAt
      .split(' ')
      .slice(0, 3)
      .join(' ');
    const date = new Date(coverLetter.updatedAt).toLocaleDateString();
    return `CoverLetter_${contentSnippet}_${date}`;
  };

  const sidebarMenuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarMenuRef.current &&
        !sidebarMenuRef.current.contains(event.target as Node)
      ) {
        // Clicked outside the sidebar menu container
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
    setSelectedCoverletter(null);
  };

  const handleResumesPage = () => {
    router.push('/eazyCV/resumes');
  };

  const handleCoverlettersPage = () => {
    router.push('/eazyCV/cover-letters');
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

  const handleCoverLetterCardClick = (
    id: string,
    content: string,
    createdAt: string,
    updatedAt: string,
  ) => {
    setActiveElement('sidebarMenu');
    setEditModalOpenId(id);
    setSelectedCoverletter({ id, content, createdAt, updatedAt });
  };

  const handleCloseEditModal = () => {
    setEditModalOpenId(null);
    setActiveElement(null);
    setSelectedResume(null);
    setSelectedCoverletter(null);
  };

  const handleEditResume = (id: string) => {
    router.push(`/resume-builder/resumes/${id}`);
  };

  const handleEditCoverletter = (id: string) => {
    router.push(`/coverletter-builder/coverletters/${id}`);
  };

  const handleDeleteResume = (id: string) => {
    setResumeIdToDelete(id);
    setShowConfirmationModal(true);
  };

  const handleDeleteCoverletter = (id: string) => {
    setCoverletterIdToDelete(id);
    setShowConfirmationModal(true);
  };

  const handleDeleteResumeConfirmation = async () => {
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

  const handleDeleteCoverletterConfirmation = async () => {
    if (coverletterIdToDelete) {
      try {
        const response = await fetch(`/api/resume/${coverletterIdToDelete}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete cover letter');
        }

        const updatedCoverletters = coverLettersList.filter(
          coverletter => coverletter.id !== coverletterIdToDelete,
        );
        setCoverLettersList(updatedCoverletters);
        setShowConfirmationModal(false);
        setShowDeleteMessage(true);
      } catch (error: any) {
        console.error('Error deleting cover letter:', error.message);
      }
    }
  };

  return (
    <Container>
      {resumesList && resumesList.length === 0 ? (
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
                <React.Fragment key={resume.id}>
                  <CardContainer>
                    <CardItem
                      onClick={() =>
                        handleResumeCardClick(resume.id, resume.resumeInfo)
                      }
                    >
                      <ResumeContent>
                        <MiniDefault
                          id={resume.id}
                          resumeInfo={resume.resumeInfo}
                        />
                      </ResumeContent>
                      <EditContainer>
                        {/* <EditButton
                          onClick={event =>
                            handleEditButtonClick(event, resume.id)
                          }
                        >
                          <CiMenuKebab />
                        </EditButton> */}
                        {editModalOpenId === resume.id &&
                          activeElement === 'editModal' && (
                            <EditModalOverlay onClick={handleCloseEditModal}>
                              <EditModalContent>
                                <EditContent onClick={e => e.stopPropagation()}>
                                  <EditContentItem>
                                    <ContentItem>
                                      <FaRegEdit
                                        style={{ marginRight: '5px' }}
                                      />
                                    </ContentItem>
                                    <ContentItem
                                      onClick={() =>
                                        handleEditResume(resume.id)
                                      }
                                    >
                                      Edit
                                    </ContentItem>
                                  </EditContentItem>
                                </EditContent>
                                <EditContent onClick={e => e.stopPropagation()}>
                                  <EditContentItem>
                                    <ContentItem>
                                      <FaDownload
                                        style={{ marginRight: '5px' }}
                                      />
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
                                    onClick={() =>
                                      handleDeleteResume(resume.id)
                                    }
                                  >
                                    <ContentItem>
                                      <FaTrashAlt
                                        style={{ marginRight: '5px' }}
                                      />
                                    </ContentItem>
                                    <ContentItem> Delete</ContentItem>
                                  </EditContentItem>
                                </EditContent>
                              </EditModalContent>
                            </EditModalOverlay>
                          )}
                      </EditContainer>
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
                onConfirm={handleDeleteResumeConfirmation}
                onCancel={() => setShowConfirmationModal(false)}
              />
            )}
            {showDeleteMessage && (
              <DeleteMessage>Resume deleted successfully!</DeleteMessage>
            )}
          </ItemsContainer>
        </ResumesSectionContainer>
      )}
      {coverLettersList && coverLettersList.length === 0 ? (
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
            {coverLettersList &&
              coverLettersList.slice(0, 2).map(coverLetter => (
                <React.Fragment key={coverLetter.id}>
                  <CardContainer>
                    <CardItem
                      onClick={() =>
                        handleCoverLetterCardClick(
                          coverLetter.id,
                          coverLetter.content,
                          coverLetter.createdAt,
                          coverLetter.updatedAt,
                        )
                      }
                    >
                      <CoverLetterContent>
                        <MiniCoverLetter content={coverLetter.content} />
                      </CoverLetterContent>
                      <EditContainer>
                        {/* <EditButton
                          onClick={event =>
                            handleEditButtonClick(event, coverLetter.id)
                          }
                        >
                          <CiMenuKebab />
                        </EditButton> */}
                        {editModalOpenId === coverLetter.id &&
                          activeElement === 'editModal' && (
                            <EditModalOverlay onClick={handleCloseEditModal}>
                              <EditModalContent>
                                <EditContent onClick={e => e.stopPropagation()}>
                                  <EditContentItem>
                                    <ContentItem>
                                      <FaRegEdit
                                        style={{ marginRight: '5px' }}
                                      />
                                    </ContentItem>
                                    <ContentItem
                                      onClick={() =>
                                        handleEditCoverletter(coverLetter.id)
                                      }
                                    >
                                      Edit
                                    </ContentItem>
                                  </EditContentItem>
                                </EditContent>
                                <EditContent onClick={e => e.stopPropagation()}>
                                  <EditContentItem>
                                    <ContentItem>
                                      <FaDownload
                                        style={{ marginRight: '5px' }}
                                      />
                                    </ContentItem>
                                    <ContentItem> Download</ContentItem>
                                  </EditContentItem>
                                </EditContent>
                                <EditContent onClick={e => e.stopPropagation()}>
                                  <EditContentItem
                                    onClick={() =>
                                      handleDeleteCoverletter(coverLetter.id)
                                    }
                                  >
                                    <ContentItem>
                                      <FaTrashAlt
                                        style={{ marginRight: '5px' }}
                                      />
                                    </ContentItem>
                                    <ContentItem> Delete</ContentItem>
                                  </EditContentItem>
                                </EditContent>
                              </EditModalContent>
                            </EditModalOverlay>
                          )}
                      </EditContainer>
                    </CardItem>
                    <TimeStampContainer>
                      <Filename>{generateFilename(coverLetter)}</Filename>
                      <Timestamp>
                        Edited {formatTimestamp(coverLetter.updatedAt)}
                      </Timestamp>
                    </TimeStampContainer>
                  </CardContainer>
                  {editModalOpenId === coverLetter.id &&
                    activeElement === 'sidebarMenu' && (
                      <SidebarMenuContainer
                        key={coverLetter.id}
                        className={'category active'}
                        ref={sidebarMenuRef}
                      >
                        <SidebarHeader>
                          <SidebarHeaderItem>
                            <ResumeButton>
                              <ResumeButtonTitle>Coverletter</ResumeButtonTitle>
                            </ResumeButton>
                          </SidebarHeaderItem>
                          <SidebarHeaderClose onClick={handleCloseEditModal}>
                            <IoCloseSharp />
                          </SidebarHeaderClose>
                        </SidebarHeader>
                        <SidebarContentContainer>
                          <ContentContainer>
                            {selectedCoverletter && (
                              <SidebarResumeContent>
                                <MiniCoverLetter
                                  content={coverLetter.content}
                                />
                              </SidebarResumeContent>
                            )}
                          </ContentContainer>
                        </SidebarContentContainer>
                        <ActionContainer>
                          <PreviewEditButton
                            onClick={() =>
                              handleEditCoverletter(coverLetter.id)
                            }
                          >
                            Edit
                          </PreviewEditButton>
                          <PreviewDownloadButton>
                            {/* <DownloadPDFButton /> */}
                            Download
                          </PreviewDownloadButton>
                        </ActionContainer>
                      </SidebarMenuContainer>
                    )}
                </React.Fragment>
              ))}
            {showConfirmationModal && (
              <ConfirmationModal
                onConfirm={handleDeleteCoverletterConfirmation}
                onCancel={() => setShowConfirmationModal(false)}
              />
            )}
            {showDeleteMessage && (
              <DeleteMessage>Cover letter deleted successfully!</DeleteMessage>
            )}
          </ItemsContainer>
        </CoverlettersSectionContainer>
      )}
    </Container>
  );
};

export default DashboardPage;
