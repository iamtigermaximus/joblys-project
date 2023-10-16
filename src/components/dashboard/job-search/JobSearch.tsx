import React from 'react';
import {
  Container,
  InputContainer,
  Input,
  SearchButton,
  SearchSectionTitle,
  JobSearchSection,
} from './JobSearch.styles';
import { useRouter } from 'next/navigation';
import { FaChevronRight } from 'react-icons/fa';

const JobSearch = () => {
  const router = useRouter();

  const handleSearch = () => {
    /**
     * TODO: create handle search here
     * * Redirect to another page when the "Search" button is clicked
     */

    router.push('/pages/job-results');
  };
  return (
    <Container>
      <JobSearchSection>
        <SearchSectionTitle>Find a new job</SearchSectionTitle>
        <InputContainer>
          <Input type="text" placeholder="Search open positions" />
          <SearchButton onClick={handleSearch}>
            <FaChevronRight />
          </SearchButton>
        </InputContainer>
      </JobSearchSection>
    </Container>
  );
};

export default JobSearch;
