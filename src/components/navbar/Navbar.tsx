'use client';
import React, { FormEvent, useEffect, useState } from 'react';
import {
  Backdrop,
  Brand,
  BrandContainer,
  BurgerMenu,
  CloseButton,
  LoginContainer,
  LogoImage,
  LogoImageContainer,
  Menu,
  MenuContainer,
  MenuItem,
  MenuItemContainer,
  MenuItemIcon,
  MenuItemLogin,
  MobileIconContainer,
  MobileLogoutButton,
  MobileMenuContainer,
  MobileMenuItem,
  MobileMenuItemContainer,
  ModalContainer,
  ModalItemContainer,
  NavbarContainer,
  NavbarIcon,
  NavbarItemsContainer,
  TopNavbarLoginContainer,
  TopNavbarModalContainer,
  TopUserModal,
  UserModal,
} from './Navbar.styles';
import { useSession, signOut } from 'next-auth/react';
import { FaBars, FaTimes, FaUser, FaQuestionCircle } from 'react-icons/fa';
import {
  FaArrowRightFromBracket,
  FaArrowRightToBracket,
} from 'react-icons/fa6';
import { IoSettingsSharp, IoDocumentTextSharp } from 'react-icons/io5';
import NavLogo from '../../assets/Joblys-logo-RGB-white.png';
import { usePathname, useRouter } from 'next/navigation';
import { MdHomeFilled } from 'react-icons/md';
import { ImProfile } from 'react-icons/im';
import { RiFileUserFill } from 'react-icons/ri';

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
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

  const handleCloseModal = () => {
    setIsUserModalOpen(false);
  };

  const [click, setClick] = useState(true);
  const categoryMenu = () => setClick(!click);

  useEffect(() => {
    if (pathname.startsWith('/eazyCV/dashboard')) {
      setActiveMenuItem('dashboard');
    } else if (pathname.startsWith('/eazyCV/profile')) {
      setActiveMenuItem('profile');
    } else if (pathname.startsWith('/eazyCV/resumes')) {
      setActiveMenuItem('resumes');
    } else if (pathname.startsWith('/eazyCV/cover-letters')) {
      setActiveMenuItem('cover-letters');
    }
  }, [pathname]);

  const handleSignOut = async (e: FormEvent) => {
    e.preventDefault();
    await signOut({ callbackUrl: '/' });
  };

  const handleSettings = () => {
    router.push('/eazyCV/settings');
    setIsUserModalOpen(false);
  };

  const handleSignIn = () => {
    router.push('/login');
  };

  return (
    <NavbarContainer>
      <NavbarItemsContainer>
        <MenuContainer>
          <BrandContainer>
            <Brand href="/eazyCV/dashboard">
              <LogoImageContainer>
                <LogoImage
                  src={NavLogo}
                  // width={150}
                  // height={50}
                  alt="hero-image"
                  priority
                  rel="preload"
                />
              </LogoImageContainer>
            </Brand>
          </BrandContainer>
        </MenuContainer>
        <Menu>
          <MenuContainer>
            <MenuItemContainer
              onClick={() => setActiveMenuItem('dashboard')}
              className={activeMenuItem === 'dashboard' ? 'active' : ''}
              href="/eazyCV/dashboard"
            >
              <MenuItem>Dashboard</MenuItem>
            </MenuItemContainer>
            <MenuItemContainer
              onClick={() => setActiveMenuItem('profile')}
              className={activeMenuItem === 'profile' ? 'active' : ''}
              href="/eazyCV/profile"
            >
              <MenuItem>Profile</MenuItem>
            </MenuItemContainer>
            <MenuItemContainer
              onClick={() => setActiveMenuItem('resumes')}
              className={activeMenuItem === 'resumes' ? 'active' : ''}
              href="/eazyCV/resumes"
            >
              <MenuItem>CV/Resume</MenuItem>
            </MenuItemContainer>
            <MenuItemContainer
              onClick={() => setActiveMenuItem('cover-letters')}
              className={activeMenuItem === 'cover-letters' ? 'active' : ''}
              href="/eazyCV/cover-letters"
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
                        <p onClick={handleSettings}>Settings</p>
                      </ModalItemContainer>
                      <ModalItemContainer>
                        <FaArrowRightFromBracket />
                        <p onClick={handleSignOut}>Log out</p>
                      </ModalItemContainer>
                      <CloseButton onClick={handleCloseModal}>
                        Close
                      </CloseButton>
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

      <MobileMenuContainer
        className={click ? 'category active' : 'category'}
        onClick={categoryMenu}
      >
        <Backdrop onClick={handleCloseModal} $isVisible={isUserModalOpen} />

        <TopNavbarModalContainer>
          {isUserModalOpen && (
            <>
              {session ? (
                <TopUserModal>
                  <ModalItemContainer>
                    <IoSettingsSharp />
                    <p onClick={handleSettings}>Settings</p>
                  </ModalItemContainer>
                  <ModalItemContainer>
                    <FaArrowRightFromBracket />
                    <p onClick={handleSignOut}>Log out</p>
                  </ModalItemContainer>

                  <CloseButton onClick={handleCloseModal}>Close</CloseButton>
                </TopUserModal>
              ) : (
                <TopUserModal>
                  <ModalItemContainer>
                    <FaArrowRightToBracket />
                    <p onClick={handleSignIn}>Log in</p>
                  </ModalItemContainer>

                  <CloseButton onClick={handleCloseModal}>Close</CloseButton>
                </TopUserModal>
              )}
            </>
          )}
        </TopNavbarModalContainer>
        <MobileMenuItemContainer>
          <MobileMenuItem
            href="/eazyCV/dashboard"
            onClick={() => setActiveMenuItem('dashboard')}
            className={activeMenuItem === 'dashboard' ? 'active' : ''}
          >
            <MobileIconContainer>
              <MdHomeFilled />
            </MobileIconContainer>
            Dashboard
          </MobileMenuItem>
        </MobileMenuItemContainer>
        <MobileMenuItemContainer>
          <MobileMenuItem
            href="/eazyCV/profile"
            onClick={() => setActiveMenuItem('profile')}
            className={activeMenuItem === 'profile' ? 'active' : ''}
          >
            <MobileIconContainer>
              <RiFileUserFill />
            </MobileIconContainer>
            Profile
          </MobileMenuItem>
        </MobileMenuItemContainer>
        <MobileMenuItemContainer>
          <MobileMenuItem
            href="/eazyCV/resumes"
            onClick={() => setActiveMenuItem('resumes')}
            className={activeMenuItem === 'resumes' ? 'active' : ''}
          >
            <MobileIconContainer>
              <ImProfile />
            </MobileIconContainer>
            Resumes
          </MobileMenuItem>
        </MobileMenuItemContainer>
        <MobileMenuItemContainer>
          <MobileMenuItem
            href="/eazyCV/cover-letters"
            onClick={() => setActiveMenuItem('cover-letters')}
            className={activeMenuItem === 'cover-letters' ? 'active' : ''}
          >
            <MobileIconContainer>
              <IoDocumentTextSharp />
            </MobileIconContainer>
            Letters
          </MobileMenuItem>
        </MobileMenuItemContainer>
        {/* {session ? (
            <>
              <MobileMenuItemContainer>
                <MobileMenuItem href="/joblys/settings">
                  Settings
                </MobileMenuItem>
              </MobileMenuItemContainer>
              <MobileMenuItemContainer>
                <MobileLogoutButton onClick={handleSignOut}>
                  Logout
                </MobileLogoutButton>
              </MobileMenuItemContainer>
            </>
          ) : (
            ''
            // <MobileMenuItemContainer>
            //   <MobileLogoutButton onClick={handleSignIn}>
            //     Login
            //   </MobileLogoutButton>
            // </MobileMenuItemContainer>
          )} */}
      </MobileMenuContainer>

      <TopNavbarLoginContainer>
        <NavbarIcon>
          <FaQuestionCircle />
        </NavbarIcon>
        <NavbarIcon onClick={toggleUserModal}>
          <FaUser />
        </NavbarIcon>
      </TopNavbarLoginContainer>
    </NavbarContainer>
  );
};

export default Navbar;
