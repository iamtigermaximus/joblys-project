'use client';

import {
  Box,
  Box2,
  Box3,
  BoxContainer,
  BoxHeader,
  BoxBody,
  Container,
  GetStartedButton,
  ImageContainer,
} from './page.styles';
import Image from 'next/image';
import Image1 from '../assets/joblys-hero.png';
import { useRouter } from 'next/navigation';
import LandingNavbar from '@/components/navbar/landing-navbar/LandingNavbar';

export default function Home() {
  const router = useRouter();

  const handleGetStartedClick = () => {
    router.push('/profile-builder');
  };

  // const isSmallScreen =
  //   typeof window !== 'undefined' && window.innerWidth <= 480;

  // const imageWidth = isSmallScreen ? 200 : 500;
  // const imageHeight = isSmallScreen ? 350 : 600;
  return (
    <Container>
      <LandingNavbar />
      <BoxContainer>
        <Box>
          <Box3>
            <BoxHeader>Seamless. Joblys.</BoxHeader>
            <BoxBody>
              <p>
                AI-powered platform that helps job seekers find suitable job
                opportunities more efficiently. The AI could analyze a
                candidate&apos;s skills, experience, preferences, and career
                goals to match them with relevant job listings. The platform
                could also provide personalized job recommendations, based on
                the user&apos;s profile and historical job search behavior.
              </p>
            </BoxBody>
            <BoxHeader>
              <GetStartedButton onClick={handleGetStartedClick}>
                GET STARTED
              </GetStartedButton>
            </BoxHeader>
          </Box3>
        </Box>
        <Box2>
          <ImageContainer>
            <Image
              src={Image1}
              layout="fill"
              objectFit="contain"
              alt="hero-image"
              priority
            />
          </ImageContainer>
        </Box2>
      </BoxContainer>
    </Container>
  );
}
