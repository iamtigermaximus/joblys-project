'use client';
import React from 'react';
import {
  Brand,
  BrandContainer,
  Container,
  HeaderLinksContainer,
  IconContainer,
  MenuContainer,
} from './SubscriptionHeader.styles';
import Image from 'next/image';
import NavLogo from '../../../assets/Joblys-logo-RGB-purple.png';
import { useRouter } from 'next/navigation';
import { FaUser } from 'react-icons/fa';

const SubscriptionHeader = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
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
          {/* <IconContainer onClick={handleLogin}>
            <FaUser />
          </IconContainer> */}
        </HeaderLinksContainer>
      </MenuContainer>
    </Container>
  );
};

export default SubscriptionHeader;
