import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaRegEdit, FaDownload, FaTrashAlt } from 'react-icons/fa';
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
  CreateCoverLetterButton,
  EditButton,
  EditContainer,
  EditContent,
  EditContentItem,
  EditModalContent,
  EditModalOverlay,
  MiniCoverLetter,
  PreviewDownloadButton,
  PreviewEditButton,
  SidebarContentContainer,
  SidebarHeader,
  SidebarHeaderClose,
  SidebarHeaderItem,
  SidebarMenuContainer,
} from './CoverLetterPreview.styles';

const CoverLetterPreview = () => {
  const router = useRouter();
  const [editModalOpenId, setEditModalOpenId] = useState<string | null>(null);
  const [activeElement, setActiveElement] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [coverLetterContent, setCoverLetterContent] = useState<string>('');

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
    <CoverLetterContainer>
      <CreateCoverLetterButton>
        <ButtonLabel onClick={handleCreateNewCoverLetter}>
          Create new coverletter
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
                <CoverLetterButtonTitle>Cover Letter</CoverLetterButtonTitle>
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
  );
};

export default CoverLetterPreview;
