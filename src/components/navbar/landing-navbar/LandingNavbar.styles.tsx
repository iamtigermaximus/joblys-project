'use client';

// import Link from 'next/link';
import { breakpoints as bp } from '../../../utils/layout';
import styled from 'styled-components';
import colors from '../../../utils/colors';
import Image from 'next/image';

export const Container = styled.div`
  width: 100%;
  height: 10vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: transparent;
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

export const Brand = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-decoration: none;
  color: ${colors.white};
  /* font-size: 30px; */
  width: 100%;

  @media (min-width: ${bp.lg}) {
    flex-direction: column;
    letter-spacing: 1px;
    padding: 0 10px;
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
  background-color: transparent;
  color: ${colors.darkPurple};
  border-radius: 5px;
  border: 1px solid ${colors.purple};
  padding: 5px;
  width: 60px;
  font-weight: 700;
  margin-right: 5px;
  white-space: nowrap;
  height: 30px;
  cursor: pointer;
  font-family: SuisseIntl, sans-serif;
  line-height: 24px;

  &:hover {
    background-color: ${colors.darkPurple};
    color: ${colors.white};
  }

  @media (min-width: ${bp.md}) {
    width: 100px;
    padding: 0 10px;
    height: 40px;
  }
`;

export const GetStartedButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  background-color: ${colors.purple};
  color: ${colors.offWhite};
  border-radius: 5px;
  border: none;
  padding: 5px;
  width: 100%;
  font-weight: 700;
  margin-right: 5px;
  white-space: nowrap;
  height: 30px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.darkPurple};
    color: ${colors.white};
  }

  @media (min-width: ${bp.md}) {
    width: 100px;
    padding: 0 10px;
    height: 40px;
  }
`;

export const LogoContainer = styled.div`
  width: 200px;
  height: 200px;
`;

export const LogoImageContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100px;
  height: 30px;

  @media (min-width: ${bp.lg}) {
    width: 160px;
    height: 40px;
  }
`;

export const LogoImage = styled(Image)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const StyledSelect = styled.select`
  appearance: none;
  background-color: transparent;
  color: #000;
  border: 1px solid #ccc;
  cursor: pointer;
  padding: 4px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:focus {
    outline: none;
    border: 1px solid #520668;
  }
`;

export const StyledOption = styled.option`
  background-color: transparent;

  &:focus {
    outline: none;
    border: 1px solid #520668;
  }
`;
