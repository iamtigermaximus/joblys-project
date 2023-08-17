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
            <MenuItem href="/dashboard">DASHBOARD</MenuItem>
          </MenuItemContainer>
          <MenuItemContainer>
            <MenuItem href="/resumes">RESUMES</MenuItem>
          </MenuItemContainer>
          <MenuItemContainer>
            <MenuItem href="/cover-letters">COVER LETTERS</MenuItem>
          </MenuItemContainer>
          <MenuItemContainer>
            <MenuItem href="/jobs">JOBS</MenuItem>
          </MenuItemContainer>
        </MenuContainer>
      </NavbarItemsContainer>
      <SignInItemsContainer>
        <MenuContainer>
          <SignInContainer>
            <SignIn href="/signin">SIGN IN</SignIn>
          </SignInContainer>
        </MenuContainer>
      </SignInItemsContainer>
    </NavbarContainer>
  );
};

export default Navbar;
