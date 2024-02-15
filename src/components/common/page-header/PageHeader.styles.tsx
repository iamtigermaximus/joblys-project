'use client';

import Link from 'next/link';
import { breakpoints as bp } from '../../../utils/layout';
import styled from 'styled-components';
import colors from '../../../utils/colors';

export const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${colors.white};
  /* height: 100px; */
  padding: 5px;

  @media (min-width: ${bp.lg}) {
    height: 10vh;
  }
`;

export const HeaderMenuContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  @media (min-width: ${bp.lg}) {
    padding: 20px;
  }
`;

export const LeftContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-left: 10px;

  @media (min-width: ${bp.lg}) {
    padding: 20px 0;
  }
`;

export const RightContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10px;
  gap: 5px;

  @media (min-width: ${bp.lg}) {
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
  cursor: pointer;

  &:hover {
    background-color: ${colors.darkPurple};
    color: ${colors.white};
  }

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
  cursor: pointer;

  &:hover {
    background-color: ${colors.purple};
    color: ${colors.white};
    border: 1px solid white;
  }
`;

export const ResumeButton = styled.button`
  /* Common button styles go here */
  padding: 8px 16px;
  height: 40px;
  font-size: 16px;
  border: 1px solid white;
  cursor: pointer;
  color: white;
  background-color: transparent;
  border-radius: 3px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const ResumeButtonTitle = styled.h1`
  font-size: 16px;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 5px;
`;

export const ResumeButtonIcon = styled.span`
  /* Common button styles go here */
  font-size: 16px;
  color: white;
  display: flex;
  align-items: center;
`;

export const UserModal = styled.div`
  position: fixed;
  top: 10%;
  right: 0;
  transform: translate(-10%, -10%);
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  z-index: 9999;
  width: 150px;
`;

export const ModalContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  white-space: nowrap;
  margin-left: 20px;
`;

export const ModalItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  white-space: nowrap;
  flex-direction: row;
  gap: 10px;
  padding: 5px 10px;
  font-size: 16px;

  &:hover {
    background-color: ${colors.darkPurple};
    color: ${colors.white};
    border-radius: 5px;
  }
`;
