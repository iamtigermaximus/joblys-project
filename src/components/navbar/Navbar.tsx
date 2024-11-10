'use client';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import {
  Backdrop,
  Brand,
  BrandContainer,
  BurgerMenu,
  CloseButton,
  ContentContainer,
  ContentTitleContainer,
  ContentTitle,
  LanguageContainer,
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
  SidebarBackdrop,
  SidebarContentContainer,
  SidebarHeader,
  SidebarHeaderClose,
  SidebarHeaderItem,
  SidebarMenuContainer,
  SidebarTitle,
  SidebarTitleContainer,
  StyledOption,
  StyledSelect,
  TopNavbarLoginContainer,
  TopNavbarModalContainer,
  TopUserModal,
  UserModal,
  ContentItemContainer,
  ContentItemTitle,
  ContentItemSubtexts,
} from './Navbar.styles';
import { useSession, signOut } from 'next-auth/react';
import { FaBars, FaTimes, FaUser, FaQuestionCircle } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';

import {
  FaArrowRightFromBracket,
  FaArrowRightToBracket,
} from 'react-icons/fa6';
import { IoSettingsSharp, IoDocumentTextSharp } from 'react-icons/io5';
import NavLogo from '@/assets/Joblys-logo-RGB-white.png';
import { usePathname, useRouter } from 'next/navigation';
import { MdHomeFilled } from 'react-icons/md';
import { ImProfile } from 'react-icons/im';
import { RiFileUserFill } from 'react-icons/ri';
import { useTranslations, useLocale } from 'next-intl';

const Navbar = () => {
  const t = useTranslations('Navbar');
  const locale = useLocale();
  const { data: session } = useSession();
  const router = useRouter();
  const [activeMenuItem, setActiveMenuItem] = useState('');
  const pathname = usePathname();
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const currentLocale = pathname.split('/')[1] || 'en';

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

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
    if (pathname.startsWith(`/${locale}/eazyCV/dashboard`)) {
      setActiveMenuItem('dashboard');
    } else if (pathname.startsWith(`/${locale}/eazyCV/profile`)) {
      setActiveMenuItem('profile');
    } else if (pathname.startsWith(`/${locale}/eazyCV/resumes`)) {
      setActiveMenuItem('resumes');
    } else if (pathname.startsWith(`/${locale}/eazyCV/cover-letters`)) {
      setActiveMenuItem('cover-letters');
    } else {
      setActiveMenuItem('');
    }
  }, [pathname, locale]);

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

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value as string;
    const pathWithoutLocale = pathname.split('/').slice(2).join('/');

    router.push(`/${newLocale}/${pathWithoutLocale}`);
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
            <LanguageContainer>
              <StyledSelect
                value={currentLocale}
                onChange={handleLanguageChange}
              >
                <StyledOption value="en">EN</StyledOption>
                <StyledOption value="fi">FI</StyledOption>
              </StyledSelect>
            </LanguageContainer>
          </BrandContainer>
        </MenuContainer>
        <Menu>
          <MenuContainer>
            <MenuItemContainer
              onClick={() => setActiveMenuItem('dashboard')}
              className={activeMenuItem === 'dashboard' ? 'active' : ''}
              href={`/${locale}/eazyCV/dashboard`}
            >
              <MenuItem>{t('dashboard')}</MenuItem>
            </MenuItemContainer>
            <MenuItemContainer
              onClick={() => setActiveMenuItem('profile')}
              className={activeMenuItem === 'profile' ? 'active' : ''}
              href={`/${locale}/eazyCV/profile`}
            >
              <MenuItem>{t('profile')}</MenuItem>
            </MenuItemContainer>
            <MenuItemContainer
              onClick={() => setActiveMenuItem('resumes')}
              className={activeMenuItem === 'resumes' ? 'active' : ''}
              href={`/${locale}/eazyCV/resumes`}
            >
              <MenuItem>{t('resumes')}</MenuItem>
            </MenuItemContainer>
            <MenuItemContainer
              onClick={() => setActiveMenuItem('cover-letters')}
              className={activeMenuItem === 'cover-letters' ? 'active' : ''}
              href={`/${locale}/eazyCV/cover-letters`}
            >
              <MenuItem>{t('coverletters')}</MenuItem>
            </MenuItemContainer>
            <MenuItemContainer
              onClick={toggleSidebar}
              className={activeMenuItem === 'help' ? 'active' : ''}
              href="#"
            >
              <MenuItem>FAQ</MenuItem>
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
                        <p onClick={handleSettings}>{t('settings')}</p>
                      </ModalItemContainer>
                      <ModalItemContainer>
                        <FaArrowRightFromBracket />
                        <p onClick={handleSignOut}>{t('out')}</p>
                      </ModalItemContainer>
                      <CloseButton onClick={handleCloseModal}>
                        {t('close')}{' '}
                      </CloseButton>
                    </UserModal>
                  ) : (
                    <UserModal>
                      <p> {t('login')}</p>
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
                  {t('login')}
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
                    <p onClick={handleSettings}> {t('settings')}</p>
                  </ModalItemContainer>
                  <ModalItemContainer>
                    <FaArrowRightFromBracket />
                    <p onClick={handleSignOut}> {t('out')}</p>
                  </ModalItemContainer>

                  <CloseButton onClick={handleCloseModal}>
                    {t('close')}
                  </CloseButton>
                </TopUserModal>
              ) : (
                <TopUserModal>
                  <ModalItemContainer>
                    <FaArrowRightToBracket />
                    <p onClick={handleSignIn}> {t('login')}</p>
                  </ModalItemContainer>

                  <CloseButton onClick={handleCloseModal}>
                    {t('close')}
                  </CloseButton>
                </TopUserModal>
              )}
            </>
          )}
        </TopNavbarModalContainer>
        <MobileMenuItemContainer>
          <MobileMenuItem
            href={`/${locale}/eazyCV/dashboard`}
            onClick={() => setActiveMenuItem('dashboard')}
            className={activeMenuItem === 'dashboard' ? 'active' : ''}
          >
            <MobileIconContainer>
              <MdHomeFilled />
            </MobileIconContainer>
            {t('dashboard')}{' '}
          </MobileMenuItem>
        </MobileMenuItemContainer>
        <MobileMenuItemContainer>
          <MobileMenuItem
            href={`/${locale}/eazyCV/profile`}
            onClick={() => setActiveMenuItem('profile')}
            className={activeMenuItem === 'profile' ? 'active' : ''}
          >
            <MobileIconContainer>
              <RiFileUserFill />
            </MobileIconContainer>
            {t('profile')}{' '}
          </MobileMenuItem>
        </MobileMenuItemContainer>
        <MobileMenuItemContainer>
          <MobileMenuItem
            href={`/${locale}/eazyCV/resumes`}
            onClick={() => setActiveMenuItem('resumes')}
            className={activeMenuItem === 'resumes' ? 'active' : ''}
          >
            <MobileIconContainer>
              <ImProfile />
            </MobileIconContainer>
            {t('resumes')}{' '}
          </MobileMenuItem>
        </MobileMenuItemContainer>
        <MobileMenuItemContainer>
          <MobileMenuItem
            href={`/${locale}/eazyCV/cover-letters`}
            onClick={() => setActiveMenuItem('cover-letters')}
            className={activeMenuItem === 'cover-letters' ? 'active' : ''}
          >
            <MobileIconContainer>
              <IoDocumentTextSharp />
            </MobileIconContainer>
            {t('letters')}
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
          <FaQuestionCircle onClick={toggleSidebar} />
        </NavbarIcon>
        <NavbarIcon onClick={toggleUserModal}>
          <FaUser />
        </NavbarIcon>
        <StyledSelect value={currentLocale} onChange={handleLanguageChange}>
          <StyledOption value="en">EN</StyledOption>
          <StyledOption value="fi">FI</StyledOption>
        </StyledSelect>
      </TopNavbarLoginContainer>
      {isSidebarOpen && (
        <>
          <SidebarBackdrop onClick={closeSidebar} />
          <SidebarMenuContainer isOpen>
            <SidebarHeader>
              <SidebarHeaderItem>
                <SidebarTitleContainer>
                  <SidebarTitle>FAQ</SidebarTitle>
                </SidebarTitleContainer>
              </SidebarHeaderItem>
              <SidebarHeaderClose>
                <IoCloseSharp onClick={closeSidebar} />
              </SidebarHeaderClose>
            </SidebarHeader>
            <SidebarContentContainer>
              <ContentTitleContainer>
                <ContentTitle> {t('faq')}</ContentTitle>
              </ContentTitleContainer>
              <ContentContainer>
                <ContentItemContainer>
                  <ContentItemTitle>{t('qCreateAccount')}</ContentItemTitle>
                  <ContentItemSubtexts>
                    {t('aCreateAccount')}
                  </ContentItemSubtexts>
                </ContentItemContainer>
                <ContentItemContainer>
                  <ContentItemTitle>{t('qLogin')}</ContentItemTitle>
                  <ContentItemSubtexts>{t('aLogin')}</ContentItemSubtexts>
                </ContentItemContainer>
                <ContentItemContainer>
                  <ContentItemTitle>{t('qImport')}</ContentItemTitle>
                  <ContentItemSubtexts>{t('aImport')}</ContentItemSubtexts>
                </ContentItemContainer>
                <ContentItemContainer>
                  <ContentItemTitle>{t('qEdit')}</ContentItemTitle>
                  <ContentItemSubtexts>{t('aEdit')}</ContentItemSubtexts>
                </ContentItemContainer>
                <ContentItemContainer>
                  <ContentItemTitle>{t('qDownload')}</ContentItemTitle>
                  <ContentItemSubtexts>{t('aDownload')}</ContentItemSubtexts>
                </ContentItemContainer>
                <ContentItemContainer>
                  <ContentItemTitle>{t('qDelete')}</ContentItemTitle>
                  <ContentItemSubtexts>{t('aDelete')}</ContentItemSubtexts>
                </ContentItemContainer>
                <ContentItemContainer>
                  <ContentItemTitle>{t('qLanguage')}</ContentItemTitle>
                  <ContentItemSubtexts>{t('aLanguage')}</ContentItemSubtexts>
                </ContentItemContainer>
              </ContentContainer>
            </SidebarContentContainer>
          </SidebarMenuContainer>
        </>
      )}
    </NavbarContainer>
  );
};

export default Navbar;
