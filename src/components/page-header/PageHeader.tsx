'use client';
import React, { FormEvent } from 'react';
import {
  Header,
  HeaderLinksContainer,
  HeaderMenuContainer,
  IconContainer,
  LogoutButton,
  SignInButton,
  // MenuLink,
  // MenuLinkButton,
  // RegisterButton,
  // RegisterLink,
  // SignInButton,
  // SignInLink,
  WelcomeTextContainer,
} from './PageHeader.styles';
import { useSession, signOut } from 'next-auth/react';
import { FaBell, FaUser } from 'react-icons/fa';

const PageHeader = () => {
  const { data: session } = useSession();

  const handleSignOut = async (e: FormEvent) => {
    e.preventDefault();
    await signOut();
    window.alert('You have been signed out.');
  };

  return (
    <Header>
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
      <HeaderMenuContainer>
        {session ? (
          <>
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
          </>
        ) : (
          <>
            <WelcomeTextContainer>Welcome, Siegfred!</WelcomeTextContainer>
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
          </>
        )}
      </HeaderMenuContainer>
    </Header>
  );
};

export default PageHeader;
