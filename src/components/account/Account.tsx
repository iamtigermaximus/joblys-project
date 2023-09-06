'use client';
import React from 'react';
import {
  ContactInformation,
  Container,
  EducationSection,
  ExperienceSection,
  LinkContainer,
  LinksSection,
  LocationInformation,
  ProfileContainer,
  ProfileSection,
  ResumeDocumentSection,
  SkillsSection,
  SummarySection,
} from './Account.styles';

const Account = () => {
  return (
    <Container>
      <ProfileContainer>
        <ProfileSection>
          <ContactInformation>Contact Info</ContactInformation>
          <LocationInformation>Location Info</LocationInformation>
        </ProfileSection>
        <ResumeDocumentSection>Resume document section</ResumeDocumentSection>
        <h4>Summary</h4>
        <SummarySection>Summary section</SummarySection>
        <h4>Links</h4>
        <LinksSection>
          <LinkContainer>LinkedIn</LinkContainer>
          <LinkContainer>Github</LinkContainer>
        </LinksSection>
        <h4>Skills</h4>
        <SkillsSection>Skills section</SkillsSection>
        <h4>Work Experience</h4>
        <ExperienceSection>Work experience section</ExperienceSection>
        <h4>Education</h4>
        <EducationSection>Education section</EducationSection>
      </ProfileContainer>
    </Container>
  );
};

export default Account;
