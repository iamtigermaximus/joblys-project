import React from 'react';
import { Container } from '@/app/page.styles';
import PageHeader from '@/components/page-header/PageHeader';
import JobSearchResults from '@/components/job-search-results/JobSearchResults';

const JobResultsPage = () => {
  return (
    <Container>
      <div>
        <title>JOB SEARCH RESULTS</title>
      </div>
      <PageHeader />
      <JobSearchResults />
    </Container>
  );
};

export default JobResultsPage;
