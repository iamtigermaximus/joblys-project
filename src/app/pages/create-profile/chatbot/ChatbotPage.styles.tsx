'use client';

import { breakpoints as bp } from '../../../../utils/layout';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  float: left;
  display: flex;
  flex-direction: column;
  background-color: #b8c1ec;
  padding: 10px;

  @media (min-width: ${bp.md}) {
    width: 80vw;
  }
`;
