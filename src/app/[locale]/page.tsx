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
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

export default function Home({ id }: any) {
  const router = useRouter();
  const t = useTranslations('LandingPage');
  const locale = useLocale();

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
      <LandingNavbar locale={locale} />
      <BoxContainer>
        <Box>
          <Box3>
            <BoxHeader>
              {t('statement')}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginLeft: '5px',
                }}
              >
                <span
                  style={{
                    color: '#520668',
                  }}
                >
                  eazy
                </span>{' '}
                <span
                  style={{
                    color: '#f95d1d',
                  }}
                >
                  cv
                </span>{' '}
              </div>
              .
            </BoxHeader>
            <BoxBody>
              <ValueProposition>
                {t('valueProposition')}

                {/* Streamline your job application process with{' '}
                <span
                  style={{
                    color: '#520668',
                    fontWeight: '700',
                  }}
                >
                  eazy
                </span>
                <span
                  style={{
                    color: '#f95d1d',
                    fontWeight: '700',
                  }}
                >
                  cv
                </span>{' '}
                the ultimate platform for creating customized resumes and cover
                letters tailored to each job description.{' '}
                <span
                  style={{
                    color: '#3E0450',
                    fontWeight: '700',
                  }}
                >
                  eazy
                </span>
                <span
                  style={{
                    color: '#f95d1d',
                    fontWeight: '700',
                  }}
                >
                  cv
                </span>{' '}
                intelligently analyzes job postings and generates application
                materials that highlight your skills and experience effectively.
                Save time, impress employers, and secure interviews with{' '}
                <span
                  style={{
                    color: '#3E0450',
                    fontWeight: '700',
                  }}
                >
                  eazy
                </span>
                <span
                  style={{
                    color: '#f95d1d',
                    fontWeight: '700',
                  }}
                >
                  cv
                </span>{' '}
                at your fingertips. */}
              </ValueProposition>
            </BoxBody>
            <BoxHeader>
              <Link href={'/signup'}>
                <GetStartedButton onClick={handleGetStartedClick}>
                  {t('getStarted')}
                </GetStartedButton>
              </Link>
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
