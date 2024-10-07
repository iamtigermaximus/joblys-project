'use client';

import { breakpoints as bp } from '../../utils/layout';
import colors from '../../utils/colors';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  padding: 30px 20px;

  @media (min-width: ${bp.lg}) {
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-bottom: 20px;
`;

export const PageName = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: #2e033b;
`;

export const CreateCoverLetterButton = styled.button`
  border: 1px dashed gray;
  width: 100%;
  height: 250px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  max-width: calc(50% - 10px);

  &:hover {
    color: #520668;
    border: 1px dashed #520668;
  }
  @media (min-width: ${bp.sm}) {
    height: 350px;
  }

  @media (min-width: ${bp.md}) {
    max-width: calc(25% - 20px);
    height: 300px;
  }

  @media (min-width: ${bp.lg}) {
    height: 350px;
  }
`;

export const ButtonLabel = styled.h1`
  font-size: 16px;
  color: #b0b0b0;

  &:hover {
    color: #520668;
  }
`;

export const CoverLetterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding-bottom: 100px;
  align-items: flex-start;
  width: 100%;
`;

export const CoverLetterCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  height: 250px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: calc(50% - 10px);

  @media (min-width: ${bp.sm}) {
    height: 350px;
  }

  @media (min-width: ${bp.md}) {
    max-width: calc(25% - 20px);
    height: 300px;
  }

  @media (min-width: ${bp.lg}) {
    height: 350px;
  }
`;

export const ViewModeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
`;

export const ViewModes = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  font-size: 20px;
`;

export const ViewMode = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  font-size: 20px;
  background-color: ${props => (props.active ? '#520668' : 'transparent')};
  color: ${props => (props.active ? '#fff' : '#000')};
  cursor: pointer;
  border-radius: 3px;

  &:hover {
    background-color: ${props => (props.active ? '#520668' : '#f0f0f0')};
  }
`;
