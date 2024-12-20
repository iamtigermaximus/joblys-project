import colors from '@/utils/colors';
import { breakpoints as bp } from '@/utils/layout';
import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  width: 100vw;
  padding: 0 20px;
  overflow-y: auto;
  height: 100vh;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
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
  color: #2e033b;
  font-family: 'Roboto Rounded', sans-serif;
`;

export const AccordionContent = styled.div``;

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

  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;

  &:hover {
    background: linear-gradient(
      90deg,
      rgba(69, 26, 128, 0.9),
      rgba(75, 30, 138, 0.9),
      rgba(106, 13, 173, 0.9)
    );
    color: ${colors.white};
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
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;

  &:hover {
    background: linear-gradient(
      90deg,
      rgba(69, 26, 128, 0.9),
      rgba(75, 30, 138, 0.9),
      rgba(106, 13, 173, 0.9)
    );
    color: ${colors.white};
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

export const PreviewCoverLetterContainer = styled.div`
  /* padding: 10px;
  display: flex; */
  height: 100%;
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 10px;

  @media (min-width: ${bp.sm}) {
    padding: 10px;
  }

  @media (min-width: ${bp.md}) {
    padding: 20px 50px;
  }

  @media (min-width: ${bp.lg}) {
  }
`;

export const CoverLetterContent = styled.div`
  /* height: 100%; */
  width: 100%;
  transform: scale(1, 0.7);
  transform-origin: top;

  @media (min-width: ${bp.sm}) {
    width: 500px;
    transform: scale(1, 0.8);
  }

  @media (min-width: ${bp.md}) {
    width: 600px;
    transform: scale(1, 0.9);
  }

  @media (min-width: ${bp.lg}) {
  }
`;

export const TooltipContainer = styled.div`
  position: absolute;
  top: 10;
  left: 100;
  transform: translateX(-100%);
  z-index: 100;
  padding: 10px;
  background-color: ${colors.blueGray};
  color: ${colors.white};
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 200px;
  font-size: 11px;
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-left-color: #ffffff;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: ${spin} 1s linear infinite;

  position: absolute;
  top: 10px;
  left: 40%;
  transform: translateX(-40%);
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
`;
