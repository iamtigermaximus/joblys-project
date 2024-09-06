import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CiMenuKebab } from 'react-icons/ci';
import { IoCloseSharp } from 'react-icons/io5';
import {
  ActionContainer,
  ButtonLabel,
  CardContainer,
  ContentContainer,
  ContentItem,
  CoverLetterButton,
  CoverLetterButtonTitle,
  CoverLetterCard,
  CoverLetterContainer,
  CoverLetterContent,
  CoverLetterListContainer,
  CoverletterButtonsContainer,
  CoverletterItem,
  CoverletterItemContainer,
  CreateCoverLetterButton,
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
  ListCreateCoverletterButton,
  ListTimestampItem,
  MiniCoverLetter,
  PreviewDownloadButton,
  PreviewEditButton,
  SidebarContentContainer,
  SidebarCoverletterContent,
  SidebarHeader,
  SidebarHeaderClose,
  SidebarHeaderItem,
  SidebarMenuContainer,
  Timestamp,
} from './CoverLetterPreview.styles';
import { FaRegEdit, FaDownload, FaTrashAlt } from 'react-icons/fa';
import { FaRegCreditCard } from 'react-icons/fa6';
import { Coverletter, initialCoverletter } from '@/types/coverletter';
import { formatDistanceToNow, format, parseISO } from 'date-fns';
import ConfirmationModal from '../../templates/resume/defaultTemplate/ConfirmationModal';
import UpgradeModal from '../../templates/resume/defaultTemplate/resume-helpers/UpgradeModal';
import DownloadCoverLetterButton from '../coverletter/coverletterTemplate/DownloadCoverLetterButton';

interface CoverLetterPreviewProps {
  viewMode: 'list' | 'card';
  coverLetters: Coverletter[];
}

const CoverLetterPreview: React.FC<CoverLetterPreviewProps> = ({
  viewMode,
  coverLetters,
}) => {
  const router = useRouter();
  const [editModalOpenId, setEditModalOpenId] = useState<string | null>(null);
  const [activeElement, setActiveElement] = useState<string | null>(null);
  const [coverLettersList, setCoverLettersList] = useState(
    [...coverLetters].sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    ),
  );
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [coverLetterIdToDelete, setCoverLetterIdToDelete] = useState<
    string | null
  >(null);
  const [selectedCoverletter, setSelectedCoverletter] =
    useState<Coverletter | null>(null);

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
    setEditModalOpenId(null);
    setActiveElement(null);
  };

  const handleCreateNewCoverLetter = async () => {
    try {
      const response = await fetch('/api/resume/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ coverletter: initialCoverletter() }),
      });

      if (!response.ok) {
        const {
          body: { message },
        } = await response.json();
        if (message.includes('Cannot create more than')) {
          console.log('Foo');
          setShowUpgradeModal(true);
        }
        throw new Error(message);
      }

      const respJson = await response.json();
      const id = respJson?.body?.id;
      if (!id) {
        throw new Error('Did not receive cover letter id from server');
      }

      router.push(`/coverletter-builder/coverletters/${id}`);
    } catch (error: any) {
      console.error('Error uploading cover letter:', error.message);
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

  const handleCoverLetterCardClick = (id: string) => {
    const selectedCoverLetter = coverLetters.find(
      coverLetter => coverLetter.id === id,
    );
    setActiveElement('sidebarMenu');
    setEditModalOpenId(id);
    setSelectedCoverletter(selectedCoverLetter || null);
  };

  const handleCloseEditModal = () => {
    setEditModalOpenId(null);
    setActiveElement(null);
    setSelectedCoverletter(null);
  };

  const handleEditCoverLetter = (id: string) => {
    router.push(`/coverletter-builder/coverletters/${id}`);
  };

  const handleDeleteCoverLetter = (id: string) => {
    setCoverLetterIdToDelete(id);
    setShowConfirmationModal(true);
  };

  const handleDeleteConfirmation = async () => {
    if (coverLetterIdToDelete) {
      try {
        const response = await fetch(
          `/api/coverletter/${coverLetterIdToDelete}`,
          {
            method: 'DELETE',
          },
        );

        if (!response.ok) {
          throw new Error('Failed to delete cover letter');
        }

        const updatedCoverLetters = coverLettersList.filter(
          coverLetter => coverLetter.id !== coverLetterIdToDelete,
        );
        setShowConfirmationModal(false);
        setShowDeleteMessage(true);
        setCoverLettersList(updatedCoverLetters);
      } catch (error: any) {
        console.error('Error deleting cover letter:', error.message);
      }
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = parseISO(timestamp);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const generateFilename = (coverLetter: Coverletter) => {
    if (!coverLetter.createdAt) {
      console.error('Missing or empty createdAt property:', coverLetter);
      return 'CoverLetter_UnknownDate';
    }

    try {
      const createdDate = parseISO(coverLetter.createdAt);
      if (isNaN(createdDate.getTime())) {
        throw new Error('Invalid date');
      }
      const formattedDate = format(createdDate, 'yyyy-MM-dd');
      console.log('Formatted Date:', formattedDate); // Debugging line
      return `CoverLetter_${formattedDate}`;
    } catch (error: any) {
      console.error('Error parsing or formatting date:', error.message);
      return 'CoverLetter_InvalidDate';
    }
  };

  return (
    <>
      {viewMode === 'card' ? (
        <CoverLetterContainer>
          <CreateCoverLetterButton>
            <ButtonLabel onClick={handleCreateNewCoverLetter}>
              Create new coverletter
            </ButtonLabel>
          </CreateCoverLetterButton>
          {coverLettersList &&
            coverLettersList.map(coverLetter => (
              <React.Fragment key={coverLetter.id}>
                <CardContainer>
                  <CoverLetterCard
                    onClick={() => handleCoverLetterCardClick(coverLetter.id)}
                    isLast={true}
                  >
                    <CoverLetterContent>
                      <MiniCoverLetter content={coverLetter.content} />
                    </CoverLetterContent>
                    <EditContainer>
                      <EditButton
                        onClick={event =>
                          handleEditButtonClick(event, coverLetter.id)
                        }
                      >
                        <CiMenuKebab />
                      </EditButton>
                      {editModalOpenId === coverLetter.id &&
                        activeElement === 'editModal' && (
                          <EditModalOverlay onClick={handleCloseEditModal}>
                            <EditModalContent>
                              <EditContent onClick={e => e.stopPropagation()}>
                                <EditContentItem>
                                  <ContentItem>
                                    <FaRegEdit style={{ marginRight: '5px' }} />
                                  </ContentItem>
                                  <ContentItem
                                    onClick={() =>
                                      handleEditCoverLetter(coverLetter.id)
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
                                    <DownloadCoverLetterButton
                                      coverLetterInfo={coverLetter}
                                    />
                                  </ContentItem>
                                </EditContentItem>
                              </EditContent>
                              <EditContent onClick={e => e.stopPropagation()}>
                                <EditContentItem
                                  onClick={() =>
                                    handleDeleteCoverLetter(coverLetter.id)
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
                  </CoverLetterCard>
                  <FilenameContainer>
                    <Filename>Coverletter_{coverLetter.id}</Filename>
                    {/* <h4>Created At: {formatTimestamp(resume.createdAt)}</h4> */}
                    {/* <Timestamp>Edited {formatTimestamp(resume.updatedAt)}</Timestamp> */}
                    {coverLetter.updatedAt && (
                      <Timestamp>
                        Edited {formatTimestamp(coverLetter.updatedAt)}
                      </Timestamp>
                    )}
                  </FilenameContainer>
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
                          <CoverLetterButton>
                            <CoverLetterButtonTitle>
                              Coverletter
                            </CoverLetterButtonTitle>
                          </CoverLetterButton>
                        </SidebarHeaderItem>
                        <SidebarHeaderClose onClick={handleCloseEditModal}>
                          <IoCloseSharp />
                        </SidebarHeaderClose>
                      </SidebarHeader>
                      <SidebarContentContainer>
                        <ContentContainer>
                          {selectedCoverletter && (
                            <SidebarCoverletterContent>
                              <MiniCoverLetter content={coverLetter.content} />
                            </SidebarCoverletterContent>
                          )}
                        </ContentContainer>
                      </SidebarContentContainer>
                      <ActionContainer>
                        <PreviewEditButton
                          onClick={() => handleEditCoverLetter(coverLetter.id)}
                        >
                          Edit
                        </PreviewEditButton>
                        <PreviewDownloadButton>
                          <DownloadCoverLetterButton
                            coverLetterInfo={coverLetter}
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
            <DeleteMessage>Cover letter deleted successfully!</DeleteMessage>
          )}
          {showUpgradeModal && (
            <UpgradeModal onClose={() => setShowUpgradeModal(false)} />
          )}
        </CoverLetterContainer>
      ) : (
        <CoverLetterListContainer>
          <ListCreateCoverletterButton>
            <ButtonLabel onClick={handleCreateNewCoverLetter}>
              + Create new coverletter
            </ButtonLabel>
          </ListCreateCoverletterButton>
          {coverLettersList &&
            coverLettersList.map(coverLetter => (
              <CoverletterItemContainer key={coverLetter.id}>
                <FilenameContainer>
                  <Filename>Coverletter_{coverLetter.id}</Filename>
                  {/* <Filename>{generateFilename(coverLetter)}</Filename> */}
                  {/* <h4>Created At: {formatTimestamp(resume.createdAt)}</h4> */}
                  {/* <Timestamp>Edited {formatTimestamp(resume.updatedAt)}</Timestamp> */}
                  {coverLetter.updatedAt && (
                    <Timestamp>
                      Edited {formatTimestamp(coverLetter.updatedAt)}
                    </Timestamp>
                  )}
                </FilenameContainer>
                <CoverletterButtonsContainer>
                  <ListContentItem
                    onClick={() => handleEditCoverLetter(coverLetter.id)}
                  >
                    <FaRegCreditCard />
                  </ListContentItem>
                  <ListContentItem>
                    <FaDownload />
                  </ListContentItem>
                  <ListContentItem
                    onClick={() => handleDeleteCoverLetter(coverLetter.id)}
                  >
                    <FaTrashAlt />
                  </ListContentItem>
                </CoverletterButtonsContainer>
              </CoverletterItemContainer>
            ))}
        </CoverLetterListContainer>
      )}
    </>
  );
};

export default CoverLetterPreview;
