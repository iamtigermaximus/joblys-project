'use client';

import styled from 'styled-components';
import { breakpoints as bp } from '../../utils/layout';
import colors from '../../utils/colors';
import Link from 'next/link';

export const NavbarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${colors.purple};
  color: ${colors.white};
  height: 10vh;
  width: 100%;

  @media (min-width: ${bp.lg}) {
    flex-direction: column;

    width: 20vw;
    height: 100vh;
    float: left;
  }
`;

export const NavbarItemsContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: ${bp.lg}) {
    height: 100vh;
  }
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
  display: flex;
  justify-content: flex-start;
  color: ${colors.white};
  font-weight: 700;

  @media (min-width: ${bp.lg}) {
    min-width: 150px;
    flex-direction: row;
    font-size: 16px;
    letter-spacing: 1px;
    gap: 10px;
    padding: 0 10px;
  }
`;

// export const MenuItemIcon = styled.div`
//   display: none;
//   color: ${colors.white};
//   padding-left: 10px;
//   font-weight: 700;

//   @media (min-width: ${bp.lg}) {
//     display: flex;
//     justify-content: flex-start;
//     align-items: center;
//     font-size: 15px;
//   }
// `;

export const MenuItemIcon = styled.div`
  background-color: ${colors.orange};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  padding: 5px;
  text-decoration: none;
  border-radius: 50%;
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
  /* position: absolute;
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
  } */
  position: fixed; /* or position: absolute; */
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around; /* Adjust as needed */
  background-color: ${colors.purple};
  /* padding: 20px 0; */
  padding: 5px;
  z-index: 1;

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
  align-items: center;
  flex-direction: column;
  text-decoration: none;
  color: ${colors.white};
  font-size: 12px;
  max-width: 200px;
  padding: 5px;
  width: 70px;

  &:hover {
    background-color: ${colors.orange};
    color: ${colors.white};
  }

  &.active {
    background-color: ${colors.orange};
    color: ${colors.white};
  }

  @media (min-width: ${bp.md}) {
    flex-direction: row;
    width: 100px;
  }

  @media (min-width: ${bp.lg}) {
    display: none;
  }
`;

export const MobileIconContainer = styled.div`
  display: flex;
  justify-content: center;
  font-size: 20px;
  padding: 5px;

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
  /* padding: 20px; */
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
  display: none;
  @media (min-width: ${bp.lg}) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
`;

export const LoginContainer = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  padding: 0 20px;
  height: 100%;
  margin-bottom: 20px;
`;

export const UserModal = styled.div`
  position: fixed;
  bottom: 10%;
  /* left: 10%; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  transform: translate(-10%, -10%);
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  z-index: 9999;
  color: black;
  gap: 5px;
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

  &:hover {
    background-color: ${colors.darkPurple};
    color: ${colors.white};
    border-radius: 5px;
  }
`;

export const TopNavbarLoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  gap: 5px;

  @media (min-width: ${bp.lg}) {
    display: none;
  }
`;

export const NavbarIcon = styled.div`
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  padding: 5px;
  text-decoration: none;
  border-radius: 50%;
  font-size: 20px;
  border: 1px solid white;

  &:hover {
    background-color: ${colors.orange};
  }
`;

export const TopNavbarModalContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  white-space: nowrap;
  width: 100%;

  position: absolute;
  top: calc(100% - 70px);
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;

  @media (min-width: ${bp.lg}) {
    display: none;
  }
`;

export const TopUserModal = styled.div`
  /* position: fixed;
  bottom: 10%; */
  /* left: 10%; */
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  transform: translate(-10%, -10%);
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  z-index: 9999;
  gap: 5px;
  width: 300px; */

  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 999;
  color: black;
  width: 350px;
`;

export const CloseButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: black;
  padding: 8px 12px;
  border: 0.5px solid gray;
  border-radius: 5px;
  margin: 10px 0;
`;
