'use client';
import React from 'react';
import {
  ActivitiesContainer,
  ActivityContainer,
  ActivitySection,
  Button,
  ButtonsContainer,
  Container,
  HeaderContainer,
  HeaderTextContainer,
  HeadingSubTexts,
  HeadingTexts,
  JobSearchSection,
  RecentActivitySection,
  RecentActivityTitle,
  ReviewButton,
} from './Dashboard.styles';
import { useSession } from 'next-auth/react';
import JobSearch from './job-search/JobSearch';

const Dashboard = () => {
  const { data: session } = useSession();

  return (
    <Container>
      <HeaderContainer>
        <HeaderTextContainer>
          <HeadingTexts>Hello!</HeadingTexts>
          <HeadingSubTexts>
            <strong>Welcome to Joblys!</strong> Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Sed et urna nec libero gravida
            tincidunt. Nullam non.
          </HeadingSubTexts>
        </HeaderTextContainer>
      </HeaderContainer>
      <ActivitySection>
        <JobSearchSection>
          <JobSearch />
        </JobSearchSection>
        <RecentActivitySection>
          <RecentActivityTitle>Your recent activity</RecentActivityTitle>
          <ButtonsContainer>
            <Button>Saved</Button>
            <Button>Applied</Button>
            <Button>Disliked</Button>
          </ButtonsContainer>
          <ActivitiesContainer>
            <ActivityContainer>
              <div>Software developer Helsinki</div>
              <ReviewButton>Review</ReviewButton>
            </ActivityContainer>
            <ActivityContainer>
              <div>Developer Tampere</div> <ReviewButton>Review</ReviewButton>
            </ActivityContainer>
          </ActivitiesContainer>
        </RecentActivitySection>
      </ActivitySection>
    </Container>
  );
};

export default Dashboard;
