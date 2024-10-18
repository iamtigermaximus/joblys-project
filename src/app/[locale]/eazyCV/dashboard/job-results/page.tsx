import React from 'react';
import { Container } from '../../page.styles';
import JobSearchResults from '@/components/dashboard/job-search-results/JobSearchResults';

const JobResultsPage = () => {
  return (
    <Container>
      <div>
        <title>JOB SEARCH RESULTS</title>
      </div>
      <JobSearchResults />
    </Container>
  );
};

export default JobResultsPage;
