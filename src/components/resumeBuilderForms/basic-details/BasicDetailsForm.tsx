'use client';

import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import {
  AddMoreLinksButton,
  AddMoreLinksContainer,
  BasicDetailsContainer,
  Container,
  Input,
  InputContainer,
  InputLabel,
  InputRow,
  NewLinkContainer,
  TrashIcon,
} from './BasicDetailsForm.styles';
import { BasicInfoType, Resume } from '@/types/resume';
import { v4 as uuidv4 } from 'uuid';
import { FaTrash } from 'react-icons/fa';
import { capitalizeFirstLetter } from '@/components/helpers/formHelpers';

interface BasicDetailsFormProps {
  basic: BasicInfoType;
  setResumeInfo: Dispatch<SetStateAction<Resume>>;
}

const BasicDetailsForm: FC<BasicDetailsFormProps> = ({
  basic,
  setResumeInfo,
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
          { id: newId, url: '' },
        ],
      },
    }));
  };

  const handleDeleteLink = (id: string) => {
    setResumeInfo(prevInfo => ({
      ...prevInfo,
      basic: {
        ...prevInfo.basic,
        additionalLinks: prevInfo.basic.additionalLinks.filter(
          link => link.id !== id,
        ),
      },
    }));
  };

  const handleAdditionalLinkChange = (id: string, value: string) => {
    setResumeInfo(prevInfo => ({
      ...prevInfo,
      basic: {
        ...prevInfo.basic,
        additionalLinks: prevInfo.basic.additionalLinks.map(link =>
          link.id === id ? { ...link, url: value } : link,
        ),
      },
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
          [field]: value,
        },
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
              value={basic.firstName}
              onChange={e =>
                handleInputChange(
                  'firstName',
                  capitalizeFirstLetter(e.target.value),
                )
              }
            />
          </InputContainer>
          <InputContainer>
            <InputLabel>Last Name:</InputLabel>
            <Input
              type="text"
              placeholder="Your last name"
              value={basic.lastName}
              onChange={e =>
                handleInputChange(
                  'lastName',
                  capitalizeFirstLetter(e.target.value),
                )
              }
            />
          </InputContainer>
        </InputRow>
        <InputRow>
          <InputContainer>
            <InputLabel>Phone number:</InputLabel>
            <Input
              type="tel"
              placeholder="Phone number"
              value={basic.phoneNumber}
              onChange={e => handleInputChange('phoneNumber', e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <InputLabel>Email address:</InputLabel>
            <Input
              type="email"
              placeholder="Your email"
              value={basic.email}
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
              value={basic.address}
              onChange={e =>
                handleInputChange(
                  'address',
                  capitalizeFirstLetter(e.target.value),
                )
              }
            />
          </InputContainer>
        </InputRow>
        <InputRow>
          <InputContainer>
            <InputLabel>LinkedIn:</InputLabel>
            <Input
              type="url"
              placeholder="https://example.com"
              value={basic.linkedin}
              onChange={e => handleInputChange('linkedin', e.target.value)}
            />
          </InputContainer>
        </InputRow>
        {basic.additionalLinks.map(link => (
          <InputContainer key={link.id}>
            <InputLabel>Additional Link</InputLabel>
            <NewLinkContainer>
              <Input
                type="url"
                placeholder="https://example.com"
                value={link.url}
                onChange={e =>
                  handleAdditionalLinkChange(link.id, e.target.value)
                }
              />
              <TrashIcon onClick={() => handleDeleteLink(link.id)}>
                <FaTrash style={{ color: '#2e033b' }} />
              </TrashIcon>
            </NewLinkContainer>
          </InputContainer>
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
