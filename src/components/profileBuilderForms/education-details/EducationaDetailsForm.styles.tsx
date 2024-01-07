import styled from 'styled-components';
import { breakpoints as bp } from '../../../utils/layout';
import colors from '../../../utils/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  /* height: 100vh;
  padding: 20px 30px; */

  @media (min-width: ${bp.lg}) {
    /* padding: 50px 100px; */
  }
`;

export const EducationalDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};
  /* border-radius: 8px; */
  /* box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); */
  width: 100%;
  padding: 30px 20px;
  /* margin: 20px; */
  flex-direction: column;
  color: ${colors.white};

  @media (min-width: ${bp.sm}) {
    /* max-width: 400px;
    padding: 30px 40px; */
  }

  @media (min-width: ${bp.md}) {
    /* max-width: 800px; */
  }
`;

export const EducationalDetailsTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const EducationalDetailsTitle = styled.h1`
  color: ${colors.darkPurple};
  padding: 5px;
  letter-spacing: 1px;
  font-size: 16px;

  @media (min-width: ${bp.md}) {
    font-size: 25px;
  }
`;

export const InputRow = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: ${bp.md}) {
    flex-direction: row;
    gap: 20px; /* Adjust the gap between input fields as needed */
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
  height: 40px;
  margin-bottom: 10px;

  /* @media (min-width: ${bp.md}) {
    font-size: 15px;
    padding: 20px;
     margin: 5px; 
  } */
  @media (min-width: ${bp.md}) {
    font-size: 13px;
    /* margin: 5px; */
    background-color: #f5f5f5;
    border: none;
    color: black;

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

export const SaveDetailsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  width: 100%;
`;

export const SaveDetailsButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${colors.ashGray};
  border-radius: 5px;
  background-color: ${colors.blueGray};
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
    font-size: 15px;
    padding: 20px;
    margin-left: 5px;
  }
`;

export const WorkExperienceContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const AddEducationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  width: 100%;

  @media (min-width: ${bp.md}) {
    justify-content: flex-start;
  }
`;

export const AddEducationButton = styled.button`
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
    margin-right: 5px;
  }
`;

export const BackButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 2px solid ${colors.ashGray}; */
  border-radius: 5px;
  background-color: ${colors.white};
  color: ${colors.blueGray};
  /* margin: 5px; */
  font-size: 10px;
  width: 100%;
  letter-spacing: 1px;
  cursor: pointer;
  padding: 10px;
  border: 1px solid ${colors.blueGray};

  &:hover {
    background: ${colors.darkPurple};
  }

  @media (min-width: ${bp.md}) {
    font-size: 15px;
    padding: 20px;
    margin-right: 5px;
  }
`;
