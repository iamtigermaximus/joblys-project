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
            Welcome to Joblys, your all-in-one career companion! From crafting
            tailored resumes to discovering personalized job recommendations,
            your journey to career success starts here. Let&apos;s navigate the
            job market together seamlessly. Happy exploring!
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
