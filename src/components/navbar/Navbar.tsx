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
  MobileMenuItemContainer,
  NavbarContainer,
  NavbarItemsContainer,
} from './Navbar.styles';
import { useSession } from 'next-auth/react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import NavLogo from '../../assets/Joblys-logo-RGB-white.png';

const Navbar = () => {
  const { data: session } = useSession();
  const [activeMenuItem, setActiveMenuItem] = useState('');

  const [click, setClick] = useState(true);
  const categoryMenu = () => setClick(!click);

  return (
    <NavbarContainer>
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
            <MenuItem href="/pages/navbar-links/dashboard">Dashboard</MenuItem>
          </MenuItemContainer>
          <MenuItemContainer
            onClick={() => setActiveMenuItem('profile')}
            className={activeMenuItem === 'profile' ? 'active' : ''}
          >
            <MenuItem href="/pages/navbar-links/profile">Profile</MenuItem>
          </MenuItemContainer>
          <MenuItemContainer
            onClick={() => setActiveMenuItem('resumes')}
            className={activeMenuItem === 'resumes' ? 'active' : ''}
          >
            <MenuItem href="/pages/navbar-links/resumes">CV/Resume</MenuItem>
          </MenuItemContainer>
          <MenuItemContainer
            onClick={() => setActiveMenuItem('cover-letters')}
            className={activeMenuItem === 'cover-letters' ? 'active' : ''}
          >
            <MenuItem href="/pages/navbar-links/cover-letters">
              Cover Letters
            </MenuItem>
          </MenuItemContainer>
        </MenuContainer>
      </NavbarItemsContainer>
      <BurgerMenu onClick={categoryMenu}>
        {click ? <FaBars /> : <FaTimes />}
        <MobileMenuContainer
          className={click ? 'category active' : 'category'}
          onClick={categoryMenu}
        >
          <MobileMenuItemContainer>
            <MobileMenuItem href="/pages/navbar-links/dashboard">
              Dashboard
            </MobileMenuItem>
          </MobileMenuItemContainer>
          <MobileMenuItemContainer>
            <MobileMenuItem href="/pages/navbar-links/profile">
              Profile
            </MobileMenuItem>
          </MobileMenuItemContainer>
          <MobileMenuItemContainer>
            <MobileMenuItem href="/pages/navbar-links/resumes">
              CV/Resume
            </MobileMenuItem>
          </MobileMenuItemContainer>
          <MobileMenuItemContainer>
            <MobileMenuItem href="/pages/navbar-links/cover-letters">
              Cover Letters
            </MobileMenuItem>
          </MobileMenuItemContainer>
        </MobileMenuContainer>
      </BurgerMenu>
    </NavbarContainer>
  );
};

export default Navbar;
