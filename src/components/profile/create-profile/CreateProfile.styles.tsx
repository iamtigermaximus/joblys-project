'use client';

import { breakpoints as bp } from '../../../utils/layout';
import colors from '../../../utils/colors';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  padding: 50px;
  overflow-y: scroll;

  @media (min-width: ${bp.lg}) {
    padding: 50px 200px;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PageTitle = styled.div`
  font-size: 25px;
  color: ${colors.blueGray};
`;

export const CreateProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${colors.white};
  border-radius: 8px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  margin: 30px 0 30px;
  width: 100%;
  border-radius: 5px;
`;
