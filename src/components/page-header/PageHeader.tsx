'use client';
import React from 'react';
import {
  Header,
  HeaderMenuContainer,
  MenuLink,
  MenuLinkButton,
  RegisterButton,
  RegisterLink,
  SignInButton,
  SignInLink,
} from './PageHeader.styles';
import { useSession } from 'next-auth/react';

const PageHeader = () => {
  const { data: session } = useSession();

  return (
    <Header>
      <HeaderMenuContainer>
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
      </HeaderMenuContainer>
      <HeaderMenuContainer>
        {!session ? (
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
        )}
      </HeaderMenuContainer>
    </Header>
  );
};

export default PageHeader;
