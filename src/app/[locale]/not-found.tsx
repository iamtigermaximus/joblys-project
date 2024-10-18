import React from 'react';
import { BoxContainer, Container } from './page.styles';
import LandingNavbar from '@/components/navbar/landing-navbar/LandingNavbar';

const NotFound = () => {
  return (
    <Container>
      <LandingNavbar />
      <BoxContainer>
        <h1> Page not found!</h1>
      </BoxContainer>
    </Container>
  );
};

export default NotFound;
