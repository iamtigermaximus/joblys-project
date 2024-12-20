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
  CoverLetterCard,
  CoverLetterContainer,
  CoverLetterContent,
  CoverLetterListContainer,
  CoverLetterTitle,
  CoverLetterTitleContainer,
  CoverletterButtonsContainer,
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
  FilenameInput,
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

import { formatFilenameFromDate } from '@/components/helpers/formHelpers';
import { useTranslations } from 'next-intl';
import CoverLetterTemplate from '../coverletter/coverletterTemplate/CoverLetterTemplate';
import DownloadCoverLetterButton from '../coverletter/coverletterTemplate/DownloadCoverLetterButton';
import ConfirmationModal from '../resume/defaultTemplate/ConfirmationModal';
import UpgradeModal from '../resume/defaultTemplate/resume-helpers/UpgradeModal';

interface CoverLetterPreviewProps {
  viewMode: 'list' | 'card';
  coverLetters: Coverletter[];
}

const CoverLetterPreview: React.FC<CoverLetterPreviewProps> = ({
  viewMode,
  coverLetters,
}) => {
  const t = useTranslations('CoverlettersPage');
  const router = useRouter();
  const [editModalOpenId, setEditModalOpenId] = useState<string | null>(null);
  const [activeElement, setActiveElement] = useState<string | null>(null);
  const [coverLettersList, setCoverLettersList] = useState<Coverletter[]>([]);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [coverLetterIdToDelete, setCoverLetterIdToDelete] = useState<
    string | null
  >(null);
  const [selectedCoverletter, setSelectedCoverletter] =
    useState<Coverletter | null>(null);

  const [editingFilenameId, setEditingFilenameId] = useState<string | null>(
    null,
  );
  const [newFilename, setNewFilename] = useState<string>('');

  useEffect(() => {
    if (Array.isArray(coverLetters)) {
      const sortedCoverLetters = coverLetters
        .filter(coverLetter => coverLetter !== undefined)
        .filter(coverLetter => coverLetter.updatedAt !== coverLetter.createdAt)
        .sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
        );
      setCoverLettersList(sortedCoverLetters);
    }
  }, [coverLetters]);

  const handleFilenameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewFilename(event.target.value);
  };

  const handleFilenameBlur = async (id: string) => {
    if (!newFilename.trim()) return;

    try {
      const response = await fetch(`/api/coverletter/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newFilename }),
      });

      if (!response.ok) {
        throw new Error('Failed to update filename');
      }

      // Update the local state immediately to reflect the change in the UI
      setCoverLettersList(prevCoverLetters =>
        prevCoverLetters.map(coverLetter =>
          coverLetter.id === id
            ? { ...coverLetter, name: newFilename }
            : coverLetter,
        ),
      );
      setEditingFilenameId(null); // Close the input field
    } catch (error: any) {
      console.error('Error updating filename:', error.message);
    }
  };

  const handleFilenameKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>,
    id: string,
  ) => {
    if (event.key === 'Enter') {
      await handleFilenameBlur(id); // Save the name when Enter is pressed
    }
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
    const date = new Date(timestamp);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  return (
    <>
      {viewMode === 'card' ? (
        <CoverLetterContainer>
          <CreateCoverLetterButton onClick={handleCreateNewCoverLetter}>
            <ButtonLabel>{t('buttonLabel')}</ButtonLabel>
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
                      <CoverLetterTemplate
                        content={coverLetter.content}
                        isMini={true}
                      />
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
                                    {t('edit')}{' '}
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
                                  <ContentItem> {t('delete')}</ContentItem>
                                </EditContentItem>
                              </EditContent>
                            </EditModalContent>
                          </EditModalOverlay>
                        )}
                    </EditContainer>
                  </CoverLetterCard>
                  <FilenameContainer>
                    {editingFilenameId === coverLetter.id ? (
                      <FilenameInput
                        type="text"
                        value={newFilename}
                        onChange={handleFilenameChange}
                        onBlur={() => handleFilenameBlur(coverLetter.id)} // Save on blur
                        onKeyDown={e =>
                          handleFilenameKeyDown(e, coverLetter.id)
                        } // Save on Enter key press
                        autoFocus
                      />
                    ) : (
                      <Filename
                        onClick={() => {
                          setEditingFilenameId(coverLetter.id);
                          setNewFilename(coverLetter.name);
                        }}
                      >
                        {coverLetter.name}
                      </Filename>
                    )}
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
                          <CoverLetterTitleContainer>
                            <CoverLetterTitle>
                              {t('previewTitle')}
                            </CoverLetterTitle>
                          </CoverLetterTitleContainer>
                        </SidebarHeaderItem>
                        <SidebarHeaderClose onClick={handleCloseEditModal}>
                          <IoCloseSharp />
                        </SidebarHeaderClose>
                      </SidebarHeader>
                      <SidebarContentContainer>
                        <ContentContainer>
                          {selectedCoverletter && (
                            <SidebarCoverletterContent>
                              <CoverLetterTemplate
                                content={coverLetter.content}
                              />
                            </SidebarCoverletterContent>
                          )}
                        </ContentContainer>
                      </SidebarContentContainer>
                      <ActionContainer>
                        <PreviewEditButton
                          onClick={() => handleEditCoverLetter(coverLetter.id)}
                        >
                          {t('edit')}{' '}
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
            <DeleteMessage>{t('deleteMessage')} </DeleteMessage>
          )}
          {showUpgradeModal && (
            <UpgradeModal onClose={() => setShowUpgradeModal(false)} />
          )}
        </CoverLetterContainer>
      ) : (
        <CoverLetterListContainer>
          <ListCreateCoverletterButton>
            <ButtonLabel onClick={handleCreateNewCoverLetter}>
              {t('buttonLabel')}{' '}
            </ButtonLabel>
          </ListCreateCoverletterButton>
          {coverLettersList &&
            coverLettersList.map(coverLetter => (
              <CoverletterItemContainer key={coverLetter.id}>
                <FilenameContainer>
                  {editingFilenameId === coverLetter.id ? (
                    <input
                      type="text"
                      value={newFilename}
                      onChange={handleFilenameChange}
                      onBlur={() => handleFilenameBlur(coverLetter.id)} // Save on blur
                      onKeyDown={e => handleFilenameKeyDown(e, coverLetter.id)} // Save on Enter key press
                      autoFocus
                    />
                  ) : (
                    <Filename
                      onClick={() => {
                        setEditingFilenameId(coverLetter.id);
                        setNewFilename(coverLetter.name);
                      }}
                    >
                      {coverLetter.name}
                    </Filename>
                  )}
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
