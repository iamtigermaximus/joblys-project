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
import Image1 from '@/assets/joblys-hero.png';
import { useRouter } from 'next/navigation';
import LandingNavbar from '@/components/navbar/landing-navbar/LandingNavbar';
import { v4 as uuidv4 } from 'uuid';

export default function Home({ id }: any) {
  const router = useRouter();

  const handleGetStartedClick = () => {
    if (!id) {
      const newId = uuidv4();
      router.push(`/resume-builder/resumes/${newId}`);
    } else {
      router.push(`/resume-builder/resumes/${id}`);
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
                Simplify the job application process with Joblys, the platform
                that crafts personalized resumes and cover letters tailored to
                each job description. Let Joblys analyze job postings and
                generate application materials that showcase your skills and
                experience effectively. Save time, impress employers, and land
                interviews with Joblys by your side.
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
