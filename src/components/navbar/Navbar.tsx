'use client';
import React, { useEffect, useState } from 'react';
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
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const { data: session } = useSession();
  const [activeMenuItem, setActiveMenuItem] = useState('');
  const pathname = usePathname();

  const [click, setClick] = useState(true);
  const categoryMenu = () => setClick(!click);

  useEffect(() => {
    if (pathname.startsWith('/joblys/dashboard')) {
      setActiveMenuItem('dashboard');
    } else if (pathname.startsWith('/joblys/profile')) {
      setActiveMenuItem('profile');
    } else if (pathname.startsWith('/joblys/resumes')) {
      setActiveMenuItem('resumes');
    } else if (pathname.startsWith('/joblys/cover-letters')) {
      setActiveMenuItem('cover-letters');
    }
  }, [pathname]);

  return (
    <NavbarContainer>
      <NavbarItemsContainer>
        <MenuContainer>
          <BrandContainer>
            <Brand href="/joblys/dashboard">
              <Image
                src={NavLogo}
                width={150}
                height={50}
                alt="hero-image"
                priority
                rel="preload"
              />
            </Brand>
          </BrandContainer>
        </MenuContainer>
        <MenuContainer>
          <MenuItemContainer
            onClick={() => setActiveMenuItem('dashboard')}
            className={activeMenuItem === 'dashboard' ? 'active' : ''}
          >
            <MenuItem href="/joblys/dashboard">Dashboard</MenuItem>
          </MenuItemContainer>
          <MenuItemContainer
            onClick={() => setActiveMenuItem('profile')}
            className={activeMenuItem === 'profile' ? 'active' : ''}
          >
            <MenuItem href="/joblys/profile">Profile</MenuItem>
          </MenuItemContainer>
          <MenuItemContainer
            onClick={() => setActiveMenuItem('resumes')}
            className={activeMenuItem === 'resumes' ? 'active' : ''}
          >
            <MenuItem href="/joblys/resumes">CV/Resume</MenuItem>
          </MenuItemContainer>
          <MenuItemContainer
            onClick={() => setActiveMenuItem('cover-letters')}
            className={activeMenuItem === 'cover-letters' ? 'active' : ''}
          >
            <MenuItem href="/joblys/cover-letters">Cover Letters</MenuItem>
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
            <MobileMenuItem href="/joblys/dashboard">Dashboard</MobileMenuItem>
          </MobileMenuItemContainer>
          <MobileMenuItemContainer>
            <MobileMenuItem href="/joblys/profile">Profile</MobileMenuItem>
          </MobileMenuItemContainer>
          <MobileMenuItemContainer>
            <MobileMenuItem href="/joblys/resumes">CV/Resume</MobileMenuItem>
          </MobileMenuItemContainer>
          <MobileMenuItemContainer>
            <MobileMenuItem href="/joblys/cover-letters">
              Cover Letters
            </MobileMenuItem>
          </MobileMenuItemContainer>
        </MobileMenuContainer>
      </BurgerMenu>
    </NavbarContainer>
  );
};

export default Navbar;
