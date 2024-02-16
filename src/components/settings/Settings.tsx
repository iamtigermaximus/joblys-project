'use client';
import React from 'react';
import {
  SectionContainer,
  ActionsContainer,
  CommunicationContainer,
  CommunicationItem,
  Container,
  ContentContainer,
  DeleteAccountButton,
  Input,
  InputContainer,
  Label,
  SaveButton,
  TextContainer,
  TextItem,
  NameContainer,
  DownloadDataButton,
} from './Settings.styles';

const Settings = () => {
  return (
    <Container>
      <ContentContainer>
        <TextContainer>
          <TextItem>Account</TextItem>
        </TextContainer>
        <SectionContainer>
          <InputContainer>
            <Label>Email address</Label>
            <Input />
          </InputContainer>
          <InputContainer>
            <Label>Language</Label>
            <Input />
          </InputContainer>
          <InputContainer>
            <Label>Communication preferences</Label>
            <CommunicationContainer>
              <Input type="checkbox" />
              <CommunicationItem>
                Receive updates, offers and career tips
              </CommunicationItem>
            </CommunicationContainer>
          </InputContainer>
          <ActionsContainer>
            <DeleteAccountButton>Delete account</DeleteAccountButton>
            <SaveButton>Save</SaveButton>
          </ActionsContainer>
        </SectionContainer>
        <TextContainer>
          <TextItem>Profile</TextItem>
        </TextContainer>
        <SectionContainer>
          <NameContainer>
            <InputContainer>
              <Label>First name</Label>
              <Input />
            </InputContainer>
            <InputContainer>
              <Label>Last name</Label>
              <Input />
            </InputContainer>
          </NameContainer>
          <InputContainer>
            <Label>Phone number</Label>
            <Input />
          </InputContainer>
          <InputContainer>
            <Label>Address</Label>
            <Input />
          </InputContainer>
          <NameContainer>
            <InputContainer>
              <Label>Post code</Label>
              <Input />
            </InputContainer>
            <InputContainer>
              <Label>City</Label>
              <Input />
            </InputContainer>
          </NameContainer>
          <ActionsContainer>
            <DownloadDataButton>Download your data</DownloadDataButton>
            <SaveButton>Save</SaveButton>
          </ActionsContainer>
        </SectionContainer>
      </ContentContainer>
    </Container>
  );
};

export default Settings;
