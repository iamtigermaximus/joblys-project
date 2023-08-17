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
            <Brand>JOBLYS</Brand>
          </BrandContainer>
        </MenuContainer>
        <MenuContainer>
          <MenuItemContainer>
            <MenuItem>DASHBOARD</MenuItem>
          </MenuItemContainer>
          <MenuItemContainer>
            <MenuItem>RESUMES</MenuItem>
          </MenuItemContainer>
          <MenuItemContainer>
            <MenuItem>COVER LETTERS</MenuItem>
          </MenuItemContainer>
          <MenuItemContainer>
            <MenuItem>JOBS</MenuItem>
          </MenuItemContainer>
        </MenuContainer>
      </NavbarItemsContainer>
      <SignInItemsContainer>
        <MenuContainer>
          <SignInContainer>
            <SignIn>SIGN IN</SignIn>
          </SignInContainer>
        </MenuContainer>
      </SignInItemsContainer>
    </NavbarContainer>
  );
};

export default Navbar;
