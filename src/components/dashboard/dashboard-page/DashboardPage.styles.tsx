import { breakpoints as bp } from '@/utils/layout';
import colors from '@/utils/colors';
import styled from 'styled-components';
import DefaultTemplate from '@/components/templates/resume/defaultTemplate/DefaultTemplate';
import Classic from '@/components/templates/resume/classic/Classic';
import CoverLetterTemplate from '@/components/templates/coverletter/coverletterTemplate/CoverLetterTemplate';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 30px 20px 100px;

  @media (min-width: ${bp.lg}) {
    flex-direction: row;
  }
`;

export const ResumesSectionContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: ${bp.lg}) {
    width: 50%;
  }
`;
export const CoverlettersSectionContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: ${bp.lg}) {
    width: 50%;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;

  @media (min-width: ${bp.lg}) {
    padding-top: 20px;
  }
`;

export const TitleItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 900;
  padding: 10px 20px;
  letter-spacing: 1px;
  color: #2e033b;
`;

export const IconItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 900;
  padding: 10px 20px;
  cursor: pointer;
`;

export const ItemsContainer = styled.h1`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 5px;
`;

export const CardContainer = styled.div`
  display: flex;
  /* justify-content: center;
  align-items: center; */
  flex-direction: column;
  max-width: calc(50% - 10px);
  width: 100%;

  @media (min-width: ${bp.sm}) {
    /* padding: 20px; */
  }

  @media (min-width: ${bp.md}) {
    /* padding: 20px; */
  }

  @media (min-width: ${bp.lg}) {
    max-width: calc(50% - 10px);
  }
`;

export const CardItem = styled.div`
  width: 100%;
  overflow: hidden;
  height: 200px;
  position: relative;
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px,
    rgba(17, 17, 26, 0.1) 0px 0px 8px;
  background-color: white;

  @media (min-width: ${bp.xs}) {
    height: 250px;
    width: 170px;
  }

  @media (min-width: ${bp.sm}) {
    height: 250px;
    width: 200px;
  }

  @media (min-width: ${bp.md}) {
    height: 350px;
    width: 270px;
  }
  @media (min-width: ${bp.lg}) {
    height: 350px;
    width: 250px;
  }
`;

export const ResumeContent = styled.div`
  display: flex;
  justify-content: center;
  transform-origin: left top;
  position: relative;
  top: 0;
  left: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  transform: scale(1, 0.3);

  @media (min-width: ${bp.xs}) {
    transform: scale(0.9, 0.3);
  }

  @media (min-width: ${bp.sm}) {
    transform: scale(1, 0.35);
  }

  @media (min-width: ${bp.md}) {
    transform: scale(1, 0.35);
  }

  @media (min-width: ${bp.lg}) {
    transform: scale(1, 0.3);
  }
`;

export const CoverLetterContent = styled.div`
  display: flex;
  justify-content: center;
  transform-origin: left top;
  position: relative;
  top: 0;
  left: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transform: scale(1, 0.2);

  @media (min-width: ${bp.xs}) {
    transform: scale(1, 0.25);
  }

  @media (min-width: ${bp.sm}) {
    transform: scale(1, 0.35);
  }

  @media (min-width: ${bp.md}) {
    transform: scale(1, 0.35);
  }

  @media (min-width: ${bp.lg}) {
    transform: scale(1, 0.45);
  }
`;

export const CreateButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: calc(50% - 10px);
  width: 100%;
  padding: 10px;

  @media (min-width: ${bp.sm}) {
    padding: 20px;
  }

  @media (min-width: ${bp.md}) {
    padding: 20px;
  }

  @media (min-width: ${bp.lg}) {
    max-width: calc(50% - 10px);
  }
`;

export const CreateButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 11px;
  color: #2e033b;
  border: 1px dashed #2e033b;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  overflow-y: hidden;
  height: 200px;
  background-color: #f8f7ff;

  &:hover {
    color: purple;
  }

  @media (min-width: ${bp.xs}) {
    height: 250px;
    width: 170px;
  }

  @media (min-width: ${bp.sm}) {
    height: 250px;
    width: 200px;
    font-size: 14px;
  }

  @media (min-width: ${bp.md}) {
    height: 350px;
    width: 270px;
  }
  @media (min-width: ${bp.lg}) {
    height: 350px;
    width: 250px;
    font-size: 16px;
  }
`;

export const TimeStampContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 10px 0;
  gap: 10px;

  @media (min-width: ${bp.xs}) {
    width: 170px;
  }

  @media (min-width: ${bp.sm}) {
    width: 200px;
  }

  @media (min-width: ${bp.md}) {
    width: 270px;
    padding: 10px 10px;
  }
`;

// export const Filename = styled.div`
//   color: #2e033b;
//   font-weight: bolder;
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   font-size: 11px;

//   &:hover {
//     color: ${colors.purple};
//   }

//   @media (min-width: ${bp.sm}) {
//     font-size: 14px;
//   }

//   @media (min-width: ${bp.lg}) {
//     font-size: 16px;
//   }
// `;

export const Timestamp = styled.div`
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

export const MiniDefault = styled(Classic)`
  width: 100%;
  height: 100%;
`;

export const MiniCoverLetter = styled(CoverLetterTemplate)`
  width: 100%;
  height: 100%;
`;

export const EditContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: transparent;
  padding: 10px;

  @media (min-width: ${bp.md}) {
    padding: 10px 20px;
  }

  @media (min-width: ${bp.lg}) {
    padding: 10px;
  }
`;

export const EditButton = styled.button`
  background-color: white;
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
export const EditContent = styled.div`
  color: gray;
  padding: 5px 0;
`;

export const EditContentItem = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 16px;

  &:hover {
    background-color: ${colors.darkPurple};
    color: white;
  }
`;

export const ContentItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  cursor: pointer;
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
  }
`;

export const SidebarResumeContent = styled.div`
  transform: scale(0.95, 0.45);
  transform-origin: left top;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

  @media (min-width: ${bp.xs}) {
    transform: scale(1, 0.7);
  }

  @media (min-width: ${bp.md}) {
    transform: scale(1, 0.8);
  }
`;

export const PreviewTitleContainer = styled.div`
  padding: 8px 16px;
  height: 40px;
  font-size: 16px;
  color: white;
  background-color: transparent;
  border-radius: 3px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const PreviewTitle = styled.h1`
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
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  gap: 10px;
  overflow-y: auto;
  position: relative;
`;

export const ContentContainer = styled.div`
  /* box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  scale: 0.9;
  overflow-y: auto;
  height: 100%;
  margin-bottom: 50px;
  width: 100%; */
  padding: 10px 20px;

  @media (min-width: ${bp.lg}) {
    /* scale: 0.7;
    padding: 20px; */
  }

  @media (min-width: ${bp.lg}) {
    /* scale: 1;
    padding: 20px; */
  }
`;

export const ContentContainer1 = styled.div`
  /* box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center; */
  /* transform: scale(0.95, 0.55);

  transform-origin: top;
  top: 0;
  padding-top: 10px; */
  /* width: 100%;
  padding: 10px;
  transform-origin: left top;
  top: 0;
  transform: scale(0.7, 0.7); */
  /* width: 100%;
  display: flex;
  justify-content: center;
  height: 100%; */

  padding: 10px 20px;
  /* border: 1px solid red; */

  @media (min-width: ${bp.lg}) {
    /* transform: scale(0.7, 0.8); */
  }

  @media (min-width: ${bp.lg}) {
    /* transform: scale(0.9); */
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

export const SidebarTimestampContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 10px 0;
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
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

export const ResumesListContainer = styled.div`
  border: 0.5px solid gray;
  border-radius: 3px;
`;

export const ListCreateResumeButton = styled.div`
  padding: 12px;
  border-bottom: 0.5px solid gray;
`;

export const ResumeItemContainer = styled.div`
  padding: 12px;
  border-bottom: 0.5px solid gray;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: ${bp.md}) {
    flex-direction: row;
  }
`;

export const ResumeItem = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2px;
  align-items: center;
  flex: 1;
`;

export const ResumeButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 2px;
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

export const FilenameContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 5px 0;
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
  width: 100%;

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

export const Filename = styled.h1`
  color: #2e033b;
  font-weight: bolder;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  padding-bottom: 2px;
  width: 100%;

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
