'use client';
import React, { FormEvent, useEffect, useState } from 'react';
import {
  Header,
  HeaderLinksContainer,
  HeaderMenuContainer,
  IconContainer,
  LeftContainer,
  LogoutButton,
  ModalItemContainer,
  ResumeButton,
  ResumeButtonIcon,
  ResumeButtonTitle,
  RightContainer,
  SignInButton,
  UserModal,
  // MenuLink,
  // MenuLinkButton,
  // RegisterButton,
  // RegisterLink,
  // SignInButton,
  // SignInLink,
  WelcomeTextContainer,
} from './PageHeader.styles';
import { useSession, signOut } from 'next-auth/react';
import { FaBell, FaUser, FaArrowLeft } from 'react-icons/fa';
import { useRouter, usePathname } from 'next/navigation';
import { SignOut } from '@/components/navbar/Navbar.styles';
import { FaArrowRightFromBracket } from 'react-icons/fa6';
import { IoSettingsSharp } from 'react-icons/io5';

const PageHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isProfileBuilder = pathname === '/profile-builder';
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const { data: session, status } = useSession();

  const toggleUserModal = () => {
    setIsUserModalOpen(!isUserModalOpen);
  };

  useEffect(() => {
    // Redirect to a login page if the session is not loading and the user is not authenticated
    if (status === 'authenticated') {
      if (!session) {
        router.push('/login');
      }
    }
  }, [status, session, router]);

  const navigateToResume = () => {
    router.push('/joblys/resumes');
  };

  const getHeaderStyles = (): React.CSSProperties => {
    switch (pathname) {
      case '/profile-builder':
        return {
          backgroundColor: '#520668',
          color: 'white',
        };
      default:
        return {
          backgroundColor: 'white',
        };
    }
  };

  const headerStyles = getHeaderStyles();

  const handleSignOut = async (e: FormEvent) => {
    e.preventDefault();
    await signOut({ callbackUrl: '/joblys/dashboard' });
  };
  const welcomeText = session ? `Welcome, ${session.user?.name}!` : '';

  return (
    <Header style={headerStyles}>
      {/* <HeaderMenuContainer>
        <MenuLinkButton>
          <MenuLink href="/pages/header-links/discover-companies">
            DISCOVER COMPANIES
          </MenuLink>
        </MenuLinkButton>
        <MenuLinkButton>
          <MenuLink href="/pages/header-links/career-advice">
            CAREER ADVICE
          </MenuLink>
        </MenuLinkButton>
        <MenuLinkButton>
          <MenuLink href="/pages/header-links/resume-help">
            RESUME HELP
          </MenuLink>
        </MenuLinkButton>
      </HeaderMenuContainer> */}
      {/* {pathname === '/profile-builder' ? (
        <HeaderMenuContainer>
          <LeftContainer>
            <ResumeButton onClick={navigateToResume}>
              <ResumeButtonIcon>
                <FaArrowLeft />
              </ResumeButtonIcon>
              <ResumeButtonTitle> Resume</ResumeButtonTitle>
            </ResumeButton>
          </LeftContainer>
          {session ? (
            <RightContainer>
              <WelcomeTextContainer>{welcomeText}</WelcomeTextContainer>
              <LogoutButton onClick={handleSignOut}>Log out</LogoutButton>
              <HeaderLinksContainer>
                <IconContainer>
                  <FaBell />
                </IconContainer>
              </HeaderLinksContainer>
              <HeaderLinksContainer>
                <IconContainer>
                  <FaUser />
                </IconContainer>
              </HeaderLinksContainer>
            </RightContainer>
          ) : (
            <RightContainer>
              <SignInButton>Sign In</SignInButton>
              <HeaderLinksContainer>
                <IconContainer>
                  <FaBell />
                </IconContainer>
              </HeaderLinksContainer>
              <HeaderLinksContainer>
                <IconContainer>
                  <FaUser />
                </IconContainer>
              </HeaderLinksContainer>
            </RightContainer>
          )}
        </HeaderMenuContainer>
      ) : (
        <HeaderMenuContainer>
          <LeftContainer>
            <ResumeButton onClick={navigateToResume}>
              <ResumeButtonIcon>
                <FaArrowLeft />
              </ResumeButtonIcon>
              <ResumeButtonTitle> Resume</ResumeButtonTitle>
            </ResumeButton>
          </LeftContainer>
          {session ? (
            <RightContainer>
              <WelcomeTextContainer>{welcomeText}</WelcomeTextContainer>
              <LogoutButton onClick={handleSignOut}>Log out</LogoutButton>
              <HeaderLinksContainer>
                <IconContainer>
                  <FaBell />
                </IconContainer>
              </HeaderLinksContainer>
              <HeaderLinksContainer>
                <IconContainer>
                  <FaUser />
                </IconContainer>
              </HeaderLinksContainer>
            </RightContainer>
          ) : (
            <RightContainer>
              <SignInButton>Sign In</SignInButton>
              <HeaderLinksContainer>
                <IconContainer>
                  <FaBell />
                </IconContainer>
              </HeaderLinksContainer>
              <HeaderLinksContainer>
                <IconContainer>
                  <FaUser />
                </IconContainer>
              </HeaderLinksContainer>
            </RightContainer>
          )}
        </HeaderMenuContainer>
      )} */}
      {isProfileBuilder && (
        <HeaderMenuContainer>
          <LeftContainer>
            <ResumeButton onClick={navigateToResume}>
              <ResumeButtonIcon>
                <FaArrowLeft />
              </ResumeButtonIcon>
              <ResumeButtonTitle> Resume</ResumeButtonTitle>
            </ResumeButton>
          </LeftContainer>

          <RightContainer>
            {/* <WelcomeTextContainer>{welcomeText}</WelcomeTextContainer>
              <LogoutButton onClick={handleSignOut}>Log out</LogoutButton> */}
            <ResumeButton>
              <ResumeButtonTitle>Download</ResumeButtonTitle>
            </ResumeButton>
            {/* <HeaderLinksContainer>
              <IconContainer>
                <FaBell />
              </IconContainer>
            </HeaderLinksContainer> */}
            <HeaderLinksContainer>
              <IconContainer onClick={toggleUserModal}>
                <FaUser />
              </IconContainer>

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
            </HeaderLinksContainer>
          </RightContainer>
        </HeaderMenuContainer>
      )}
    </Header>
  );
};

export default PageHeader;
