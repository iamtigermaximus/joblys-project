'use client';

import { breakpoints as bp } from '../../../utils/layout';
import colors from '../../../utils/colors';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 30px;
  overflow-y: scroll;

  @media (min-width: ${bp.md}) {
    padding: 50px;
  }

  @media (min-width: ${bp.lg}) {
    padding: 50px 100px;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PageTitle = styled.div`
  font-size: 18px;
  color: ${colors.blueGray};
  margin-bottom: 10px;

  @media (min-width: ${bp.md}) {
    font-size: 20px;
  }

  @media (min-width: ${bp.lg}) {
    font-size: 25px;
  }
`;

export const CreateProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${colors.white};
  border-radius: 8px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  width: 100%;
  border-radius: 5px;
  /* margin: 30px 0 30px; */
  padding: 10px 20px;

  @media (min-width: ${bp.md}) {
    flex-direction: row;
    margin: 30px 0 30px;
  }

  @media (min-width: ${bp.lg}) {
    flex-direction: row;
    margin: 30px 0 30px;
  }
`;
