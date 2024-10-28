import styled from 'styled-components';
import { breakpoints as bp } from '../../../utils/layout';
import colors from '../../../utils/colors';

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
  overflow: scroll;

  &.active {
    transform: translateX(-100%);
    transition: transform 0.3s ease-in;
  }

  @media (min-width: ${bp.lg}) {
    display: none;
  }
`;

export const PreviewResumeContainer = styled.div`
  margin: auto;
  /* padding: 10px; */
  display: flex;
  align-items: center;
  width: 100%;
  /* background: linear-gradient(145deg, #ffffff, #f8f7ff, #eae8ff); */
  /* background-color: pink; */

  @media (max-width: ${bp.md}) {
    width: 375px;
  }

  @media (min-width: ${bp.md}) {
    width: 640px;
  }
`;

export const ResumeContent = styled.div`
  transform: scale(1, 0.3);
  transform-origin: top;
  width: 100%;

  @media (min-width: ${bp.md}) {
    transform: scale(1);
  }

  @media (min-width: ${bp.lg}) {
    transform: scale(0.9);
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
  font-size: 13px;
  padding: 5px;
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

export const CreateProfileButton = styled.button`
  font-size: 14px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: ${colors.purple};
  padding: 8px 12px;
  height: 40px;
  border: none;
  border-radius: 3px;
  min-width: 110px;
  white-space: nowrap;

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
  cursor: pointer;
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

// export const FileUpload = styled.input`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background-color: ${colors.purple};
//   color: ${colors.white};
//   border-radius: 5px;
//   font-size: 12px;
//   margin: 5px;
//   padding: 10px 6px;
//   margin: 10px;
//   height: 40px;
//   &:hover {
//     cursor: pointer;
//   }

//   @media (min-width: ${bp.md}) {
//     font-size: 15px;
//     margin: 10px;
//   }
// `;

export const UploadSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  padding: 10px 6px;
  margin: 10px;
  flex-direction: column;
  border: 0.5px dashed gray;
  width: 100%;
  border-radius: 5px;

  @media (min-width: ${bp.md}) {
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

// Styled input for the file upload button
export const FileUpload = styled.input`
  display: none; // Hide the original file input
`;

// Additional styled component for the label that will act as the button
export const FileUploadButton = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.white};
  color: ${colors.darkPurple};
  border-radius: 3px;
  font-size: 14px;
  height: 25px;
  margin: 10px;
  min-width: 100px;
  max-width: 150px;
  cursor: pointer;
  padding: 4px 6px;

  &:hover {
    opacity: 0.9;
  }

  @media (min-width: ${bp.md}) {
    font-size: 14px;
  }
`;

export const UploadInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  border-radius: 5px;
  width: 300px;
  margin-bottom: 10px;
  background-color: ${colors.purple};
  height: 40px;
`;

export const FilenameContainer = styled.div`
  font-size: 14px;
  margin-left: 10px;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
`;
