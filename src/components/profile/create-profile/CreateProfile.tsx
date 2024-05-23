'use client';

import React, { useEffect, useState } from 'react';
import {
  AccordionContent,
  AccordionHeader,
  AccordionHeaderTitle,
  AccordionSection,
  BasicDetailsContainer,
  Container,
  CreateProfileContainer,
  DateInfoContainer,
  EducationContainer,
  EducationalDetailsContainer,
  IconContainer,
  Input,
  InputContainer,
  InputLabel,
  InputRow,
  ItemContainer,
  LanguagesContainer,
  LanguagesDetailsContainer,
  NewLinkContainer,
  PageTitle,
  ProfessionalContainer,
  ProfessionalDetailsContainer,
  ProfileContainer,
  ProfileFormContainer,
  SkillsContainer,
  SkillsDetailsContainer,
  TextArea,
  TitleContainer,
} from './CreateProfile.styles';
import { FaCircleChevronDown, FaCircleChevronUp } from 'react-icons/fa6';
import UploadCvSection from './uploadCvSection/UploadCvSection';
import BuildProfileSection from './buildProfileSection/BuildProfileSection';
import axios from 'axios';
import { Profile } from '@/types/profile';
import Loader from '@/components/common/loader/Loader';

const CreateProfile = () => {
  const [existingData, setExistingData] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);
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

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {existingData ? (
        <ProfileContainer>
          <ProfileFormContainer>
            <AccordionSection>
              <AccordionHeader>
                <AccordionHeaderTitle
                  style={{ color: accordionState.basic ? '' : 'gray' }}
                  onClick={() => toggleAccordion('basic')}
                >
                  Personal Details
                </AccordionHeaderTitle>
                <span onClick={() => toggleAccordion('basic')}>
                  {accordionState.basic ? (
                    <IconContainer>
                      <FaCircleChevronUp style={{ fontSize: '24px' }} />
                    </IconContainer>
                  ) : (
                    <IconContainer>
                      <FaCircleChevronDown style={{ fontSize: '24px' }} />
                    </IconContainer>
                  )}
                </span>
              </AccordionHeader>
              {accordionState.basic && (
                <AccordionContent>
                  <BasicDetailsContainer>
                    <InputRow>
                      <InputContainer>
                        <InputLabel>First Name:</InputLabel>
                        <Input
                          type="text"
                          placeholder="Your first name"
                          value={existingData.firstName}
                        />
                      </InputContainer>
                      <InputContainer>
                        <InputLabel>Last Name:</InputLabel>
                        <Input
                          type="text"
                          placeholder="Your last name"
                          value={existingData.lastName}
                        />
                      </InputContainer>
                    </InputRow>
                    <InputRow>
                      <InputContainer>
                        <InputLabel>Phone number:</InputLabel>
                        <Input
                          type="tel"
                          placeholder="Phone number"
                          value={existingData.contact}
                        />
                      </InputContainer>
                      <InputContainer>
                        <InputLabel>Email address:</InputLabel>
                        <Input
                          type="email"
                          placeholder="Your email"
                          value={existingData.email}
                        />
                      </InputContainer>
                    </InputRow>
                    {existingData.links.map(link => (
                      <InputContainer key={link.id}>
                        <InputLabel>Link</InputLabel>
                        <NewLinkContainer>
                          <Input
                            type="url"
                            placeholder="https://example.com"
                            value={link.url}
                          />
                        </NewLinkContainer>
                      </InputContainer>
                    ))}
                  </BasicDetailsContainer>
                </AccordionContent>
              )}
            </AccordionSection>
            <AccordionSection>
              <AccordionHeader>
                <AccordionHeaderTitle
                  style={{ color: accordionState.educational ? '' : 'gray' }}
                  onClick={() => toggleAccordion('educational')}
                >
                  Educational Details
                </AccordionHeaderTitle>
                <span onClick={() => toggleAccordion('educational')}>
                  {accordionState.educational ? (
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
              {accordionState.educational && (
                <AccordionContent>
                  <EducationalDetailsContainer>
                    {existingData.educational.map(educ => (
                      <EducationContainer key={educ.id}>
                        <InputRow>
                          <InputContainer>
                            <InputLabel>School:</InputLabel>
                            <Input type="text" value={educ.school} />
                          </InputContainer>
                          <InputContainer>
                            <InputLabel>Course/Degree:</InputLabel>
                            <Input type="text" value={educ.course} />
                          </InputContainer>
                        </InputRow>
                        <InputRow>
                          <InputContainer>
                            <InputLabel>Start date:</InputLabel>
                            <DateInfoContainer>
                              <Input type="text" value={educ.startDate.month} />
                              <Input type="text" value={educ.startDate.year} />
                            </DateInfoContainer>
                          </InputContainer>
                          <InputContainer>
                            <InputLabel>End date:</InputLabel>
                            <DateInfoContainer>
                              <Input type="text" value={educ.endDate.month} />
                              <Input type="text" value={educ.endDate.year} />
                            </DateInfoContainer>
                          </InputContainer>
                        </InputRow>
                      </EducationContainer>
                    ))}
                  </EducationalDetailsContainer>
                </AccordionContent>
              )}
            </AccordionSection>
            <AccordionSection>
              <AccordionHeader>
                <AccordionHeaderTitle
                  style={{ color: accordionState.professional ? '' : 'gray' }}
                  onClick={() => toggleAccordion('professional')}
                >
                  Professional Details
                </AccordionHeaderTitle>
                <span onClick={() => toggleAccordion('professional')}>
                  {accordionState.professional ? (
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
              {accordionState.professional && (
                <AccordionContent>
                  <ProfessionalDetailsContainer>
                    {existingData.professional.map(work => (
                      <ProfessionalContainer key={work.id}>
                        <InputRow>
                          <InputContainer>
                            <InputLabel>Job Title:</InputLabel>
                            <Input type="text" value={work.jobTitle} />
                          </InputContainer>
                          <InputContainer>
                            <InputLabel>Company:</InputLabel>
                            <Input type="text" value={work.company} />
                          </InputContainer>
                        </InputRow>
                        <InputRow>
                          <InputContainer>
                            <InputLabel>Start date:</InputLabel>
                            <DateInfoContainer>
                              <Input type="text" value={work.startDate.month} />
                              <Input type="text" value={work.startDate.year} />
                            </DateInfoContainer>
                          </InputContainer>
                          <InputContainer>
                            <InputLabel>End date:</InputLabel>
                            <DateInfoContainer>
                              <Input type="text" value={work.endDate.month} />
                              <Input type="text" value={work.endDate.year} />
                            </DateInfoContainer>
                          </InputContainer>
                        </InputRow>
                        <InputLabel>Job details:</InputLabel>
                        <ItemContainer>
                          <TextArea
                            placeholder="Describe your role and achievements"
                            value={work.jobDetails}
                          />
                        </ItemContainer>
                      </ProfessionalContainer>
                    ))}
                  </ProfessionalDetailsContainer>
                </AccordionContent>
              )}
            </AccordionSection>

            <AccordionSection>
              <AccordionHeader>
                <AccordionHeaderTitle
                  style={{ color: accordionState.skills ? '' : 'gray' }}
                  onClick={() => toggleAccordion('skills')}
                >
                  Skills
                </AccordionHeaderTitle>
                <span onClick={() => toggleAccordion('skills')}>
                  {accordionState.skills ? (
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
              {accordionState.skills && (
                <AccordionContent>
                  <SkillsDetailsContainer>
                    {existingData.skills.map(skill => (
                      <SkillsContainer key={skill.id}>
                        <ItemContainer>
                          <Input value={skill.name} />
                        </ItemContainer>
                      </SkillsContainer>
                    ))}
                  </SkillsDetailsContainer>
                </AccordionContent>
              )}
            </AccordionSection>
            <AccordionSection>
              <AccordionHeader>
                <AccordionHeaderTitle
                  style={{ color: accordionState.languages ? '' : 'gray' }}
                  onClick={() => toggleAccordion('languages')}
                >
                  Languages
                </AccordionHeaderTitle>
                <span onClick={() => toggleAccordion('languages')}>
                  {accordionState.languages ? (
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
              {accordionState.languages && (
                <AccordionContent>
                  <LanguagesDetailsContainer>
                    {existingData.languages.map(language => (
                      <LanguagesContainer key={language.id}>
                        <ItemContainer>
                          <Input value={language.name} />
                        </ItemContainer>
                      </LanguagesContainer>
                    ))}
                  </LanguagesDetailsContainer>
                </AccordionContent>
              )}
            </AccordionSection>
          </ProfileFormContainer>
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
