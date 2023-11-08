'use client';

import Link from 'next/link';
import { breakpoints as bp } from '../../../utils/layout';
import styled from 'styled-components';
import colors from '../../../utils/colors';

export const Container = styled.div`
  width: 100%;
  height: 10vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${colors.offWhite};
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

export const MenuContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  @media (min-width: ${bp.lg}) {
    padding: 0 20px;
  }
`;

export const BrandContainer = styled.div`
  letter-spacing: 1px;
  width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;

export const Brand = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: ${colors.white};
  /* font-size: 30px; */
  padding: 0 10px;
  width: 100%;

  @media (min-width: ${bp.lg}) {
    flex-direction: column;
    letter-spacing: 1px;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 20px;
`;

export const LoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  background-color: ${colors.offWhite};
  color: ${colors.darkPurple};
  border-radius: 5px;
  border: 1px solid ${colors.blueGray};
  padding: 5px;
  width: 60px;
  font-weight: 700;
  margin-right: 5px;

  @media (min-width: ${bp.md}) {
    width: 100px;
    padding: 0 10px;
    height: 40px;
  }
`;

export const SignupButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  background-color: ${colors.purple};
  color: ${colors.offWhite};
  border-radius: 5px;
  border: none;
  padding: 5px;
  width: 60px;
  font-weight: 700;
  margin-right: 5px;
  white-space: nowrap;

  @media (min-width: ${bp.md}) {
    width: 100px;
    padding: 0 10px;
    height: 40px;
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
  margin: 0 10px;

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
