import DefaultTemplate from './DefaultTemplate';
import styled from 'styled-components';
import { breakpoints as bp } from '../../../utils/layout';
import colors from '../../../utils/colors';

export const ResumeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding-bottom: 100px;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const ResumeCard = styled.div`
  flex: 1 1 calc(50% - 10px);
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
    height: 300px;
  }
`;

export const ResumeContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  transform-origin: top;
  position: relative;
  top: 0;
  left: 0;
  transform: scale(0.95, 0.35);

  /* width: 100%; */
  /* scale: 0.6; */
  /* 
  /* @media (min-width: ${bp.sm}) {
    scale: 0.9;
  } */

  @media (min-width: ${bp.md}) {
    transform: scale(0.95, 0.35);
  }

  @media (min-width: ${bp.lg}) {
    transform: scale(1, 0.25);
  }

  @media (min-width: ${bp.xl}) {
    transform: scale(0.9, 0.35);
  }
`;

export const CreateResumeButton = styled.div`
  flex: 1 1 calc(50% - 10px);
  max-width: calc(50%-10px);
  height: 250px;
  /* min-width: 150px; */
  border: 1px solid #ccc;
  overflow: hidden;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;

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
    height: 300px;
  }
`;

export const ButtonLabel = styled.h1`
  font-size: 16px;
  color: #b0b0b0;

  &:hover {
    color: #520668;
  }
`;

export const MiniDefault = styled(DefaultTemplate)`
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
  /* z-index: 88; */
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
    width: 50%;
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
  gap: 20px;
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

export const ResumeButton = styled.button`
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

export const ResumeButtonTitle = styled.h1`
  font-size: 16px;
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

  padding-bottom: 50px;
  overflow-y: auto;
`;

export const ContentContainer = styled.div`
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transform: scale(0.95, 0.55);

  transform-origin: top;
  top: 0;
  padding-top: 10px;

  @media (min-width: ${bp.lg}) {
    transform: scale(0.7, 0.8);
  }

  @media (min-width: ${bp.lg}) {
    transform: scale(0.9);
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
  border: 0.5px solid gray;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: transparent;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
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

  &:hover {
    background-color: ${colors.darkPurple};
  }
`;
