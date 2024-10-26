'use client';
import React, { ChangeEvent } from 'react';
import {
  Brand,
  BrandContainer,
  Container,
  HeaderLinksContainer,
  IconContainer,
  MenuContainer,
  StyledOption,
  StyledSelect,
} from './FormHeader.styles';
import Image from 'next/image';
import NavLogo from '../../../assets/Joblys-logo-RGB-purple.png';
import { usePathname, useRouter } from 'next/navigation';
import { FaUser } from 'react-icons/fa';

interface FormHeaderProps {
  locale: string;
}

const FormHeader = ({ locale }: FormHeaderProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'en';

  const handleLogin = () => {
    router.push(`/${currentLocale}/login`);
  };

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value as string;
    const path = pathname.split('/').slice(2).join('/');
    router.push(`/${newLocale}/${path}`);
  };
  return (
    <Container>
      <MenuContainer>
        <BrandContainer>
          <Brand href="/">
            <Image
              src={NavLogo}
              width={160}
              height={40}
              alt="hero-image"
              priority
            />
          </Brand>
        </BrandContainer>
        <HeaderLinksContainer>
          <IconContainer onClick={handleLogin}>
            <FaUser />
          </IconContainer>
          <StyledSelect value={currentLocale} onChange={handleLanguageChange}>
            <StyledOption value="en">EN</StyledOption>
            <StyledOption value="fi">FI</StyledOption>
          </StyledSelect>
        </HeaderLinksContainer>
      </MenuContainer>
    </Container>
  );
};

export default FormHeader;
