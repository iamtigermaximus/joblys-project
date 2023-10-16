'use client';

import { breakpoints as bp } from '../../../utils/layout';
import colors from '../../../utils/colors';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const JobSearchSection = styled.div`
  padding: 20px;

  @media (min-width: ${bp.lg}) {
    padding: 40px;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  height: 10vh;
  margin: 0 5px;
  font-size: 30px;
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  position: relative;
  border: 1px solid ${colors.ashGray};
  border-radius: 3px;

  @media (min-width: ${bp.lg}) {
    flex-direction: row;
  }
`;

export const Icon = styled.i`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  color: #777;
`;

export const Input = styled.input`
  width: 100%;
  height: 50px;
  border-radius: 3px 0 0 3px;
  font-size: 13px;
  background-color: ${colors.ashGray};
  border: 1px solid ${colors.ashGray};
  padding: 10px;

  &::placeholder {
    color: ${colors.blueGray};
    font-style: bold;
  }

  &:focus {
    outline: none;
    border: none;
  }

  @media (min-width: ${bp.lg}) {
    padding: 10px 35px 10px 30px;
  }
`;

export const SearchButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  padding: 5px 0;
  border-radius: 5px;
  border: none;
  background-color: ${colors.orange};
  color: ${colors.white};
  font-size: 25px;
  white-space: nowrap;

  @media (min-width: ${bp.lg}) {
    padding: 10px 35px 10px 30px;
  }
`;

export const SearchSectionTitle = styled.h2`
  color: ${colors.purple};
  margin: 0 0 20px;
`;

// export const SearchContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   padding: 20px;
//   border: 1px solid red;
// `;

// export const FilterContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   position: relative;
//   width: 100%;
// `;

// export const FilterSelect = styled.select`
//   width: 150px;
//   padding: 10px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
//   font-size: 13px;
//   background-color: white;
//   color: #333;
//   outline: none;
//   margin: 0 10px;

//   &.selected {
//     background-color: #232946;
//     color: white;
//   }
// `;

// const ArrowIcon = styled.span`
//   position: absolute;
//   top: 50%;
//   right: 10px;
//   transform: translateY(-50%);
// `;

// export const ResultsContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   width: 100%;
//   border: 1px solid red;
//   margin: 30px 0;
// `;

// export const ResultsListContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   width: 40%;
//   height: 100%;
// `;

// export const ResultContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   width: 60%;
//   height: 100%;
// `;

// export const PopularSearchesContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   position: relative;
//   width: 100%;
//   padding: 10px 20px;
//   margin: 10px;

//   @media (min-width: ${bp.lg}) {
//   }
// `;

// export const PopularSearches = styled.div`
//   display: flex;
//   flex-direction: row;
//   width: 100%;
//   height: 100%;
//   margin: 10px 0;
//   flex-wrap: wrap;
// `;

// export const Button = styled.button`
//   background: #232946;
//   color: #b8c1ec;
//   border-radius: 10px;
//   margin: 5px;
//   width: 150px;
//   border: none;
//   height: 30px;
// `;
