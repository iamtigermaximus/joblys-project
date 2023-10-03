'use client';

import styled from 'styled-components';
import { breakpoints as bp } from '../../utils/layout';
import Link from 'next/link';
import colors from '../../utils/colors';

export const NavbarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${colors.purple};
  color: ${colors.white};
  float: left;
  padding: 20px;
  height: 100vh;

  @media (min-width: ${bp.lg}) {
    width: 20vw;
    flex-direction: column;
  }
`;

export const NavbarContainer2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: #520668;
  color: white;
  padding: 20px;
  height: 10vh;
  width: 100%;

  @media (min-width: ${bp.lg}) {
    width: 20vw;
    height: 100vh;
    flex-direction: column;
    align-items: center;

    float: left;
  }
`;

export const NavbarItemsContainer = styled.div`
  display: flex;
  /* padding: 20px 0; */

  @media (min-width: ${bp.lg}) {
    height: 100vh;
    width: 100%;
    flex-direction: column;
  }
`;

export const BrandContainer = styled.div`
  margin: 20px 0;
  padding: 5px;

  @media (min-width: ${bp.lg}) {
    width: 150px;
    letter-spacing: 1px;
  }
`;

export const Brand = styled(Link)`
  display: flex;
  justify-content: center;
  text-decoration: none;
  color: white;
  font-size: 30px;

  @media (min-width: ${bp.lg}) {
    width: 100%;
    flex-direction: column;
    letter-spacing: 1px;
  }
`;

export const MenuContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: ${bp.lg}) {
    width: 100%;
    flex-direction: column;
  }
`;

export const MenuItemContainer = styled.div`
  margin: 20px 0;
  padding: 5px;
  white-space: nowrap;

  @media (min-width: ${bp.lg}) {
    width: 150px;
    font-size: 20px;
    letter-spacing: 1px;
  }
`;

export const MenuItem = styled(Link)`
  display: none;
  justify-content: center;
  text-decoration: none;
  color: white;

  @media (min-width: ${bp.lg}) {
    display: flex;

    width: 100%;
    flex-direction: column;
    font-size: 15px;
    letter-spacing: 1px;
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
  color: white;

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
  color: white;

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
  background: #232946;
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
  color: white;
  font-size: 30px;

  @media (min-width: ${bp.lg}) {
    display: none;
  }
`;

export const MobileMenuItem = styled(Link)`
  display: flex;
  justify-content: center;
  text-decoration: none;
  color: white;
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
  color: white;
  flex-direction: column;
  font-size: 15px;
  letter-spacing: 1px;
`;

export const MobileSignOut = styled(Link)`
  display: flex;
  justify-content: center;
  text-decoration: none;
  color: white;

  @media (min-width: ${bp.lg}) {
    width: 100%;
    flex-direction: column;
    font-size: 15px;
    letter-spacing: 1px;
  }
`;

export const MobileMenuItemContainer = styled.div`
  margin: 20px 0;
  padding: 5px;
  white-space: nowrap;

  @media (min-width: ${bp.lg}) {
    width: 150px;
    font-size: 20px;
    letter-spacing: 1px;
  }
`;
