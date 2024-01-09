'use client';

import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import {
  AddMoreLinksButton,
  AddMoreLinksContainer,
  BasicDetailsContainer,
  // BasicDetailsTitle,
  // BasicDetailsTitleContainer,
  Container,
  Input,
  InputContainer,
  InputLabel,
  InputRow
  // SaveDetailsButton,
  // SaveDetailsContainer
} from './BasicDetailsForm.styles';
import { BasicInfoType, ResumeInfoType } from '@/types/profile';
import { v4 as uuidv4 } from 'uuid';

interface BasicDetailsFormProps {
  resumeInfo: { basic: BasicInfoType };
  setResumeInfo: Dispatch<SetStateAction<ResumeInfoType>>;
}

const BasicDetailsForm: FC<BasicDetailsFormProps> = ({
  resumeInfo,
  setResumeInfo
}) => {
  const [additionalLinks, setAdditionalLinks] = useState<string[]>(['']);

  const handleAddMoreLinks = () => {
    const newId = uuidv4();
    setResumeInfo(prevInfo => ({
      ...prevInfo,
      basic: {
        ...prevInfo.basic,
        additionalLinks: [
          ...prevInfo.basic.additionalLinks,
          { id: newId, url: '' }
        ]
      }
    }));
  };

  const handleAdditionalLinkChange = (id: string, value: string) => {
    setResumeInfo(prevInfo => ({
      ...prevInfo,
      basic: {
        ...prevInfo.basic,
        additionalLinks: prevInfo.basic.additionalLinks.map(link =>
          link.id === id ? { ...link, url: value } : link
        )
      }
    }));
  };

  const handleInputChange = (field: keyof BasicInfoType, value: string) => {
    if (field === 'additionalLinks') {
      setAdditionalLinks([value]);
    } else {
      setResumeInfo(prevInfo => ({
        ...prevInfo,
        basic: {
          ...prevInfo.basic,
          [field]: value
        }
      }));
    }
  };

  return (
    <Container>
      <BasicDetailsContainer>
        <InputRow>
          <InputContainer>
            <InputLabel>First Name:</InputLabel>
            <Input
              type="text"
              placeholder="Your first name"
              value={resumeInfo.basic.firstName}
              onChange={e => handleInputChange('firstName', e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <InputLabel>Last Name:</InputLabel>
            <Input
              type="text"
              placeholder="Your last name"
              value={resumeInfo.basic.lastName}
              onChange={e => handleInputChange('lastName', e.target.value)}
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
              onChange={e => handleInputChange('phoneNumber', e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <InputLabel>Email address:</InputLabel>
            <Input
              type="email"
              placeholder="Your email"
              value={resumeInfo.basic.email}
              onChange={e => handleInputChange('email', e.target.value)}
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
              onChange={e => handleInputChange('address', e.target.value)}
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
              onChange={e => handleInputChange('linkedin', e.target.value)}
            />
          </InputContainer>
        </InputRow>
        {resumeInfo.basic.additionalLinks.map(link => (
          <InputRow key={link.id}>
            <InputContainer>
              <InputLabel>Additional Link</InputLabel>
              <Input
                type="url"
                placeholder="https://example.com"
                value={link.url}
                onChange={e =>
                  handleAdditionalLinkChange(link.id, e.target.value)
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
      </BasicDetailsContainer>
    </Container>
  );
};

export default BasicDetailsForm;
