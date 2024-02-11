'use client';

import styled from 'styled-components';
import { breakpoints as bp } from '../../utils/layout';
import colors from '../../utils/colors';
import Link from 'next/link';

export const NavbarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${colors.purple};
  color: ${colors.white};
  height: 10vh;
  width: 100%;

  @media (min-width: ${bp.lg}) {
    flex-direction: column;
    align-items: center;
    width: 20vw;
    height: 100vh;
    float: left;
  }
`;

export const NavbarItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* align-items: center; */
  /* justify-content: center; */
  height: 100%;
`;

export const BrandContainer = styled.div`
  padding: 5px;
  letter-spacing: 1px;
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: ${bp.lg}) {
    margin: 20px 0;
  }
`;

export const Brand = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: ${colors.white};
  font-size: 30px;
  width: 100%;

  @media (min-width: ${bp.lg}) {
    flex-direction: column;
    letter-spacing: 1px;
  }
`;

export const MenuContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 20px;

  @media (min-width: ${bp.lg}) {
    flex-direction: column;
  }
`;

export const MenuItemContainer = styled(Link)`
  display: none;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 20px;
  white-space: nowrap;
  background-color: ${colors.purple};
  text-decoration: none;

  &:hover {
    background-color: ${colors.darkPurple};
    color: ${colors.white};
  }

  &.active {
    background-color: ${colors.darkPurple};
    color: ${colors.white};
  }

  @media (min-width: ${bp.lg}) {
    display: flex;
    width: 100%;
    font-size: 20px;
    letter-spacing: 1px;
  }
`;

export const MenuItem = styled.div`
  display: none;
  justify-content: flex-start;
  color: ${colors.white};
  /* padding-left: 10px; */
  font-weight: 700;

  @media (min-width: ${bp.lg}) {
    display: flex;
    min-width: 150px;
    flex-direction: row;
    font-size: 15px;
    letter-spacing: 1px;
    overflow: hidden; /* Hide overflowing content */
    text-overflow: ellipsis; /* Display ellipses for overflowing content */
    white-space: nowrap;
    gap: 5px;
    padding: 0 10px;
  }
`;

export const MenuItemLogin = styled.div`
  display: none;
  justify-content: flex-start;
  color: ${colors.white};
  font-weight: 700;

  @media (min-width: ${bp.lg}) {
    display: flex;
    width: 100%;
    flex-direction: row;
    font-size: 15px;
    overflow: hidden; /* Hide overflowing content */
    text-overflow: ellipsis; /* Display ellipses for overflowing content */
    white-space: nowrap;
    gap: 5px;
  }
`;

export const MenuItemIcon = styled.div`
  display: none;
  color: ${colors.white};
  padding-left: 10px;
  font-weight: 700;

  @media (min-width: ${bp.lg}) {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
  }
`;

export const SignInItemsContainer = styled.div`
  display: none;

  @media (min-width: ${bp.lg}) {
    display: flex;
    justify-content: flex-end;
    height: 100vh;
    width: 100%;
    flex-direction: column;
  }
`;

export const SignInContainer = styled.div`
  margin: 20px 0;
  padding: 5px;
  white-space: nowrap;

  @media (min-width: ${bp.lg}) {
    width: 150px;
    font-size: 20px;
    letter-spacing: 1px;
  }
`;

export const SignIn = styled(Link)`
  display: flex;
  justify-content: center;
  text-decoration: none;
  color: ${colors.white};

  @media (min-width: ${bp.lg}) {
    width: 100%;
    flex-direction: column;
    font-size: 15px;
    letter-spacing: 1px;
  }
`;

export const SignOut = styled(Link)`
  display: flex;
  justify-content: center;
  text-decoration: none;
  color: ${colors.white};

  @media (min-width: ${bp.lg}) {
    width: 100%;
    flex-direction: column;
    font-size: 15px;
    letter-spacing: 1px;
  }
`;

/**
 ** NEW CODES
 */

export const MobileMenuContainer = styled.ul`
  position: absolute;
  display: flex;
  flex-direction: column;
  left: 0;
  top: 10vh;
  width: 100%;
  height: 100vh;
  background-color: ${colors.purple};
  transform: translateX(0%);
  transition: transform 0.3s ease-out;
  z-index: 1;

  &.active {
    transform: translateX(-100%);
    transition: transform 0.3s ease-in;
  }

  @media (min-width: ${bp.lg}) {
    display: none;
  }
`;

export const BurgerMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  color: ${colors.white};
  font-size: 30px;
  padding: 0 20px;

  @media (min-width: ${bp.lg}) {
    display: none;
  }
`;

export const MobileMenuItem = styled(Link)`
  display: flex;
  justify-content: center;
  text-decoration: none;
  color: ${colors.white};
  font-size: 16px;

  @media (min-width: ${bp.lg}) {
    display: none;
  }
`;

export const MobileSignInItemsContainer = styled.div`
  display: flex;
  justify-content: center;
  font-size: 16px;
  margin: 20px 0;
  padding: 5px;
  white-space: nowrap;

  @media (min-width: ${bp.lg}) {
    display: none;
  }
`;

export const MobileSignInContainer = styled.div`
  white-space: nowrap;
  letter-spacing: 1px;
`;

export const MobileSignIn = styled(Link)`
  display: flex;
  justify-content: center;
  text-decoration: none;
  color: ${colors.white};
  flex-direction: column;
  font-size: 15px;
  letter-spacing: 1px;
`;

export const MobileSignOut = styled(Link)`
  display: flex;
  justify-content: center;
  text-decoration: none;
  color: ${colors.white};

  @media (min-width: ${bp.lg}) {
    width: 100%;
    flex-direction: column;
    font-size: 15px;
    letter-spacing: 1px;
  }
`;

export const MobileMenuItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 20px;
  white-space: nowrap;

  @media (min-width: ${bp.lg}) {
    width: 100%;
    font-size: 20px;
    letter-spacing: 1px;
  }
`;

export const MobileLogoutButton = styled.div`
  display: flex;
  justify-content: center;
  text-decoration: none;
  color: ${colors.white};
  font-size: 16px;

  @media (min-width: ${bp.lg}) {
    display: none;
  }
`;

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const LoginContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  padding: 0 20px;
  height: 100%;
  margin-bottom: 20px;

  @media (min-width: ${bp.lg}) {
    flex-direction: column;
  }
`;
