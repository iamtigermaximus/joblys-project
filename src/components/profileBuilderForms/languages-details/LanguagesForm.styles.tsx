import styled from 'styled-components';
import { breakpoints as bp } from '../../../utils/layout';
import colors from '../../../utils/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  /* height: 100vh; */
  /* padding: 20px 30px; */

  @media (min-width: ${bp.lg}) {
    /* padding: 50px 100px; */
  }
`;

export const LanguagesDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};
  /* border-radius: 8px; */
  /* box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); */
  width: 100%;
  padding: 30px 20px;
  /* margin: 20px; */
  /* color: ${colors.white}; */
  color: black;

  /* @media (min-width: ${bp.sm}) {
    max-width: 400px;
    padding: 30px 40px;
  } */

  @media (min-width: ${bp.md}) {
    /* max-width: 500px; */
    /* width: 100%; */
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Input = styled.input`
  border: 2px solid ${colors.blueGray};
  border-radius: 5px;
  padding: 10px;
  /* margin: 5px 0; */
  font-size: 12px;

  @media (min-width: ${bp.md}) {
    font-size: 15px;
    /* margin: 5px; */
    background-color: #f5f5f5;
    border: none;
    color: black;
    height: 40px;

    &:focus {
      outline: 0.5px solid gray;
    }
  }
`;

export const InputLabel = styled.label`
  font-size: 10px;
  color: ${colors.darkPurple};
  letter-spacing: 1px;
  margin: 5px 0;

  @media (min-width: ${bp.md}) {
    font-size: 15px;
    margin: 5px;
  }
`;

export const AddButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${colors.ashGray};
  border-radius: 5px;
  background-color: ${colors.purple};
  color: ${colors.white};
  /* margin: 5px; */
  font-size: 10px;
  width: 20%;
  letter-spacing: 1px;
  cursor: pointer;
  padding: 10px;

  &:hover {
    background: ${colors.darkPurple};
  }

  @media (min-width: ${bp.md}) {
    font-size: 13px;
    width: 30%;
  }
`;

export const AddNewLanguageContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  /* margin: 10px 0; */
  padding: 10px;
`;

export const DoneButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  padding: 5px;
  border: 1px solid red;
  background-color: purple;
  color: white;
  border-radius: 3px;
  border: none;
  border: 1px solid purple;
`;

export const TrashIcon = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border: 1px solid red;
  margin: 0 5px;
  font-size: 16px;
  background-color: white;
  border: 1px solid gray;
  border-radius: 3px;
`;
