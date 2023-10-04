'use client';

import { breakpoints as bp } from '../../utils/layout';
import colors from '../../utils/colors';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  padding: 50px;
  height: 100%;

  overflow-y: scroll;

  @media (min-width: ${bp.lg}) {
    padding: 50px 100px;
  }
`;

export const HeaderContainer = styled.div`
  width: 100%;
  /* border: 1px solid red; */
  display: flex;
`;

export const HeaderTextContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 40px;
  background-color: ${colors.white};
  border-radius: 8px;
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
  /* border: 2px solid green; */
`;

export const JobSearchSection = styled.div`
  /* border: 1px solid green; */
  padding: 40px;
`;

// export const RecentSearchesSection = styled.div`
//   width: 100%;
//   height: 200px;
//   /* border: 1px solid red; */
//   display: flex;
//   flex-direction: column;
//   margin-top: 10px;
//   background-color: white;
//   border-radius: 10px;
//   padding: 20px;
// `;

export const RecentActivitySection = styled.div`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  padding: 0 40px 40px;
`;

export const RecentActivityTitle = styled.h4`
  margin: 0 0 20px;
`;

export const ButtonsContainer = styled.div`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: row;
  margin: 0 0 20px;
`;

export const ActivitiesContainer = styled.div`
  /* border: 1px solid green; */
  display: flex;
  flex-direction: column;
`;

export const ActivityContainer = styled.div`
  border: 2px solid ${colors.ashGray};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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

export const RecentSearchContainer = styled.div`
  border: 1px solid #d3d3d3;
  margin-right: 10px;
  width: 100%;
  border-radius: 10px;
  padding: 10px 20px;
  margin: 5px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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
