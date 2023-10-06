'use client';

import { breakpoints as bp } from '../../utils/layout';
import colors from '../../utils/colors';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 50px;
  overflow-y: scroll;

  @media (min-width: ${bp.lg}) {
    padding: 50px 100px;
  }
`;

export const HeaderContainer = styled.div`
  width: 100%;
`;

export const HeaderTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  padding: 40px;
  border-radius: 8px;
  background-color: ${colors.white};
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

export const HeadingTexts = styled.h1`
  color: ${colors.purple};
  margin: 5px 0;
`;

export const HeadingSubTexts = styled.p`
  line-height: 1.5;
  letter-spacing: 1px;
  text-align: justify;
  margin: 5px 0;
`;

export const ActivitySection = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};
  border-radius: 8px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  margin: 30px 0 30px;
`;

export const JobSearchSection = styled.div`
  padding: 40px;
`;

export const RecentActivitySection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 40px 40px;
`;

export const RecentActivityTitle = styled.h4`
  margin: 0 0 20px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 0 20px;
`;

export const ActivitiesContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ActivityContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 2px solid ${colors.ashGray};
  padding: 10px;
  margin: 5px 0;
  font-size: 18px;
  font-weight: 700;
`;

export const Button = styled.button`
  background-color: ${colors.blueGray};
  color: ${colors.white};
  border-radius: 3px;
  padding: 5px;
  margin-right: 10px;
  width: 100px;
  height: 40px;
  border: none;
  letter-spacing: 1px;
`;

export const ReviewButton = styled.button`
  background-color: ${colors.orange};
  color: ${colors.white};
  border-radius: 3px;
  padding: 10px;
  width: 100px;
  border: none;
  letter-spacing: 1px;
`;
