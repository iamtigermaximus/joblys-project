'use client';

import Link from 'next/link';
import { breakpoints as bp } from '../../utils/layout';
import styled from 'styled-components';
import colors from '../../utils/colors';

export const SignInButton = styled.button`
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: green;
  border-radius: 5px;
  padding: 5px;
  border: none;
  margin: 5px;
  color: white;
`;

// export const SignOutButton = styled.button`
//   width: 100px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background-color: purple;
//   border-radius: 5px;
//   padding: 5px;
//   border: none;
//   margin: 5px;
//   color: white;
// `;

export const LogOutButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  background-color: ${colors.orange};
  color: ${colors.offWhite};
  border-radius: 5px;
  padding: 0 10px;
  width: 100px;
  font-weight: 700;
  height: 40px;

  @media (min-width: ${bp.lg}) {
    flex-direction: column;
    font-size: 15px;
    letter-spacing: 1px;
  }
`;

export const RegButton = styled.button`
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: pink;
  border-radius: 5px;
  padding: 5px;
  border: none;
  margin: 5px;
  color: white;
`;

export const ProfButton = styled.button`
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: orange;
  border-radius: 5px;
  padding: 5px;
  border: none;
  margin: 5px;
  color: white;
`;
