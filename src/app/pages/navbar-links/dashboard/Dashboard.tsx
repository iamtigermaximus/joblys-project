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
import JobSearch from '@/components/dashboard/job-search/JobSearch';
import RecentActivity from '@/components/dashboard/recent-activity/RecentActivity';

const Dashboard = () => {
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
