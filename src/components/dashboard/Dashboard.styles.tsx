'use client';

import { breakpoints as bp } from '@/utils/layout';
import colors from '../../utils/colors';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (min-width: ${bp.lg}) {
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding-bottom: 20px;
`;

export const PageName = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: black;
`;

export const HeaderTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 20px;
  border-radius: 8px;
  background-color: ${colors.white};
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);

  @media (min-width: ${bp.lg}) {
    width: 50%;
    padding: 40px;
  }
`;

export const HeadingTexts = styled.h1`
  color: ${colors.purple};
  margin: 5px 0;
  font-size: 16px;

  @media (min-width: ${bp.lg}) {
    font-size: 30px;
  }
`;

export const HeadingSubTexts = styled.p`
  text-align: justify;
  margin: 5px 0;
  font-size: 13px;

  @media (min-width: ${bp.lg}) {
    font-size: 16px;
  }
`;

export const ActivitySection = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};
  border-radius: 8px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  margin: 30px 0 30px;
`;
