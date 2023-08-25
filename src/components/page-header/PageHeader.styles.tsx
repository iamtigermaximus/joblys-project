'use client';

import Link from 'next/link';
import { breakpoints as bp } from '../../utils/layout';
import styled from 'styled-components';

export const Header = styled.div`
  width: 100%;
  height: 10vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* background-image: url('/header.svg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center; */
`;

export const HeaderMenuContainer = styled.div`
  display: flex;
  padding: 0 20px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  line-height: 3em;
  font-style: italic;
`;

export const SignInButton = styled.button`
  margin: 0 2px;
  padding: 5px;
  white-space: nowrap;
  background-color: transparent;
  border-radius: 10px;
  border: none;
  border-radius: 65px;
  background: linear-gradient(225deg, #a6aed4, #c5cffd);
  box-shadow: -28px 28px 56px #4a4d5e, 28px -28px 56px, #a6aed4;

  @media (min-width: ${bp.lg}) {
    width: 100px;
    letter-spacing: 1px;
  }
`;

export const SignInLink = styled(Link)`
  display: flex;
  justify-content: center;
  text-decoration: none;
  color: #232946;
  font-weight: 700;

  @media (min-width: ${bp.lg}) {
    width: 100%;
    flex-direction: column;
    font-size: 13px;
    letter-spacing: 1px;
  }
`;

export const RegisterButton = styled.button`
  margin: 0 2px;
  padding: 5px;
  white-space: nowrap;
  background-color: #232946;
  border-radius: 10px;
  border: none;

  @media (min-width: ${bp.lg}) {
    width: 150px;
    letter-spacing: 1px;
  }
`;

export const RegisterLink = styled(Link)`
  display: flex;
  justify-content: center;
  text-decoration: none;
  color: white;

  @media (min-width: ${bp.lg}) {
    width: 100%;
    flex-direction: column;
    font-size: 13px;
    letter-spacing: 1px;
  }
`;

export const MenuLinkButton = styled.button`
  /* margin: 0 5px; */
  padding: 5px 10px;
  white-space: nowrap;
  background-color: transparent;
  border-radius: 10px;
  border: none;

  &:hover {
    background: #232946;
    border: 1px solid #b8c1ec;
    color: white;
  }

  @media (min-width: ${bp.lg}) {
    width: 100%;
    letter-spacing: 1px;
  }
`;

export const MenuLink = styled(Link)`
  display: flex;
  justify-content: center;
  text-decoration: none;
  color: #232946;
  font-weight: 700;

  &:hover {
    color: white;
  }

  @media (min-width: ${bp.lg}) {
    width: 100%;
    flex-direction: column;
    font-size: 13px;
    letter-spacing: 1px;
  }
`;
