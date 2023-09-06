'use client';

import styled from 'styled-components';
import { breakpoints as bp } from '../../utils/layout';
import Link from 'next/link';

export const NavbarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #232946;
  color: white;
  float: left;
  padding: 20px;
  height: 100%;

  @media (min-width: ${bp.lg}) {
    width: 20vw;
    flex-direction: column;
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

  @media (min-width: ${bp.lg}) {
    width: 100%;
    flex-direction: column;
    font-size: 30px;
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

export const SignInItemsContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  @media (min-width: ${bp.lg}) {
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
