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

  const handlelogin = () => {
    router.push('/login');
  };
  
  return (
    <Container>
      <MenuContainer>
        <BrandContainer>
          <Brand href="/joblys/dashboard">
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
          <SignupButton>Sign up</SignupButton>
          <LoginButton onClick={handlelogin}>Log in</LoginButton>
        </ButtonsContainer>
      </MenuContainer>
    </Container>
  );
};

export default LandingNavbar;
