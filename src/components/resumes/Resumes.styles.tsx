'use client';

import { breakpoints as bp } from '../../utils/layout';
import colors from '../../utils/colors';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  padding: 30px 20px;

  @media (min-width: ${bp.lg}) {
  }
`;

/** New CSS */

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  /* border: 1px solid gray; */
  padding-bottom: 20px;
`;

export const PageName = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: black;
`;

export const CreateResumeButton = styled.button`
  border: 1px dashed gray;
  width: 250px;
  height: 350px;
  border-radius: 5px;
`;

export const ResumeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 20px;
`;

export const ResumeCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 250px;
  height: 350px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
