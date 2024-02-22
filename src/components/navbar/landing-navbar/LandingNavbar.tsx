'use client';
import React from 'react';
import {
  Brand,
  BrandContainer,
  ButtonsContainer,
  Container,
  GetStartedButton,
  LoginButton,
  LogoImage,
  LogoImageContainer,
  MenuContainer,
} from './LandingNavbar.styles';
import Image from 'next/image';
import NavLogo from '../../../assets/Joblys-logo-RGB-purple.png';
import { useRouter } from 'next/navigation';

const LandingNavbar = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };

  const handleGetStarted = () => {
    router.push('/profile-builder');
  };

  // const handleSignup = () => {
  //   router.push('/signup');
  // };

  return (
    <Container>
      <MenuContainer>
        <BrandContainer>
          <Brand>
            <LogoImageContainer>
              <LogoImage src={NavLogo} alt="hero-image" priority />
            </LogoImageContainer>
          </Brand>
        </BrandContainer>
        <ButtonsContainer>
          <LoginButton onClick={handleLogin}>Log in</LoginButton>
          <GetStartedButton onClick={handleGetStarted}>
            Get started
          </GetStartedButton>
        </ButtonsContainer>
      </MenuContainer>
    </Container>
  );
};

export default LandingNavbar;
