'use client';
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
  SignOut,
} from './Navbar.styles';
import { signOut, useSession } from 'next-auth/react';

const Navbar = () => {
  const { data: session } = useSession();
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
          {!session ? (
            <SignInContainer>
              <SignIn href="/api/auth/signin">SIGN IN</SignIn>
            </SignInContainer>
          ) : (
            <SignInContainer>
              <SignOut href="/" onClick={() => signOut()}>
                SIGN OUT
              </SignOut>
            </SignInContainer>
          )}
        </MenuContainer>
        <MenuContainer>
          {!session ? (
            <SignInContainer>
              <SignIn href="/pages/signup">REGISTER</SignIn>
            </SignInContainer>
          ) : (
            ''
          )}
        </MenuContainer>
      </SignInItemsContainer>
    </NavbarContainer>
  );
};

export default Navbar;
