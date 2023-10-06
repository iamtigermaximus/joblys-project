import React from 'react';
import {
  ButtonsContainer,
  ChatbotSection,
  Container,
  ContinueButton,
  CreateProfile,
  SaveButton,
  SaveInfoContainer,
  SectionTitle,
  SectionTitleContainer,
  Trash,
  TrashIconContainer,
} from './Profile.styles';
import Chat from '../chat/Chat';
import { FaTrash } from 'react-icons/fa';

const Profile = () => {
  return (
    <Container>
      <CreateProfile>
        <SectionTitleContainer>
          <SectionTitle>Build your profile</SectionTitle>
        </SectionTitleContainer>
        <ChatbotSection>
          <Chat />
        </ChatbotSection>
        <SaveInfoContainer>
          <TrashIconContainer>
            <span>
              <FaTrash />
            </span>
            <Trash>Trash</Trash>
          </TrashIconContainer>
          <ButtonsContainer>
            <SaveButton>Save</SaveButton>{' '}
            <ContinueButton>Continue</ContinueButton>
          </ButtonsContainer>
        </SaveInfoContainer>
      </CreateProfile>
    </Container>
  );
};

export default Profile;
