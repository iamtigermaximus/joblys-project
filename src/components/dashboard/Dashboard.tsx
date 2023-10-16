'use client';
import React from 'react';
import {
  ActivitySection,
  Container,
  HeaderContainer,
  HeaderTextContainer,
  HeadingSubTexts,
  HeadingTexts,
  // JobSearchSection,
} from './Dashboard.styles';
import { useSession } from 'next-auth/react';
import JobSearch from './job-search/JobSearch';
import RecentActivity from './recent-activity/RecentActivity';

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
        <JobSearch />
        <RecentActivity />
      </ActivitySection>
    </Container>
  );
};

export default Dashboard;
