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
    padding: 20px 0;
  }
`;

export const SkillsDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};
  /* border-radius: 8px; */
  /* box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); */
  width: 100%;
  /* padding: 30px 20px; */
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
  padding: 8px 12px;
  /* margin: 5px 0; */
  font-size: 12px;
  width: 100%;

  @media (min-width: ${bp.md}) {
    font-size: 14px;
    /* padding: 20px; */
    /* margin: 5px; */
    background-color: #f5f5f5;
    border: none;
    color: black;
    height: 40px;
    width: 100%;

    &:focus {
      outline: 0.5px solid gray;
    }
  }
`;

export const InputLabel = styled.label`
  font-size: 10px;
  color: ${colors.darkPurple};
  letter-spacing: 1px;

  @media (min-width: ${bp.md}) {
    font-size: 14px;
    margin: 5px 0;
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
  width: 100%;
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

export const AddNewSkillContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* margin: 10px 0; */
  padding: 10px 0;
`;

export const TrashIcon = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border: none;
  margin: 0 5px;
  font-size: 16px;
  background-color: white;
`;

export const AddSkillContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  width: 100%;

  @media (min-width: ${bp.md}) {
    justify-content: flex-start;
  }
`;
