'use client';
import React, { FormEvent, useEffect, useState } from 'react';
import {
  Brand,
  BrandContainer,
  BurgerMenu,
  LoginContainer,
  Menu,
  MenuContainer,
  MenuItem,
  MenuItemContainer,
  MenuItemIcon,
  MenuItemLogin,
  MobileLogoutButton,
  MobileMenuContainer,
  MobileMenuItem,
  MobileMenuItemContainer,
  ModalContainer,
  ModalItemContainer,
  NavbarContainer,
  NavbarItemsContainer,
  UserModal,
} from './Navbar.styles';
import { useSession, signOut } from 'next-auth/react';
import { FaBars, FaTimes, FaUser } from 'react-icons/fa';
import { FaArrowRightFromBracket } from 'react-icons/fa6';
import { IoSettingsSharp } from 'react-icons/io5';
import Image from 'next/image';
import NavLogo from '../../assets/Joblys-logo-RGB-white.png';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const { data: session } = useSession();
  const [activeMenuItem, setActiveMenuItem] = useState('');
  const pathname = usePathname();
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  let userName = session?.user.name;
  if (userName && userName.includes(' ')) {
    userName = userName.substring(0, userName.indexOf(' '));
  }

  const toggleUserModal = () => {
    setIsUserModalOpen(!isUserModalOpen);
  };

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

  const handleSignOut = async (e: FormEvent) => {
    e.preventDefault();
    await signOut({ callbackUrl: '/' });
  };

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
        <Menu>
          <MenuContainer>
            <MenuItemContainer
              onClick={() => setActiveMenuItem('dashboard')}
              className={activeMenuItem === 'dashboard' ? 'active' : ''}
              href="/joblys/dashboard"
            >
              <MenuItem>Dashboard</MenuItem>
            </MenuItemContainer>
            <MenuItemContainer
              onClick={() => setActiveMenuItem('profile')}
              className={activeMenuItem === 'profile' ? 'active' : ''}
              href="/joblys/profile"
            >
              <MenuItem>Profile</MenuItem>
            </MenuItemContainer>
            <MenuItemContainer
              onClick={() => setActiveMenuItem('resumes')}
              className={activeMenuItem === 'resumes' ? 'active' : ''}
              href="/joblys/resumes"
            >
              <MenuItem>CV/Resume</MenuItem>
            </MenuItemContainer>
            <MenuItemContainer
              onClick={() => setActiveMenuItem('cover-letters')}
              className={activeMenuItem === 'cover-letters' ? 'active' : ''}
              href="/joblys/cover-letters"
            >
              <MenuItem>Cover Letters</MenuItem>
            </MenuItemContainer>
          </MenuContainer>
          <LoginContainer>
            <ModalContainer>
              {isUserModalOpen && (
                <>
                  {session ? (
                    <UserModal>
                      <ModalItemContainer>
                        <IoSettingsSharp />
                        <p>Settings</p>
                      </ModalItemContainer>
                      <ModalItemContainer>
                        <FaArrowRightFromBracket />
                        <p onClick={handleSignOut}>Log out</p>
                      </ModalItemContainer>
                    </UserModal>
                  ) : (
                    <UserModal>
                      <p>Log in</p>
                    </UserModal>
                  )}
                </>
              )}
            </ModalContainer>

            {session ? (
              <MenuItemContainer href="">
                <MenuItemLogin onClick={toggleUserModal}>
                  <MenuItemIcon>
                    <FaUser />
                  </MenuItemIcon>
                  {userName}
                </MenuItemLogin>
              </MenuItemContainer>
            ) : (
              <MenuItemContainer href="/login">
                <MenuItemLogin>
                  <MenuItemIcon>
                    <FaUser />
                  </MenuItemIcon>
                  Log in
                </MenuItemLogin>
              </MenuItemContainer>
            )}
          </LoginContainer>
        </Menu>
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
          <MobileMenuItemContainer>
            <MobileLogoutButton onClick={handleSignOut}>
              Logout
            </MobileLogoutButton>
          </MobileMenuItemContainer>
        </MobileMenuContainer>
      </BurgerMenu>
    </NavbarContainer>
  );
};

export default Navbar;
