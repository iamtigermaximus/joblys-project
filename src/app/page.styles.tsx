'use client';

import Link from 'next/link';
import { breakpoints as bp } from '../utils/layout';
import styled from 'styled-components';

export const Container = styled.div`
  width: 80vw;
  height: 100vh;
  float: left;
  display: flex;
  flex-direction: column;
`;

export const BoxContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  background-color: #b8c1ec;
`;

export const Box = styled.div`
  width: 50%;
  height: 100%;
  position: relative;
  padding: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const Box2 = styled.div`
  width: 50%;
  height: 100%;
  position: relative;
  padding: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-image: url('/blobanimation.svg');
  /* background-size: cover; */
  background-repeat: no-repeat;
  background-position: center;
  /* object-fit: fill; */
`;

export const BoxHeader = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const GetStartedButton = styled.button`
  margin: 0 2px;
  padding: 10px 20px;
  white-space: nowrap;
  background-color: #232946;
  border-radius: 10px;
  border: none;
  color: white;

  @media (min-width: ${bp.lg}) {
    width: 150px;
    letter-spacing: 1px;
  }
`;
