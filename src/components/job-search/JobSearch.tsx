import React from 'react';
import {
  Container,
  InputContainer,
  Input,
  SearchButton,
  PopularSearchesContainer,
  PopularSearches,
  Button,
} from './JobSearch.styles';
import { useRouter } from 'next/navigation';

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
      <InputContainer>
        <Input type="text" placeholder="Search job, keywords, companies" />
        <Input type="text" placeholder='Enter location or "remote"' />
        <SearchButton onClick={handleSearch}>FIND JOBS</SearchButton>
      </InputContainer>
      <PopularSearchesContainer>
        <h4> Popular Searches</h4>
        <PopularSearches>
          <Button>Work From Home</Button>
          <Button>Work From Home</Button>
          <Button>Work From Home</Button>
          <Button>Work From Home</Button>
          <Button>Work From Home</Button>
          <Button>Work From Home</Button>
          <Button>Work From Home</Button>
          <Button>Work From Home</Button>
          <Button>Work From Home</Button>
          <Button>Work From Home</Button>
          <Button>Work From Home</Button>
          <Button>Work From Home</Button>
        </PopularSearches>
      </PopularSearchesContainer>
    </Container>
  );
};

export default JobSearch;
