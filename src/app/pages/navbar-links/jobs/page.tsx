'use client';
import React, { useState } from 'react';
import {
  Container,
  FilterContainer,
  FilterSelect,
  Icon,
  Input,
  InputContainer,
  ResultContainer,
  ResultsContainer,
  ResultsListContainer,
  SearchButton,
  SearchContainer,
} from './Jobs.styles';
import PageHeader from '@/components/page-header/PageHeader';
import JobSearch from '@/components/job-search/JobSearch';

const Jobs = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };
  return (
    <Container>
      <div>
        <title>SEARCH JOBS</title>
      </div>
      <PageHeader />
      <JobSearch />
    </Container>
  );
};

export default Jobs;
