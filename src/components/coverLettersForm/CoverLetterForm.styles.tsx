import colors from '@/utils/colors';
import { breakpoints as bp } from '@/utils/layout';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  width: 100vw;
  padding: 0 20px;
`;

export const AccordionContainer = styled.div`
  width: 100%;
  padding-bottom: 200px;
`;

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
  padding: 4px 0;
  align-items: center;
`;

export const AccordionHeaderTitle = styled.h1`
  font-weight: 900;
  font-size: 20px;
  color: black;
  font-family: 'Roboto Rounded', sans-serif;
`;
export const AccordionContent = styled.div`
  /* padding: 5px 0; */
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TemplatePreview = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
  transform: translateX(0%);
  transition: transform 0.3s ease-out;
  z-index: 1;
  overflow-y: hidden;

  &.active {
    transform: translateX(-100%);
    transition: transform 0.3s ease-in;
  }

  @media (min-width: ${bp.lg}) {
    display: none;
  }
`;

export const TemplatePreviewHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${colors.purple};
  color: ${colors.white};
  padding: 10px;
  width: 100%;
  height: 6.3vh;
  margin-bottom: 20px;
`;

export const TemplateHeaderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
  color: white;
`;

export const HeaderItem = styled.h1`
  /* Common button styles go here */
  padding: 8px 16px;
  height: 40px;
  font-size: 16px;
  border: 1px solid white;
  cursor: pointer;
  color: white;
  background-color: transparent;
  border-radius: 3px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const PreviewButton = styled.button`
  font-size: 14px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.purple};
  padding: 8px 12px;
  height: 40px;
  border: none;
  border-radius: 3px;
  width: 110px;

  &:hover {
    background-color: ${colors.darkPurple};
  }

  @media (min-width: ${bp.lg}) {
    display: none;
  }
`;

export const PreviewButtonSection = styled.div`
  margin: 20px 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export const GenerateButton = styled.button`
  font-size: 14px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.purple};
  padding: 8px 12px;
  height: 40px;
  border: none;
  border-radius: 3px;
  width: 200px;

  &:hover {
    background-color: ${colors.darkPurple};
  }
`;

export const SuccessAlert = styled.p`
  color: green;
  font-size: 12px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const TextArea = styled.textarea`
  border-radius: 5px;
  font-size: 14px;
  height: 200px;
  padding: 8px 12px;
  background-color: #f5f5f5;
  color: black;
  border: none;
  overflow-y: scroll;

  &:focus {
    outline: 0.5px solid gray;
  }

  @media (min-width: ${bp.md}) {
    border: none;
    margin-bottom: 20px;
  }
`;

export const InputLabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const InputLabel = styled.label`
  font-size: 14px;
  color: ${colors.darkPurple};
  letter-spacing: 1px;
  padding: 5px 0;
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;

  @media (min-width: ${bp.md}) {
    margin: 5px 0;
  }
`;
