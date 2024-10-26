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
  height: 6vh;
  padding: 10px;

  @media (min-width: ${bp.lg}) {
    height: 8vh;
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
  font-weight: 700;
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;

  @media (min-width: ${bp.lg}) {
    flex-direction: row;
    font-size: 20px;
    letter-spacing: 1px;
    padding: 5px 3px;
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
  padding: 5px;
  border: 1px solid white;
  cursor: pointer;
  color: white;
  background-color: transparent;
  border-radius: 3px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  white-space: nowrap;

  @media (min-width: ${bp.lg}) {
    height: 40px;
    font-size: 16px;
    padding: 8px 16px;
  }
`;

export const ResumeButtonTitle = styled.h1`
  font-size: 13px;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 5px;

  @media (min-width: ${bp.lg}) {
    font-size: 16px;
  }
`;

export const ResumeButtonIcon = styled.span`
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

export const SidebarMenuContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  right: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: white;
  transform: translateX(100%);
  transition: transform 0.3s ease-out;
  border-top: 0.3vh solid #fb5d20;
  color: black;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  z-index: 1;

  &.active {
    transform: translateX(0%);
    transition: transform 0.3s ease-in;
  }

  @media (min-width: ${bp.md}) {
    width: 50%;
  }

  @media (min-width: ${bp.lg}) {
    width: 40%;
  }
`;

export const SidebarHeader = styled.div`
  background-color: ${colors.purple};
  color: ${colors.white};
  height: 6.3vh;
  border-top: 0.3vh solid #fb5d20;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 20px;

  @media (min-width: ${bp.lg}) {
    padding: 20px;
    height: 8.3vh;
  }
`;

export const SidebarHeaderItem = styled.div`
  color: ${colors.white};
  width: 100%;
  display: flex;
  justify-content: center;

  @media (min-width: ${bp.lg}) {
  }
`;

export const SidebarHeaderClose = styled.div`
  color: ${colors.white};
  border: 1px solid white;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 700;
`;

export const SidebarContentContainer = styled.div`
  padding: 20px 40px;
  height: 100%;
`;

export const Input = styled.input`
  padding: 12px;
  border-radius: 5px;
  width: 100%;
  border: none;
  background-color: #f5f5f5;
`;

export const Label = styled.label`
  padding: 3px 0;
  color: black;
  font-size: 10px;
  display: flex;
  justify-content: flex-start;

  @media (min-width: ${bp.lg}) {
    font-size: 13px;
  }
`;

export const TextContainer = styled.div`
  padding: 20px 0;
  display: flex;
  justify-content: flex-start;
`;

export const SidebarText = styled.p`
  font-size: 15px;
  color: black;
  font-weight: 700;

  @media (min-width: ${bp.lg}) {
    font-size: 20px;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-bottom: 20px;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  justify-content: center;
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  background-color: ${colors.purple};
  color: ${colors.white};
  padding: 8px 12px;
  border-radius: 5px;
  font-size: 10px;

  @media (min-width: ${bp.lg}) {
    font-size: 13px;
  }
`;
export const SeparatorContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
`;

export const HorizontalLine = styled.div`
  border-top: 0.5px solid gray;
  width: 100%;
`;

export const ProvidersContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 0 50px;
`;

export const Provider = styled.div`
  width: 100%;
`;

export const ProviderButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 5px;
  font-size: 10px;
  padding: 12px;
  border: 0.5px solid gray;
  background-color: ${colors.white};

  @media (min-width: ${bp.lg}) {
    font-size: 15px;
  }
`;

export const ProviderIcon = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  padding: 0 10px;
  font-size: 15px;
`;

export const StyledSelect = styled.select`
  appearance: none;
  background-color: transparent;
  color: white;
  border: 1px solid white;
  cursor: pointer;
  padding: 4px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:focus {
    outline: none;
    border: 1px solid white;
  }
`;

export const StyledOption = styled.option`
  background-color: transparent;

  &:focus {
    outline: none;
    border: 1px solid #520668;
  }
`;
