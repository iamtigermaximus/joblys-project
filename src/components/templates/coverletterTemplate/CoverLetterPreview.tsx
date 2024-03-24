import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaRegEdit, FaDownload, FaTrashAlt } from 'react-icons/fa';
import { CiMenuKebab } from 'react-icons/ci';
import { IoCloseSharp } from 'react-icons/io5';
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

  const handleCreateNewCoverLetter = () => {
    router.push('/coverletter-builder');
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
          <MiniCoverLetter />
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
              <MiniCoverLetter />
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
