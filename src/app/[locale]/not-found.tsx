import React from 'react';
import { BoxContainer, Container } from './page.styles';
import LandingNavbar from '@/components/navbar/landing-navbar/LandingNavbar';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

const NotFound = () => {
  const t = useTranslations('LandingNavbar');
  const locale = useLocale();
  return (
    <Container>
      <LandingNavbar locale={locale} />
      <BoxContainer>
        <h1> {t('notFound')}</h1>
      </BoxContainer>
    </Container>
  );
};

export default NotFound;
