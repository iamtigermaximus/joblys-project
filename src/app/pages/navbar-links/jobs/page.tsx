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

const Jobs = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };
  return (
    <Container>
      <PageHeader />
      <SearchContainer>
        <InputContainer>
          <Icon></Icon>
          <Input type="text" placeholder="What" />
        </InputContainer>
        <InputContainer>
          <Icon></Icon>
          <Input type="text" placeholder="Where" />
        </InputContainer>
        <SearchButton>Find jobs</SearchButton>
      </SearchContainer>
      <FilterContainer>
        <FilterSelect
          value={selectedOption}
          onChange={handleSelectChange}
          className={selectedOption ? 'selected' : ''}
        >
          <option value="" disabled hidden>
            Date posted
          </option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </FilterSelect>
        <FilterSelect
          value={selectedOption}
          onChange={handleSelectChange}
          className={selectedOption ? 'selected' : ''}
        >
          <option value="" disabled hidden>
            Remote
          </option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </FilterSelect>
        <FilterSelect
          value={selectedOption}
          onChange={handleSelectChange}
          className={selectedOption ? 'selected' : ''}
        >
          <option value="" disabled hidden>
            Job type
          </option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </FilterSelect>
        <FilterSelect
          value={selectedOption}
          onChange={handleSelectChange}
          className={selectedOption ? 'selected' : ''}
        >
          <option value="" disabled hidden>
            Location
          </option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </FilterSelect>
        <FilterSelect
          value={selectedOption}
          onChange={handleSelectChange}
          className={selectedOption ? 'selected' : ''}
        >
          <option value="" disabled hidden>
            Company
          </option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </FilterSelect>
        {/* <ArrowIcon>&#9660;</ArrowIcon> */}
      </FilterContainer>
      <ResultsContainer>
        <ResultsListContainer>List of Jobs</ResultsListContainer>
        <ResultContainer>Single Job Description</ResultContainer>
      </ResultsContainer>
    </Container>
  );
};

export default Jobs;