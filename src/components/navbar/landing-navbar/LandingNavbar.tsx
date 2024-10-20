'use client';
import React, { ChangeEvent } from 'react';
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
  StyledOption,
  StyledSelect,
} from './LandingNavbar.styles';
import Image from 'next/image';
import NavLogo from '@/assets/Joblys-logo-RGB-purple.png';
import { useRouter, usePathname } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface LandingNavbarProps {
  locale: string;
}
const LandingNavbar = ({ locale }: LandingNavbarProps) => {
  const t = useTranslations('LandingNavbar');
  const router = useRouter();
  const pathname = usePathname();
  const id = uuidv4();

  const handleLogin = () => {
    router.push(`/${locale}/login`);
  };

  // const handleGetStarted = () => {
  //   if (!id) {
  //     const newId = uuidv4();
  //     router.push(`/resume-builder/resumes/${newId}`);
  //   } else {
  //     router.push(`/resume-builder/resumes/${id}`);
  //   }
  // };

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value as string;
    const path = pathname.split('/').slice(2).join('/');
    router.push(`/${newLocale}/${path}`);
  };

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
          <Link href={`/${locale}/signup`} style={{ textDecoration: 'none' }}>
            <GetStartedButton>{t('getStarted')}</GetStartedButton>
          </Link>
          <StyledSelect value={locale} onChange={handleLanguageChange}>
            <StyledOption value="en">EN</StyledOption>
            <StyledOption value="fi">FI</StyledOption>
          </StyledSelect>
        </ButtonsContainer>
      </MenuContainer>
    </Container>
  );
};

export default LandingNavbar;
