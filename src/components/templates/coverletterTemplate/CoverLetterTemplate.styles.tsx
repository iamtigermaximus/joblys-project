import styled from 'styled-components';
import { breakpoints as bp } from '../../../utils/layout';

export const CoverLetterTemplateContainer = styled.div`
  /* display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%; */
  /* border: 3px solid red; */
`;

export const Template = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-height: 500px;
  /* border: 3px solid green; */
  transform-origin: top;
  transform: scale(0.85);

  &.clicked {
    transform: scale(0.7);
    transition: transform 0.3s ease;
  }

  @media (min-width: ${bp.sm}) {
    min-height: 600px;
    transform: scale(0.8);
  }

  @media (min-width: ${bp.md}) {
    width: 600px;
    min-height: 800px;
    transform: scale(0.7);
  }

  @media (min-width: ${bp.lg}) {
    min-height: 800px;
    transform: scale(0.9);
  }
`;