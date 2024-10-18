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
import NavLogo from '@/assets/Joblys-logo-RGB-purple.png';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const LandingNavbar = () => {
  const t = useTranslations('LandingNavbar');
  const router = useRouter();
  const id = uuidv4();

  const handleLogin = () => {
    router.push('/login');
  };

  // const handleGetStarted = () => {
  //   if (!id) {
  //     const newId = uuidv4();
  //     router.push(`/resume-builder/resumes/${newId}`);
  //   } else {
  //     router.push(`/resume-builder/resumes/${id}`);
  //   }
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
          <LoginButton onClick={handleLogin}>{t('login')}</LoginButton>
          {/* <GetStartedButton onClick={handleGetStarted}>
            Get started
          </GetStartedButton> */}
          <Link href={'/signup'} style={{ textDecoration: 'none' }}>
            <GetStartedButton>{t('getStarted')}</GetStartedButton>
          </Link>
        </ButtonsContainer>
      </MenuContainer>
    </Container>
  );
};

export default LandingNavbar;
