'use client';

//import { breakpoints as bp } from '../utils/layout';
import styled from 'styled-components';
import colors from '@/utils/colors';

export const Container = styled.div`
  width: 80vw;
  float: left;
  display: flex;
  height: 100vh;
  background-color: ${colors.lightBlue};

  /* display: flex;
  justify-content: center;
  align-items: center; */
  flex-direction: column;
  /* background-color: #b8c1ec; */
  /* padding: 0 100px; */
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  height: 10vh;
  /* border: 1px solid red; */
  margin: 0 5px;
  font-size: 30px;
`;
