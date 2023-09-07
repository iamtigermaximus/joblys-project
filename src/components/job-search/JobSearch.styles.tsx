'use client';

//import { breakpoints as bp } from '../utils/layout';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  padding: 30px;
  height: 100%;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  height: 10vh;
  /* border: 1px solid red; */
  margin: 0 5px;
  font-size: 30px;
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
  /* border: 1px solid green; */
  margin: 10px;
  height: 70px;
  padding: 10px;
  display: flex;
  flex-direction: row;
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
  padding: 10px 35px 10px 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 13px;
  border-radius: 10px;
  margin: 0 10px;

  &::placeholder {
    color: #232946;
    font-style: bold;
  }

  &:focus {
    outline: none;
    border: none;
  }
`;

export const SearchContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* border: 1px solid red; */
`;

export const SearchButton = styled.button`
  height: 50px;
  padding: 10px 35px 10px 30px;
  border-radius: 10px;
  border: none;
  background: #232946;
  color: #b8c1ec;
  font-size: 13px;
  /* width: 250px; */
  white-space: nowrap;
`;

export const FilterContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const FilterSelect = styled.select`
  width: 150px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 13px;
  background-color: white;
  color: #333;
  outline: none;
  margin: 0 10px;

  &.selected {
    background-color: #232946;
    color: white;
  }
`;

const ArrowIcon = styled.span`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
`;

export const ResultsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
  margin: 30px 0;
`;

export const ResultsListContainer = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid green;
`;
export const ResultContainer = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid yellow;
`;

export const PopularSearchesContainer = styled.div`
  position: relative;
  width: 100%;
  /* border: 1px solid green; */
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

export const PopularSearches = styled.div`
  /* border: 1px solid green; */
  height: 70px;
  display: flex;
  flex-direction: row;
  margin: 10px 0;
  flex-wrap: wrap;
`;

export const Button = styled.button`
  background: #232946;
  color: #b8c1ec;
  border-radius: 10px;
  margin-right: 10px;
  width: 150px;
  border: none;
  height: 30px;
`;
