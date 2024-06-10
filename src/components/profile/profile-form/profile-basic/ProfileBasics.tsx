import React, { FC, useState, useEffect } from 'react';
import { Profile } from '../../../../types/profile';
import {
  FaCircleChevronUp,
  FaCircleChevronDown,
  FaPlus,
  FaTrash,
  FaCheck,
} from 'react-icons/fa6';
import { FaEdit, FaTimes } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';

import {
  AccordionSection,
  AccordionHeader,
  AccordionHeaderTitle,
  IconContainer,
  AccordionContent,
  BasicDetailsContainer,
  InputRow,
  InputContainer,
  InputLabel,
  Input,
  NewLinkContainer,
  Button,
  ButtonContainer,
  AddLinkButtonContainer,
  ActionButtonContainer,
  ActionButton,
} from '../ProfileForm.styles';
import axios from 'axios';

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  links: Link[];
}

interface Link {
  id: string;
  url: string;
}

export interface ProfileBasicsProps {
  existingData: Profile;
  isOpen: boolean;
  toggleAccordion: () => void;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  handleCancelEdit: () => void;
  // handleSaveEdit: (profileData: any) => void;
}

const ProfileBasics: FC<ProfileBasicsProps> = ({
  existingData,
  isOpen,
  toggleAccordion,
  isEditing,
  setIsEditing,
  handleCancelEdit,
  // handleSaveEdit,
}) => {
  const [profileData, setProfileData] = useState<ProfileData>(existingData);

  useEffect(() => {
    setProfileData(prevData => ({
      ...prevData,
      firstName: existingData.firstName || '',
      lastName: existingData.lastName || '',
      email: existingData.email || '',
      contact: existingData.contact || '',
      links:
        existingData.links.length > 0
          ? existingData.links
          : [{ id: uuidv4(), url: '' }],
    }));
  }, [existingData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
  ) => {
    const { value } = e.target;
    setProfileData(prevData => {
      const updatedData = { ...prevData, [fieldName]: value };
      console.log(`Updated ${fieldName}:`, updatedData);
      return updatedData;
    });
  };

  const handleLinkChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
  ) => {
    const { value } = e.target;
    setProfileData(prevData => {
      const updatedLinks = prevData.links.map(link =>
        link.id === id ? { ...link, url: value } : link,
      );
      console.log('Updated links:', updatedLinks);
      return { ...prevData, links: updatedLinks };
    });
  };

  const addNewLink = () => {
    setProfileData(prevData => {
      const newLinks = [...prevData.links, { id: uuidv4(), url: '' }];
      console.log('Added new link:', newLinks);
      return { ...prevData, links: newLinks };
    });
  };

  const removeLink = (id: string) => {
    setProfileData(prevData => {
      const filteredLinks = prevData.links.filter(link => link.id !== id);
      console.log('Removed link:', filteredLinks);
      return { ...prevData, links: filteredLinks };
    });
  };

  const updateExistingData = async (
    profileData: ProfileData,
  ): Promise<void> => {
    try {
      // Make a POST request to the backend API to update the profile data
      const response = await axios.post('/api/profile', {
        profile: profileData,
      });

      // Check if the request was successful (status code 200)
      if (response.status === 200) {
        console.log('Profile updated successfully');
      } else {
        console.error('Failed to update profile');
        // Handle the error scenario
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      // Handle the error scenario
    }
  };

  const handleSaveEdit = async (updatedData: ProfileData) => {
    // Call the function to update existing data with the updated profile data
    await updateExistingData(updatedData);
    setIsEditing(false);
  };

  return (
    <AccordionSection>
      <AccordionHeader onClick={toggleAccordion}>
        <AccordionHeaderTitle style={{ color: isOpen ? '' : 'gray' }}>
          Personal Details
        </AccordionHeaderTitle>
        <span>
          {isOpen ? (
            <IconContainer style={{ fontSize: '24px' }}>
              <FaCircleChevronUp />
            </IconContainer>
          ) : (
            <IconContainer style={{ fontSize: '24px' }}>
              <FaCircleChevronDown />
            </IconContainer>
          )}
        </span>
      </AccordionHeader>
      {isOpen && (
        <AccordionContent>
          <BasicDetailsContainer>
            <ButtonContainer>
              {!isEditing && (
                <Button onClick={() => setIsEditing(true)}>
                  <FaEdit /> Edit
                </Button>
              )}
            </ButtonContainer>
            <InputRow>
              <InputContainer>
                <InputLabel>First Name:</InputLabel>
                <Input
                  type="text"
                  placeholder="Your first name"
                  value={profileData.firstName}
                  onChange={e => handleInputChange(e, 'firstName')}
                  readOnly={!isEditing}
                />
              </InputContainer>
              <InputContainer>
                <InputLabel>Last Name:</InputLabel>
                <Input
                  type="text"
                  placeholder="Your last name"
                  value={profileData.lastName}
                  onChange={e => handleInputChange(e, 'lastName')}
                  readOnly={!isEditing}
                />
              </InputContainer>
            </InputRow>
            <InputRow>
              <InputContainer>
                <InputLabel>Email address:</InputLabel>
                <Input
                  type="email"
                  placeholder="Your email"
                  value={profileData.email}
                  onChange={e => handleInputChange(e, 'email')}
                  readOnly={!isEditing}
                />
              </InputContainer>
              <InputContainer>
                <InputLabel>Phone number:</InputLabel>
                <Input
                  type="tel"
                  placeholder="Phone number"
                  value={profileData.contact}
                  onChange={e => handleInputChange(e, 'contact')}
                  readOnly={!isEditing}
                />
              </InputContainer>
            </InputRow>
            <InputRow>
              {profileData.links.map(link => (
                <InputContainer key={link.id}>
                  <InputLabel>Link</InputLabel>
                  <NewLinkContainer>
                    <Input
                      type="url"
                      placeholder="https://example.com"
                      value={link.url}
                      onChange={e => handleLinkChange(e, link.id)}
                      readOnly={!isEditing}
                    />
                    <IconContainer
                      onClick={() => removeLink(link.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <FaTrash />
                    </IconContainer>
                  </NewLinkContainer>
                </InputContainer>
              ))}
            </InputRow>

            <AddLinkButtonContainer>
              {isEditing ? (
                <Button onClick={addNewLink}>
                  <FaPlus /> Add Link
                </Button>
              ) : (
                <Button onClick={addNewLink} disabled>
                  <FaPlus /> Add Link
                </Button>
              )}
            </AddLinkButtonContainer>
            {isEditing && (
              <ActionButtonContainer>
                <ActionButton onClick={handleCancelEdit}>
                  <FaTimes /> Cancel
                </ActionButton>
                <ActionButton onClick={() => handleSaveEdit(profileData)}>
                  <FaCheck /> Done
                </ActionButton>
              </ActionButtonContainer>
            )}
          </BasicDetailsContainer>
        </AccordionContent>
      )}
    </AccordionSection>
  );
};

export default ProfileBasics;
