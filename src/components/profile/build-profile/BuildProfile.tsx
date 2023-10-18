import React from 'react';
import {
  ButtonsContainer,
  ChatbotSection,
  Container,
  ContinueButton,
  CreateProfile,
  SaveButton,
  SaveInfoContainer,
  Trash,
  TrashIconContainer,
} from './BuildProfile.styles';
import { FaTrash } from 'react-icons/fa';
import Chatbot from './chatbot/Chatbot';

const Profile = () => {
  return (
    <Container>
      <CreateProfile>
        <ChatbotSection>
          <Chatbot />
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
