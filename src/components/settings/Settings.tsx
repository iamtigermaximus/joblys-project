'use client';
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
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
  SelectInput,
} from './Settings.styles';
import { Resume } from '@/types/resume';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Loader from '../common/loader/Loader';
import ISO6391 from 'iso-639-1';

const Settings = () => {
  const { data: session } = useSession();
  const [resumeData, setResumeData] = useState<Resume | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en'); // Default language

  const languageOptions = ISO6391.getAllCodes().map(code => ({
    value: code,
    label: ISO6391.getNativeName(code),
  }));

  useEffect(() => {
    const fetchResumeData = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get('/api/cv');
        const resumes = response.data.body.resumes;

        const userResume = resumes.find(
          (resume: any) => resume.userId === session?.user?.id,
        );

        if (userResume) {
          setResumeData(userResume.content);
        } else {
          setError('No resume found for the user');
        }
        setIsLoading(false);
      } catch (err: any) {
        setError('Failed to fetch resume data');
        setIsLoading(false);
      }
    };

    fetchResumeData();
  }, [session]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!resumeData) {
    return <div>No profile data available</div>;
  }

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value); // Update the selected language
  };

  const handleSave = () => {
    console.log('Selected language:', selectedLanguage);
  };

  return (
    <Container>
      <ContentContainer>
        <TextContainer>
          <TextItem>Account</TextItem>
        </TextContainer>
        <SectionContainer>
          <InputContainer>
            <Label>Email address</Label>
            <Input value={resumeData.basic.email || ''} readOnly />
          </InputContainer>
          <InputContainer>
            <Label>Language</Label>
            {/* <Input /> */}
            <SelectInput
              value={selectedLanguage}
              onChange={handleLanguageChange}
            >
              {languageOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </SelectInput>
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
            <SaveButton onClick={handleSave}>Save</SaveButton>
          </ActionsContainer>
        </SectionContainer>
        <TextContainer>
          <TextItem>Profile</TextItem>
        </TextContainer>
        <SectionContainer>
          <NameContainer>
            <InputContainer>
              <Label>First name</Label>
              <Input value={resumeData.basic.firstName || ''} readOnly />
            </InputContainer>
            <InputContainer>
              <Label>Last name</Label>
              <Input value={resumeData.basic.lastName || ''} readOnly />
            </InputContainer>
          </NameContainer>
          <InputContainer>
            <Label>Phone number</Label>
            <Input value={resumeData.basic.phoneNumber || ''} readOnly />
          </InputContainer>
          <InputContainer>
            <Label>Address</Label>
            <Input value={resumeData.basic.address || ''} readOnly />
          </InputContainer>
          {/* <NameContainer>
            <InputContainer>
              <Label>Post code</Label>
              <Input />
            </InputContainer>
            <InputContainer>
              <Label>City</Label>
              <Input />
            </InputContainer>
          </NameContainer> */}
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
