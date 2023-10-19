'use client';

import {
  Box,
  Box2,
  BoxContainer,
  BoxHeader,
  Container,
  GetStartedButton,
} from './page.styles';
import Image from 'next/image';
import Image1 from '../assets/joblys-hero.png';
import { useRouter } from 'next/navigation';
import LandingNavbar from '@/components/navbar/landing-navbar/LandingNavbar';

export default function Home() {
  const router = useRouter();

  const handleGetStartedClick = () => {
    router.push('/pages/signup');
  };

  const isSmallScreen =
    typeof window !== 'undefined' && window.innerWidth <= 480;

  const imageWidth = isSmallScreen ? 300 : 500;
  const imageHeight = isSmallScreen ? 350 : 600;
  return (
    <Container>
      <LandingNavbar />
      <BoxContainer>
        <Box>
          <BoxHeader>Seamless. Joblys</BoxHeader>
          <BoxHeader>
            <p>
              AI-powered platform that helps job seekers find suitable job
              opportunities more efficiently. The AI could analyze a
              candidate&apos;s skills, experience, preferences, and career goals
              to match them with relevant job listings. The platform could also
              provide personalized job recommendations, based on the user&apos;s
              profile and historical job search behavior.
            </p>
          </BoxHeader>
          <BoxHeader>
            <GetStartedButton onClick={handleGetStartedClick}>
              GET STARTED
            </GetStartedButton>
          </BoxHeader>
        </Box>
        <Box2>
          <Image
            src={Image1}
            width={imageWidth}
            height={imageHeight}
            alt="hero-image"
            priority
          />
        </Box2>
      </BoxContainer>
    </Container>
  );
}
