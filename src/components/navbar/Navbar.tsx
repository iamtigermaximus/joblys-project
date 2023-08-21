import React from 'react';
import {
  Brand,
  BrandContainer,
  MenuContainer,
  MenuItem,
  MenuItemContainer,
  NavbarContainer,
  NavbarItemsContainer,
  SignIn,
  SignInContainer,
  SignInItemsContainer,
} from './Navbar.styles';

const Navbar = () => {
  return (
    <NavbarContainer>
      <NavbarItemsContainer>
        <MenuContainer>
          <BrandContainer>
            <Brand href="/">JOBLYS</Brand>
          </BrandContainer>
        </MenuContainer>
        <MenuContainer>
          <MenuItemContainer>
            <MenuItem href="/pages/dashboard">DASHBOARD</MenuItem>
          </MenuItemContainer>
          <MenuItemContainer>
            <MenuItem href="/pages/resumes">RESUMES</MenuItem>
          </MenuItemContainer>
          <MenuItemContainer>
            <MenuItem href="/pages/cover-letters">COVER LETTERS</MenuItem>
          </MenuItemContainer>
          <MenuItemContainer>
            <MenuItem href="/pages/jobs">JOBS</MenuItem>
          </MenuItemContainer>
        </MenuContainer>
      </NavbarItemsContainer>
      <SignInItemsContainer>
        <MenuContainer>
          <SignInContainer>
            <SignIn href="/pages/signin">SIGN IN</SignIn>
          </SignInContainer>
        </MenuContainer>
      </SignInItemsContainer>
    </NavbarContainer>
  );
};

export default Navbar;
