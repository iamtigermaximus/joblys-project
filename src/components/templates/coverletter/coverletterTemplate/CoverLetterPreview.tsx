import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Changed from next/navigation to next/router
import { CiMenuKebab } from 'react-icons/ci';
import { IoCloseSharp } from 'react-icons/io5';
import { initialCoverletter } from '@/types/profile';
import {
  ActionContainer,
  ButtonLabel,
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
  ListContentItem,
  ListCreateCoverletterButton,
  ListTimestampItem,
  MiniCoverLetter,
  PreviewDownloadButton,
  PreviewEditButton,
  SidebarContentContainer,
  SidebarHeader,
  SidebarHeaderClose,
  SidebarHeaderItem,
  SidebarMenuContainer,
  Timestamp,
} from './CoverLetterPreview.styles';
import { FaRegEdit, FaDownload, FaTrashAlt } from 'react-icons/fa';
import ConfirmationModal from '../../resume/defaultTemplate/ConfirmationModal';
import { FaRegCreditCard } from 'react-icons/fa6';

interface MiniCoverletterProps {
  viewMode: 'list' | 'card';
}

const CoverLetterPreview: React.FC<MiniCoverletterProps> = ({ viewMode }) => {
  const router = useRouter();
  const [editModalOpenId, setEditModalOpenId] = useState<string | null>(null);
  const [activeElement, setActiveElement] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [coverLetterContent, setCoverLetterContent] = useState<string>('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);

  useEffect(() => {
    // Fetch the cover letter content from your backend API
    async function fetchCoverLetterContent() {
      try {
        const response = await fetch('/api/coverletter'); // Adjust API endpoint accordingly
        if (!response.ok) {
          throw new Error('Failed to fetch cover letter');
        }
        const data = await response.json();
        setCoverLetterContent(data.content);
      } catch (error: any) {
        console.error('Error fetching cover letter:', error.message);
      }
    }

    fetchCoverLetterContent();
  }, []);

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

  const handleEditCoverLetter = () => {
    router.push('/coverletter-builder');
  };

  const handleEditButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    setEditModalOpenId(prevId => (prevId === null ? 'editModal' : null));
    setActiveElement('editModal');
  };

  const handleCoverLetterCardClick = () => {
    setSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      {viewMode === 'card' ? (
        <CoverLetterContainer>
          <CreateCoverLetterButton>
            <ButtonLabel onClick={handleCreateNewCoverLetter}>
              Create new coverletter card
            </ButtonLabel>
          </CreateCoverLetterButton>
          <CoverLetterCard onClick={handleCoverLetterCardClick}>
            <CoverLetterContent>
              <MiniCoverLetter content={coverLetterContent} />
            </CoverLetterContent>
            <EditContainer>
              <EditButton onClick={handleEditButtonClick}>
                <CiMenuKebab />
              </EditButton>
              {editModalOpenId === 'editModal' && (
                <EditModalOverlay>
                  <EditModalContent>
                    <EditContent>
                      <EditContentItem>
                        <ContentItem>
                          <FaRegEdit style={{ marginRight: '5px' }} />
                        </ContentItem>
                        <ContentItem> Edit</ContentItem>
                      </EditContentItem>
                    </EditContent>
                    <EditContent>
                      <EditContentItem>
                        <ContentItem>
                          <FaDownload style={{ marginRight: '5px' }} />
                        </ContentItem>
                        <ContentItem> Download</ContentItem>
                      </EditContentItem>
                    </EditContent>
                    <EditContent>
                      <EditContentItem>
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
          </CoverLetterCard>
          {sidebarOpen && (
            <SidebarMenuContainer className={'category active'}>
              <SidebarHeader>
                <SidebarHeaderItem>
                  <CoverLetterButton>
                    <CoverLetterButtonTitle>
                      Cover Letter
                    </CoverLetterButtonTitle>
                  </CoverLetterButton>
                </SidebarHeaderItem>
                <SidebarHeaderClose onClick={handleCloseSidebar}>
                  <IoCloseSharp />
                </SidebarHeaderClose>
              </SidebarHeader>
              <SidebarContentContainer>
                <ContentContainer>
                  <MiniCoverLetter content={coverLetterContent} />
                </ContentContainer>
              </SidebarContentContainer>
              <ActionContainer>
                <PreviewEditButton onClick={handleEditCoverLetter}>
                  Edit
                </PreviewEditButton>
                <PreviewDownloadButton>Download</PreviewDownloadButton>
              </ActionContainer>
            </SidebarMenuContainer>
          )}
        </CoverLetterContainer>
      ) : (
        <CoverLetterListContainer>
          <ListCreateCoverletterButton>
            <ButtonLabel onClick={handleCreateNewCoverLetter}>
              + Create new coverletter
            </ButtonLabel>
          </ListCreateCoverletterButton>
          <CoverletterItemContainer>
            <CoverletterItem>Coverletter1</CoverletterItem>
            <ListTimestampItem>
              <Timestamp>Edited</Timestamp>
            </ListTimestampItem>
            <CoverletterButtonsContainer>
              <ListContentItem>
                <FaRegCreditCard />
              </ListContentItem>
              <ListContentItem>
                <FaDownload />
              </ListContentItem>
              <ListContentItem>
                <FaTrashAlt />
              </ListContentItem>
            </CoverletterButtonsContainer>
          </CoverletterItemContainer>
        </CoverLetterListContainer>
      )}
    </>
  );
};

export default CoverLetterPreview;
