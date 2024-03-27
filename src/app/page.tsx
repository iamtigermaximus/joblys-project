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
  ValueProposition,
} from './page.styles';
import Image from 'next/image';
import Image1 from '../assets/joblys-hero.png';
import { useRouter } from 'next/navigation';
import LandingNavbar from '@/components/navbar/landing-navbar/LandingNavbar';
import { v4 as uuidv4 } from 'uuid';

export default function Home({ id }: any) {
  const router = useRouter();

  const handleGetStartedClick = () => {
    if (!id) {
      const newId = uuidv4();
      router.push(`/profile-builder/resumes/${newId}`);
    } else {
      router.push(`/profile-builder/resumes/${id}`);
    }
  };

  return (
    <Container>
      <LandingNavbar />
      <BoxContainer>
        <Box>
          <Box3>
            <BoxHeader>Seamless. Joblys.</BoxHeader>
            <BoxBody>
              <ValueProposition>
                AI-powered platform that helps job seekers find suitable job
                opportunities more efficiently. The AI could analyze a
                candidate&apos;s skills, experience, preferences, and career
                goals to match them with relevant job listings. The platform
                could also provide personalized job recommendations, based on
                the user&apos;s profile and historical job search behavior.
              </ValueProposition>
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
