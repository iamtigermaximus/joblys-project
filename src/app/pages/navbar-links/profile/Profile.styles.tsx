'use client';

//import { breakpoints as bp } from '../utils/layout';
import styled from 'styled-components';

export const Container = styled.div`
  width: 80vw;
  height: 100vh;
  float: left;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #b8c1ec;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  height: 10vh;
  /* border: 1px solid red; */
  margin: 0 5px;
  font-size: 30px;
`;
