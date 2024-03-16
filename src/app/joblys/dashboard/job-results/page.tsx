import React from 'react';
import { Container } from '../../page.styles';
import PageHeader from '@/components/common/page-header/PageHeader';
import JobSearchResults from '@/components/dashboard/job-search-results/JobSearchResults';

const JobResultsPage = () => {
  return (
    <Container>
      <div>
        <title>JOB SEARCH RESULTS</title>
      </div>
      {/* <PageHeader /> */}
      <JobSearchResults />
    </Container>
  );
};

export default JobResultsPage;
