'use client';
import React, { FormEvent } from 'react';
import {
  Brand,
  BrandContainer,
  MenuContainer,
  MenuItem,
  MenuItemContainer,
  NavbarContainer,
  NavbarItemsContainer,
  SignInContainer,
  SignInItemsContainer,
  SignOut,
} from './Navbar.styles';
import { signOut, useSession } from 'next-auth/react';

const Navbar = () => {
  const { data: session } = useSession();

  const handleSignOut = async (e: FormEvent) => {
    e.preventDefault();
    await signOut();
  };
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
            <MenuItem href="/pages/navbar-links/dashboard">DASHBOARD</MenuItem>
          </MenuItemContainer>
          <MenuItemContainer>
            <MenuItem href="/pages/navbar-links/jobs">SEARCH JOBS</MenuItem>
          </MenuItemContainer>
          <MenuItemContainer>
            <MenuItem href="/pages/navbar-links/resumes">RESUMES</MenuItem>
          </MenuItemContainer>
          <MenuItemContainer>
            <MenuItem href="/pages/navbar-links/cover-letters">
              COVER LETTERS
            </MenuItem>
          </MenuItemContainer>

          {!session ? (
            ''
          ) : (
            <MenuItemContainer>
              <MenuItem href="/pages/navbar-links/profile">ACCOUNT</MenuItem>
            </MenuItemContainer>
          )}
        </MenuContainer>
      </NavbarItemsContainer>
      <SignInItemsContainer>
        <MenuContainer>
          {!session ? (
            ''
          ) : (
            <SignInContainer>
              <SignOut href="/" onClick={handleSignOut}>
                SIGN OUT
              </SignOut>
            </SignInContainer>
          )}
        </MenuContainer>
      </SignInItemsContainer>
    </NavbarContainer>
  );
};

export default Navbar;
