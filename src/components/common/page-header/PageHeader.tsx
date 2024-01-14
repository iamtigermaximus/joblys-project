'use client';
import React, { FormEvent, useEffect } from 'react';
import {
  Header,
  HeaderLinksContainer,
  HeaderMenuContainer,
  IconContainer,
  LeftContainer,
  LogoutButton,
  ResumeButton,
  ResumeButtonIcon,
  ResumeButtonTitle,
  RightContainer,
  SignInButton,
  // MenuLink,
  // MenuLinkButton,
  // RegisterButton,
  // RegisterLink,
  // SignInButton,
  // SignInLink,
  WelcomeTextContainer
} from './PageHeader.styles';
import { useSession, signOut } from 'next-auth/react';
import { FaBell, FaUser, FaArrowLeft } from 'react-icons/fa';
import { useRouter, usePathname } from 'next/navigation';

const PageHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isProfileBuilder = pathname === '/profile-builder';

  // const { data: session } = useSession();
  const { data: session, status } = useSession();

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
          color: 'white'
        };
      default:
        return {
          backgroundColor: 'white'
        };
    }
  };

  const headerStyles = getHeaderStyles();

  const handleSignOut = async (e: FormEvent) => {
    e.preventDefault();
    await signOut({ callbackUrl: '/' });
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
          {session && (
            <RightContainer>
              {/* <WelcomeTextContainer>{welcomeText}</WelcomeTextContainer>
              <LogoutButton onClick={handleSignOut}>Log out</LogoutButton> */}
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
      )}
      {!isProfileBuilder && (
        <HeaderMenuContainer>
          <LeftContainer>
            <ResumeButton onClick={navigateToResume}>
              <ResumeButtonIcon>
                <FaArrowLeft />
              </ResumeButtonIcon>
              <ResumeButtonTitle> Resume</ResumeButtonTitle>
            </ResumeButton>
          </LeftContainer>
          {session && (
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
          )}
        </HeaderMenuContainer>
      )}
    </Header>
  );
};

export default PageHeader;
