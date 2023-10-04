'use client';
import React, { FormEvent, useState } from 'react';
import {
  Brand,
  BrandContainer,
  BurgerMenu,
  MenuContainer,
  MenuItem,
  MenuItemContainer,
  MobileMenuContainer,
  MobileMenuItem,
  MobileSignIn,
  MobileSignInContainer,
  MobileSignInItemsContainer,
  MobileSignOut,
  NavbarContainer2,
  NavbarItemsContainer,
  SignInContainer,
  SignInItemsContainer,
  SignOut,
} from './Navbar.styles';
import { signOut, useSession } from 'next-auth/react';
import { FaBars, FaTimes, FaChevronCircleDown } from 'react-icons/fa';
import Image from 'next/image';
import NavLogo from '../../assets/Joblys-logo-RGB-white.png';

const Navbar = () => {
  const { data: session } = useSession();
  const [activeMenuItem, setActiveMenuItem] = useState('');

  const [click, setClick] = useState(true);
  const categoryMenu = () => setClick(!click);

  const handleSignOut = async (e: FormEvent) => {
    e.preventDefault();
    await signOut();
  };

  return (
    <NavbarContainer2>
      <NavbarItemsContainer>
        <MenuContainer>
          <BrandContainer>
            <Brand href="/">
              <Image
                src={NavLogo}
                width={150}
                height={50}
                alt="hero-image"
                priority
              />
            </Brand>
          </BrandContainer>
        </MenuContainer>
        <MenuContainer>
          <MenuItemContainer
            onClick={() => setActiveMenuItem('dashboard')}
            className={activeMenuItem === 'dashboard' ? 'active' : ''}
          >
            {/* <FaChevronCircleDown /> */}
            <MenuItem href="/pages/navbar-links/dashboard">DASHBOARD</MenuItem>
          </MenuItemContainer>
          <MenuItemContainer
            onClick={() => setActiveMenuItem('profile')}
            className={activeMenuItem === 'profile' ? 'active' : ''}
          >
            {/* <FaChevronCircleDown /> */}
            <MenuItem href="/pages/navbar-links/profile">PROFILE</MenuItem>
          </MenuItemContainer>
          {/* <MenuItemContainer>
            <MenuItem href="/pages/navbar-links/jobs">PROFILE</MenuItem>
          </MenuItemContainer> */}
          {/* {!session ? (
            ''
          ) : (
            <MenuItemContainer>
              <MenuItem href="/pages/navbar-links/profile">PROFILE</MenuItem>
            </MenuItemContainer>
          )} */}
          <MenuItemContainer
            onClick={() => setActiveMenuItem('resumes')}
            className={activeMenuItem === 'resumes' ? 'active' : ''}
          >
            {/* <FaChevronCircleDown /> */}
            <MenuItem href="/pages/navbar-links/resumes">CV/RESUMES</MenuItem>
          </MenuItemContainer>
          <MenuItemContainer
            onClick={() => setActiveMenuItem('cover-letters')}
            className={activeMenuItem === 'cover-letters' ? 'active' : ''}
          >
            {/* <FaChevronCircleDown /> */}
            <MenuItem href="/pages/navbar-links/cover-letters">
              COVER LETTERS
            </MenuItem>
          </MenuItemContainer>

          {/* {!session ? (
            ''
          ) : (
            <MenuItemContainer>
              <MenuItem href="/pages/navbar-links/profile">PROFILE</MenuItem>
            </MenuItemContainer>
          )} */}
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
      <BurgerMenu onClick={categoryMenu}>
        {click ? <FaBars /> : <FaTimes />}
        <MobileMenuContainer
          className={click ? 'category active' : 'category'}
          onClick={categoryMenu}
        >
          <MenuItemContainer>
            <MobileMenuItem href="/pages/navbar-links/dashboard">
              DASHBOARD
            </MobileMenuItem>
          </MenuItemContainer>
          <MenuItemContainer>
            <MobileMenuItem href="/pages/navbar-links/jobs">
              SEARCH JOBS
            </MobileMenuItem>
          </MenuItemContainer>
          <MenuItemContainer>
            <MobileMenuItem href="/pages/navbar-links/resumes">
              RESUMES
            </MobileMenuItem>
          </MenuItemContainer>
          <MenuItemContainer>
            <MobileMenuItem href="/pages/navbar-links/cover-letters">
              COVER LETTERS
            </MobileMenuItem>
          </MenuItemContainer>
          {!session ? (
            ''
          ) : (
            <MenuItemContainer>
              <MobileMenuItem href="/pages/navbar-links/profile">
                ACCOUNT
              </MobileMenuItem>
            </MenuItemContainer>
          )}

          <MobileSignInItemsContainer>
            <MenuContainer>
              {!session ? (
                <MobileSignInContainer>
                  <MobileSignIn href="/pages/signin"> SIGN IN</MobileSignIn>
                </MobileSignInContainer>
              ) : (
                <MobileSignInContainer>
                  <MobileSignOut href="/" onClick={handleSignOut}>
                    SIGN OUT
                  </MobileSignOut>
                </MobileSignInContainer>
              )}
            </MenuContainer>
          </MobileSignInItemsContainer>
        </MobileMenuContainer>
      </BurgerMenu>
    </NavbarContainer2>
  );
};

export default Navbar;
