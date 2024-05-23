'use client';

import { breakpoints as bp } from '../../../utils/layout';
import colors from '../../../utils/colors';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 100px 30px;
  overflow-y: scroll;
  /* border: 1px solid red; */
  height: 100vh;
  align-items: center;
  /* background-color: pink; */

  @media (min-width: ${bp.md}) {
    padding: 50px;
  }

  @media (min-width: ${bp.lg}) {
    padding: 150px;
  }
`;

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* padding: 100px 30px; */
  overflow-y: scroll;
  /* border: 1px solid red; */
  height: 100vh;
  align-items: center;
  /* background-color: pink; */
  padding: 20px 20px 100px;

  @media (min-width: ${bp.md}) {
    /* padding: 50px; */
  }

  @media (min-width: ${bp.lg}) {
    padding: 100px;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PageTitle = styled.div`
  font-size: 18px;
  color: ${colors.blueGray};
  margin-bottom: 10px;

  @media (min-width: ${bp.md}) {
    font-size: 20px;
  }

  @media (min-width: ${bp.lg}) {
    font-size: 25px;
  }
`;

export const CreateProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${colors.white};
  border-radius: 8px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  width: 100%;
  border-radius: 5px;
  /* margin: 30px 0 30px; */
  padding: 10px 20px;

  @media (min-width: ${bp.md}) {
    flex-direction: row;
    margin: 30px 0 30px;
  }

  @media (min-width: ${bp.lg}) {
    flex-direction: row;
    margin: 30px 0 30px;
  }
`;

export const ProfileFormContainer = styled.div`
  /* border: 1px solid red; */
  width: 100%;
  /* background-color: pink; */
`;

//STYLES FOR READ-ONLY FORM

export const AccordionSection = styled.div`
  margin-bottom: 10px;
  width: 100%;
`;

export const AccordionHeader = styled.div`
  cursor: pointer;
  background-color: ${colors.white};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid #f5f5f5;

  height: 50px;
  padding: 4px;
  align-items: center;
  width: 100%;
`;

export const AccordionHeaderTitle = styled.h1`
  font-weight: 900;
  font-size: 20px;
  color: black;
  font-family: 'Roboto Rounded', sans-serif;
`;
export const AccordionContent = styled.div`
  /* padding: 5px 0; */
  /* padding: 4px; */
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BasicDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};
  width: 100%;
  color: ${colors.white};
`;

export const InputRow = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 4px;

  @media (min-width: ${bp.md}) {
    flex-direction: row;
    gap: 20px;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 4px;
`;

export const Input = styled.input`
  border-radius: 5px;
  padding: 10px;
  font-size: 14px;
  background-color: #f5f5f5;
  border: none;
  color: black;
  height: 40px;
  margin-bottom: 10px;
  padding: 8px 12px;
  width: 100%;

  &:focus {
    outline: 0.5px solid gray;
  }

  @media (min-width: ${bp.md}) {
    background-color: #f5f5f5;
    border: none;
    color: black;
    height: 40px;
    margin-bottom: 10px;
    padding: 8px 12px;
    width: 100%;

    &:focus {
      outline: 0.5px solid gray;
    }
  }
`;

export const InputLabel = styled.label`
  font-size: 14px;
  color: ${colors.darkPurple};
  letter-spacing: 1px;
  padding: 5px 0;

  @media (min-width: ${bp.md}) {
    margin: 5px 0;
  }
`;

export const NewLinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 4px;
`;

export const EducationalDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};
  width: 100%;
  flex-direction: column;
  color: ${colors.white};
`;

export const EducationContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ProfessionalDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};
  width: 100%;
  margin-bottom: 20px;
  flex-direction: column;
  color: ${colors.white};
`;
export const ProfessionalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const SkillsDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};
  width: 100%;
  color: black;
`;

export const SkillsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const LanguagesDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};
  width: 100%;
  color: black;
`;

export const LanguagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const TextArea = styled.textarea`
  border-radius: 5px;
  font-size: 14px;
  height: 100px;
  padding: 8px 12px;
  background-color: #f5f5f5;
  color: black;
  border: none;
  margin-bottom: 10px;
  width: 100%;

  &:focus {
    outline: 0.5px solid gray;
  }

  @media (min-width: ${bp.md}) {
    border: none;
    margin-bottom: 20px;
  }
`;

export const DateInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 10px;
`;

export const ItemContainer = styled.div`
  padding: 4px;
  width: 100%;
`;
