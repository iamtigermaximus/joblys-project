'use client';
import React from 'react';
import {
  Brand,
  BrandContainer,
  Container,
  HeaderLinksContainer,
  IconContainer,
  MenuContainer,
} from './FormHeader.styles';
import Image from 'next/image';
import NavLogo from '../../../assets/Joblys-logo-RGB-purple.png';
import { useRouter } from 'next/navigation';
import { FaUser } from 'react-icons/fa';

const FormHeader = () => {
  const router = useRouter();

  const handleLogin = () => {
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
        <HeaderLinksContainer>
          <IconContainer onClick={handleLogin}>
            <FaUser />
          </IconContainer>
        </HeaderLinksContainer>
      </MenuContainer>
    </Container>
  );
};

export default FormHeader;
