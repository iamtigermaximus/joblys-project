import styled from 'styled-components';
import { breakpoints as bp } from '../../../utils/layout';
import colors from '../../../utils/colors';

// export const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin-top: 20px;
//   width: 100vw;
//   padding: 0 20px;
//   overflow-y: auto;
//   height: 100vh;
//   -ms-overflow-style: none;
//   scrollbar-width: none;

//   &::-webkit-scrollbar {
//     display: none;
//   }
// `;

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

  @media (min-width: ${bp.md}) {
    padding: 4px 25px;
  }
`;

export const AccordionHeaderTitle = styled.h1`
  font-weight: 900;
  font-size: 20px;
  color: #2e033b;
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
  color: black;
  padding: 0 3px;
  cursor: pointer;
`;

export const TrashIconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: black;
  padding: 0 4px;
  cursor: pointer;

  @media (min-width: ${bp.md}) {
    padding: 0 25px;
  }
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
    flex-direction: column;
    /* gap: 20px; */
    padding: 4px 25px;
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
  color: #2e033b;
  height: 40px;
  /* margin-bottom: 10px; */
  padding: 8px 12px;
  width: 100%;

  &:focus {
    outline: 0.5px solid #2e033b;
  }

  @media (min-width: ${bp.md}) {
    border: none;
    height: 40px;
    /* margin-bottom: 10px; */
    padding: 8px 12px;
    width: 100%;

    &:focus {
      outline: 0.5px solid #2e033b;
    }
  }
`;

export const InputLabel = styled.label`
  font-size: 14px;
  color: ${colors.darkPurple};
  letter-spacing: 1px;
  padding: 5px 0;

  @media (min-width: ${bp.md}) {
    /* margin: 5px 0; */
  }
`;

export const NewLinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  /* padding: 4px; */
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
  padding-bottom: 10px;

  @media (min-width: ${bp.md}) {
    padding-bottom: 20px;
  }
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
  color: #2e033b;
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

export const SkillItemContainer = styled.div`
  padding: 4px;
  width: 100%;
  display: flex;
  flex-direction: row;

  @media (min-width: ${bp.md}) {
    padding: 4px 25px;
  }
`;

export const LanguageItemContainer = styled.div`
  padding: 4px;
  width: 100%;
  display: flex;
  flex-direction: row;

  @media (min-width: ${bp.md}) {
    padding: 4px 25px;
  }
`;

export const ButtonContainer = styled.div`
  padding: 4px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 5px;

  @media (min-width: ${bp.md}) {
    padding: 4px 25px;
  }
`;

export const AddLinkButtonContainer = styled.div`
  padding: 4px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: ${bp.md}) {
    padding: 4px 25px;
  }
`;

export const ActionButtonContainer = styled.div`
  padding: 10px 4px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  @media (min-width: ${bp.md}) {
    padding: 30px 25px;
  }
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  padding: 4px;
  width: 80px;
  background-color: ${colors.purple};
  color: ${colors.white};
  display: flex;
  cursor: pointer;
  white-space: nowrap;
  gap: 2px;

  &:hover {
    background-color: ${colors.darkPurple};
    color: ${colors.white};
  }
`;

export const ActionButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  padding: 4px;
  width: 80px;
  background-color: ${colors.blueGray};
  color: ${colors.white};
  display: flex;
  cursor: pointer;
  white-space: nowrap;
  gap: 2px;

  &:hover {
    background-color: ${colors.purple};
    color: ${colors.white};
  }
`;

export const SectionTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
`;

export const SectionTitle = styled.h2`
  color: #2e033b;
  font-size: 16px;

  @media (min-width: ${bp.md}) {
    font-size: 18x;
  }
`;

export const UploadButton = styled.button`
  width: 150px;
  height: 40px;
  background-color: ${colors.blueGray};
  color: ${colors.white};
  border-radius: 5px;
  border: none;

  &:hover {
    cursor: pointer;
  }
`;

export const FileUpload = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.purple};
  color: ${colors.white};
  border-radius: 5px;
  font-size: 12px;
  margin: 5px;
  padding: 10px 6px;
  margin: 10px;
  height: 40px;
  &:hover {
    cursor: pointer;
  }

  @media (min-width: ${bp.md}) {
    font-size: 15px;
    margin: 10px;
  }
`;

export const UploadSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 6px;
  flex-direction: column;
  border: 0.5px dashed gray;
  width: 100%;
  border-radius: 5px;
  margin-bottom: 10px;

  @media (min-width: ${bp.md}) {
  }
`;

export const AddButtonContainer = styled.div`
  padding: 4px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: ${bp.md}) {
    padding: 4px 25px;
  }
`;

export const AddButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  padding: 4px;
  width: 150px;
  background-color: ${colors.purple};
  color: ${colors.white};
  display: flex;
  cursor: pointer;
  white-space: nowrap;
  gap: 2px;

  &:hover {
    background-color: ${colors.darkPurple};
    color: ${colors.white};
  }
`;
