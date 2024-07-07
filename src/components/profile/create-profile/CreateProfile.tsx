'use client';

import React, { useEffect, useState } from 'react';
import {
  Container,
  CreateProfileContainer,
  PageTitle,
  ProfileContainer,
  TitleContainer,
} from './CreateProfile.styles';
import { FaCircleChevronDown, FaCircleChevronUp } from 'react-icons/fa6';
import UploadCvSection from './uploadCvSection/UploadCvSection';
import BuildProfileSection from './buildProfileSection/BuildProfileSection';
import axios from 'axios';
import { Profile } from '@/types/profile';
import Loader from '@/components/common/loader/Loader';
import ProfileForm from '@/components/profile/profile-form/ProfileForm';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const CreateProfile = () => {
  const [existingData, setExistingData] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [accordionState, setAccordionState] = useState({
    basic: true,
    professional: false,
    educational: false,
    skills: false,
    languages: false,
  });
  const [error, setError] = useState<string | null>(null);

  const toggleAccordion = (section: keyof typeof accordionState) => {
    setAccordionState(prevState => {
      const newState = {
        basic: false,
        professional: false,
        educational: false,
        skills: false,
        languages: false,
      };

      const isSameSection = prevState[section];
      newState[section] = !isSameSection;

      return newState;
    });
  };

  useEffect(() => {
  
    if (!session) {
      router.push('/login');
      return;
    }

    const fetchProfile = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get('/api/profile');
        if (response.data.content) {
          console.log('Fetched profile data:', response.data.content);
          setExistingData(response.data.content);
        }
      } catch (err: any) {
        if (err.response) {
          if (err.response.status === 404) {
            console.log('Profile not found, prompt user to create one.');
            setExistingData(null);
          } else {
            console.error('Server error:', err.response.data.message);
            setError(err.response.data.message || 'Server error');
          }
        } else if (err.request) {
          console.error('Network error:', err.message);
          setError('Network error. Please try again.'); // Adjusted type
        } else {
          console.error('Error:', err.message);
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if ( isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {existingData ? (
        <ProfileContainer>
          <ProfileForm existingData={existingData} />
        </ProfileContainer>
      ) : (
        <Container>
          <TitleContainer>
            <PageTitle>Please create your profile</PageTitle>
          </TitleContainer>
          <CreateProfileContainer>
            <UploadCvSection />
            <h4>or</h4>
            <BuildProfileSection />
          </CreateProfileContainer>
        </Container>
      )}
    </>
  );
};

export default CreateProfile;
