'use client';
import React from 'react';
import {
  Header,
  HeaderLinksContainer,
  HeaderMenuContainer,
  IconContainer,
  LogoutButton,
  // MenuLink,
  // MenuLinkButton,
  // RegisterButton,
  // RegisterLink,
  // SignInButton,
  // SignInLink,
  WelcomeTextContainer,
} from './PageHeader.styles';
import { useSession } from 'next-auth/react';
import { FaBell, FaUser } from 'react-icons/fa';

const PageHeader = () => {
  const { data: session } = useSession();

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
        {/* {!session ? (
          <SignInButton>
            <SignInLink href="/pages/signin">SIGN IN</SignInLink>
          </SignInButton>
        ) : (
          ''
        )}
        {!session ? (
          <RegisterButton>
            <RegisterLink href="/pages/signup">REGISTER</RegisterLink>
          </RegisterButton>
        ) : (
          ''
        )} */}

        <WelcomeTextContainer>Welcome, Siegfred!</WelcomeTextContainer>
        <LogoutButton>Log out</LogoutButton>
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
      </HeaderMenuContainer>
    </Header>
  );
};

export default PageHeader;
