'use client';

import { breakpoints as bp } from '../../../utils/layout';
import colors from '../../../utils/colors';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const RecentActivitySection = styled.div`
  padding: 20px;

  @media (min-width: ${bp.lg}) {
    padding: 40px;
  }
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
