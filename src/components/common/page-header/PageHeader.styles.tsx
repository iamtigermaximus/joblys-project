'use client';

import Link from 'next/link';
import { breakpoints as bp } from '../../../utils/layout';
import styled from 'styled-components';
import colors from '../../../utils/colors';

export const Header = styled.div`
  width: 100%;
  height: 10vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${colors.white};
`;

export const HeaderMenuContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  @media (min-width: ${bp.lg}) {
    padding: 0 20px;
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
  font-size: 11px;

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

export const WelcomeTextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  max-width: 300px;
  margin: 0 5px;
  font-weight: 700;
  height: 50px;
  white-space: nowrap;

  @media (min-width: ${bp.lg}) {
    flex-direction: column;
    font-size: 15px;
    letter-spacing: 1px;
  }
`;

export const LogoutButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  background-color: ${colors.blueGray};
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

export const SignInButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  background-color: ${colors.blueGray};
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

export const HeaderLinksContainer = styled.div`
  color: black;
  /* border: 1px solid red; */
  font-weight: 700;
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 3px;

  @media (min-width: ${bp.lg}) {
    flex-direction: row;
    font-size: 20px;
    letter-spacing: 1px;
  }
`;

export const IconContainer = styled.div`
  background-color: ${colors.orange};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  text-decoration: none;
  border-radius: 50%;
`;
