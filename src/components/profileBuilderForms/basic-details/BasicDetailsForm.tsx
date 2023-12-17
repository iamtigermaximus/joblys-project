'use client';

import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import {
  AddMoreLinksButton,
  AddMoreLinksContainer,
  BasicDetailsContainer,
  BasicDetailsTitle,
  BasicDetailsTitleContainer,
  Container,
  Input,
  InputContainer,
  InputLabel,
  InputRow,
  SaveDetailsButton,
  SaveDetailsContainer,
} from './BasicDetailsForm.styles';
import { BasicInfoType, ResumeInfoType } from '@/types/profile';

interface BasicDetailsFormProps {
  resumeInfo: { basic: BasicInfoType };
  setResumeInfo: Dispatch<SetStateAction<ResumeInfoType>>;
  setPage: Dispatch<SetStateAction<number>>;
}

const BasicDetailsForm: FC<BasicDetailsFormProps> = ({
  resumeInfo,
  setResumeInfo,
  setPage,
}) => {
  const [additionalLinks, setAdditionalLinks] = useState<string[]>(['']);

  const handleAddMoreLinks = () => {
    setResumeInfo((prevInfo) => ({
      ...prevInfo,
      basic: {
        ...prevInfo.basic,
        additionalLinks: [...prevInfo.basic.additionalLinks, ''],
      },
    }));
  };

  const handleAdditionalLinkChange = (index: number, value: string) => {
    setResumeInfo((prevInfo) => ({
      ...prevInfo,
      basic: {
        ...prevInfo.basic,
        additionalLinks: [
          ...prevInfo.basic.additionalLinks.slice(0, index),
          value,
          ...prevInfo.basic.additionalLinks.slice(index + 1),
        ],
      },
    }));
  };

  const handleInputChange = (field: keyof BasicInfoType, value: string) => {
    if (field === 'additionalLinks') {
      setAdditionalLinks([value]);
    } else {
      setResumeInfo((prevInfo) => ({
        ...prevInfo,
        basic: {
          ...prevInfo.basic,
          [field]: value,
        },
      }));
    }
  };

  return (
    <Container>
      <BasicDetailsContainer>
        <BasicDetailsTitleContainer>
          <BasicDetailsTitle>Profile Details</BasicDetailsTitle>
        </BasicDetailsTitleContainer>
        <InputRow>
          <InputContainer>
            <InputLabel>First Name:</InputLabel>
            <Input
              type="text"
              placeholder="Your first name"
              value={resumeInfo.basic.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <InputLabel>Last Name:</InputLabel>
            <Input
              type="text"
              placeholder="Your last name"
              value={resumeInfo.basic.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
            />
          </InputContainer>
        </InputRow>
        <InputRow>
          <InputContainer>
            <InputLabel>Phone number:</InputLabel>
            <Input
              type="tel"
              placeholder="Phone number"
              value={resumeInfo.basic.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <InputLabel>Email address:</InputLabel>
            <Input
              type="email"
              placeholder="Your email"
              value={resumeInfo.basic.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </InputContainer>
        </InputRow>
        <InputRow>
          <InputContainer>
            <InputLabel>Address:</InputLabel>
            <Input
              type="text"
              placeholder="Address"
              value={resumeInfo.basic.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
            />
          </InputContainer>
        </InputRow>
        <InputRow>
          <InputContainer>
            <InputLabel>LinkedIn:</InputLabel>
            <Input
              type="url"
              placeholder="https://example.com"
              value={resumeInfo.basic.linkedin}
              onChange={(e) => handleInputChange('linkedin', e.target.value)}
            />
          </InputContainer>
        </InputRow>
        {resumeInfo.basic.additionalLinks.map((link, index) => (
          <InputRow key={index}>
            <InputContainer>
              <InputLabel>{`Additional Link ${index + 1}:`}</InputLabel>
              <Input
                type="url"
                placeholder={`https://additional-link-${index + 1}.com`}
                value={link}
                onChange={(e) =>
                  handleAdditionalLinkChange(index, e.target.value)
                }
              />
            </InputContainer>
          </InputRow>
        ))}

        <AddMoreLinksContainer>
          <AddMoreLinksButton onClick={handleAddMoreLinks}>
            Add more links +
          </AddMoreLinksButton>
        </AddMoreLinksContainer>
        <SaveDetailsContainer>
          <SaveDetailsButton
            onClick={() => {
              console.log(
                'Resume Info before moving to next form:',
                resumeInfo
              );

              setPage((p) => p + 1);
            }}
          >
            Save
          </SaveDetailsButton>
        </SaveDetailsContainer>
      </BasicDetailsContainer>
    </Container>
  );
};

export default BasicDetailsForm;
