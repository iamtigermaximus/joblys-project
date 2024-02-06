'use client';
import React from 'react';
import {
  Brand,
  BrandContainer,
  ButtonsContainer,
  Container,
  LoginButton,
  MenuContainer,
  SignupButton,
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
            <Image
              src={NavLogo}
              width={150}
              height={50}
              alt="hero-image"
              priority
            />
          </Brand>
        </BrandContainer>
        <ButtonsContainer>
          <LoginButton onClick={handleLogin}>Log in</LoginButton>
          <SignupButton onClick={handleGetStarted}>Get started</SignupButton>
        </ButtonsContainer>
      </MenuContainer>
    </Container>
  );
};

export default LandingNavbar;
