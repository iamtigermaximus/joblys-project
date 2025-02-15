import styled from 'styled-components';
import { breakpoints as bp } from '@/utils/layout';
import colors from '@/utils/colors';
import MiniCoverLetterTemplate from '../minicoverletter-template/MiniCoverLetterTemplate';
import CoverLetterTemplate from '../coverletter/coverletterTemplate/CoverLetterTemplate';

export const CoverLetterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding-bottom: 100px;
  align-items: flex-start;
`;

export const CoverLetterCard = styled.div<{ isLast?: boolean }>`
  /* flex: ${({ isLast }) =>
    isLast ? '0 1 calc(50% - 10px)' : '1 1 calc(50% - 10px)'};
  max-width: calc(50%-10px);
  height: 250px;
  overflow: hidden;
  top: 0;
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (min-width: ${bp.sm}) {
    max-width: calc(50%-10px);
    height: 300px;
  }

  @media (min-width: ${bp.md}) {
    height: 400px;
  }

  @media (min-width: ${bp.lg}) {
    max-width: calc(25% - 15px);
    height: 250px;
  }

  @media (min-width: ${bp.xl}) {
    max-width: calc(25% - 20px);
    height: 350px;
  } */

  height: 250px;
  position: relative;
  cursor: pointer;
  border: 1px solid #ccc;
  overflow: hidden;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: white;

  @media (min-width: ${bp.sm}) {
    height: 400px;
  }

  @media (min-width: ${bp.md}) {
    height: 300px;
  }

  @media (min-width: ${bp.lg}) {
    height: 250px;
  }

  @media (min-width: ${bp.xl}) {
    height: 350px;
  }
`;

export const CoverLetterContent = styled.div`
  display: flex;
  justify-content: center;
  transform-origin: left top;
  position: relative;
  top: 0;
  left: 0;
  transform: scale(1, 0.4);
  width: 100%;
  height: 100vh;

  @media (min-width: ${bp.sm}) {
    transform: scale(1, 0.55);
  }

  @media (min-width: ${bp.md}) {
    transform: scale(1, 0.45);
  }

  @media (min-width: ${bp.lg}) {
    transform: scale(1, 0.45);
  }

  @media (min-width: ${bp.xl}) {
    transform: scale(1, 0.55);
  }
`;
export const CreateCoverLetterButton = styled.div`
  flex: 1 1 calc(50% - 10px);
  max-width: calc(50%-10px);
  height: 250px;
  border: 1px dashed #ccc;
  overflow: hidden;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;

  &:hover {
    color: #520668;
    border: 1px dashed #520668;
  }

  @media (min-width: ${bp.sm}) {
    max-width: calc(50%-10px);
    height: 350px;
  }

  @media (min-width: ${bp.md}) {
    max-width: calc(33.33% - 15px);
    height: 300px;
  }

  @media (min-width: ${bp.lg}) {
    max-width: calc(25% - 15px);
    height: 250px;
  }

  @media (min-width: ${bp.xl}) {
    max-width: calc(25% - 20px);
    height: 350px;
  }
`;

export const ButtonLabel = styled.h1`
  font-size: 13px;
  color: #b0b0b0;
  white-space: nowrap;

  &:hover {
    color: #520668;
  }

  @media (min-width: ${bp.md}) {
    font-size: 16px;
  }
`;

export const MiniCoverLetter = styled(CoverLetterTemplate)`
  width: 100%;
  height: 100%;
`;

export const EditModalOverlay = styled.div`
  position: absolute;
  bottom: calc(100% + 10px);
  right: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const EditModalContent = styled.div`
  background-color: white;
  padding: 10px;
  border-radius: 3px;
  gap: 10px;
  width: 100%;
`;

export const EditContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5vh;
  z-index: 88;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: transparent;
  padding: 10px;

  @media (min-width: ${bp.md}) {
    padding: 10px 20px;
  }

  @media (min-width: ${bp.lg}) {
    padding: 10px 30px;
  }
`;

export const EditButton = styled.button`
  background-color: white;
  /* border: 1px solid green; */
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border: 0.5px solid #f1f1f1;

  &:hover {
    background-color: #f1f1f1;
  }

  &:focus,
  &:active {
    border-color: ${colors.darkPurple};
  }
`;

export const EditContent = styled.div`
  color: gray;
  padding: 5px 0;
`;

export const EditContentItem = styled.div`
  display: flex;
  flex-direction: row;
  /* gap: 5px; */

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

export const ContentItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
`;

export const SidebarMenuContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  transform: translateX(100%);
  transition: transform 0.3s ease-out;
  border-top: 0.3vh solid #fb5d20;
  color: black;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  z-index: 99;

  &.active {
    transform: translateX(0%);
    transition: transform 0.3s ease-in;
  }

  @media (min-width: ${bp.md}) {
    width: 60%;
  }

  @media (min-width: ${bp.lg}) {
    width: 40%;
  }
`;

export const SidebarHeader = styled.div`
  background-color: ${colors.purple};
  color: ${colors.white};
  height: 6.3vh;
  border-top: 0.3vh solid #fb5d20;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  /* gap: 20px; */
  padding: 20px;

  @media (min-width: ${bp.lg}) {
    padding: 20px;
    height: 8.3vh;
  }
`;

export const SidebarHeaderItem = styled.div`
  color: ${colors.white};
  width: 100%;
  display: flex;
  justify-content: center;

  @media (min-width: ${bp.lg}) {
    /* padding: 20px; */
  }
`;

export const CoverLetterTitleContainer = styled.div`
  padding: 8px 16px;
  height: 40px;
  color: white;
  background-color: transparent;
  border-radius: 3px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const CoverLetterTitle = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 5px;
`;

export const SidebarHeaderClose = styled.div`
  color: ${colors.white};
  border: 1px solid white;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
`;

export const SidebarContentContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  gap: 10px;
  overflow-y: auto;
  position: relative;
  padding: 10px 20px;
`;

export const ContentContainer = styled.div`
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  height: 500px;
  padding-top: 20px;
  /* border: 1px solid red; */
  margin-bottom: 100px;

  @media (min-width: ${bp.xs}) {
    width: 350px;
  }
  @media (min-width: ${bp.sm}) {
  }

  @media (min-width: ${bp.md}) {
    min-width: 350px;
    max-width: 600px;
  }

  @media (min-width: ${bp.lg}) {
    width: 100%;
    min-height: 700px;
  }
`;

export const ActionContainer = styled.div`
  padding: 10px;
  height: 8vh;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 0.5px solid gray;
  background-color: white;
`;

export const PreviewEditButton = styled.button`
  padding: 10px;
  border: none;
  background-color: ${colors.purple};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  min-width: 80px;

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

export const PreviewDownloadButton = styled.button`
  padding: 10px;
  border: none;
  background-color: ${colors.purple};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  min-width: 80px;

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

export const CoverLetterListContainer = styled.div`
  border: 0.5px solid gray;
  border-radius: 3px;
`;

export const ListCreateCoverletterButton = styled.div`
  padding: 12px;
  border-bottom: 0.5px solid gray;
`;

export const CoverletterItemContainer = styled.div`
  padding: 12px;
  border-bottom: 0.5px solid gray;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: ${bp.md}) {
    flex-direction: row;
  }
`;

export const CoverletterItem = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2px;
  align-items: center;
  flex: 1;
`;

export const CoverletterButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 2px;
  /* justify-content: space-around; */
  flex: 1;

  @media (min-width: ${bp.md}) {
    justify-content: flex-end;
  }
`;

export const ListTimestampItem = styled.h1`
  font-size: 14px;
  color: gray;
  display: flex;
  align-items: center;
  flex: 1;
`;

export const ListContentItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.darkPurple};
    color: ${colors.white};
  }
`;

export const TimestampContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 0.5px solid gray;
`;

export const TimestampItem = styled.h1`
  font-size: 16px;
  font-weight: bolder;
  color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DeleteMessage = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #ef4444;
  color: white;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  font-size: 10px;

  @media (min-width: ${bp.lg}) {
    font-size: 16px;
    padding: 10px 20px;
  }
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  max-width: calc(50% - 10px);
  height: 300px;
  overflow: hidden;

  @media (min-width: ${bp.sm}) {
    max-width: calc(50%-10px);
    height: 400px;
  }

  @media (min-width: ${bp.md}) {
    max-width: calc(33.33% - 15px);
    width: 250px;
    height: 350px;
  }

  @media (min-width: ${bp.lg}) {
    max-width: calc(25% - 15px);
    height: 300px;
  }

  @media (min-width: ${bp.xl}) {
    max-width: calc(25% - 20px);
    height: 400px;
  }
`;

export const SidebarCoverletterContent = styled.div`
  transform-origin: center top;
  /* box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px; */
  /* border: 1px dashed red;
  height: 400px; */
  transform: scale(1, 0.5);

  @media (min-width: ${bp.xs}) {
    transform: scale(1, 0.45);
  }
  @media (min-width: ${bp.sm}) {
  }

  @media (min-width: ${bp.md}) {
    transform: scale(1, 0.5);
  }

  @media (min-width: ${bp.lg}) {
    transform: scale(1, 0.8);
  }
`;

export const FilenameContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 5px 0;
`;

export const Timestamp = styled.h1`
  font-size: 10px;
  color: gray;
  font-size: 10px;

  @media (min-width: ${bp.sm}) {
    font-size: 12px;
  }

  @media (min-width: ${bp.lg}) {
    font-size: 13px;
  }
`;

export const Filename = styled.h1`
  color: #2e033b;
  font-weight: bolder;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  padding-bottom: 2px;

  &:hover {
    color: ${colors.purple};
  }

  @media (min-width: ${bp.sm}) {
    font-size: 14px;
  }

  @media (min-width: ${bp.lg}) {
    font-size: 16px;
  }
`;

export const FilenameInput = styled.input`
  color: #2e033b;
  font-weight: bolder;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  border: none;
  border-bottom: 1px solid #2e033b;
  background-color: transparent;
  padding-bottom: 2px;

  &:hover {
    color: ${colors.purple};
  }

  &:focus {
    outline: none;
  }

  @media (min-width: ${bp.sm}) {
    font-size: 14px;
  }

  @media (min-width: ${bp.lg}) {
    font-size: 16px;
  }
`;
