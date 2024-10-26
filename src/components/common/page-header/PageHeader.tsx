'use client';
import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import {
  Header,
  HeaderLinksContainer,
  HeaderMenuContainer,
  IconContainer,
  LeftContainer,
  ModalItemContainer,
  ResumeButton,
  ResumeButtonIcon,
  ResumeButtonTitle,
  RightContainer,
  StyledOption,
  StyledSelect,
  UserModal,
} from './PageHeader.styles';
import { useSession, signOut } from 'next-auth/react';
import { FaUser, FaArrowLeft } from 'react-icons/fa';
import { useRouter, usePathname } from 'next/navigation';
import {
  FaArrowRightFromBracket,
  FaArrowRightToBracket,
} from 'react-icons/fa6';
import { IoSettingsSharp } from 'react-icons/io5';
import { Resume } from '@/types/resume';
import DownloadPDFButton from '@/components/templates/resume/defaultTemplate/DownloadPDFButton';
import { Coverletter } from '@/types/coverletter';
import DownloadCoverLetterButton from '@/components/templates/coverletter/coverletterTemplate/DownloadCoverLetterButton';
import { useLocale, useTranslations } from 'next-intl';

interface PageHeaderProps {
  id: string;
  resumeInfo: Resume;
  coverLetterInfo?: Coverletter;
}

const PageHeader: FC<PageHeaderProps> = ({
  id,
  resumeInfo,
  coverLetterInfo,
}) => {
  const t = useTranslations('PageHeader');
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const isResumeBuilder =
    pathname === `/${locale}/resume-builder/resumes/${id}`;
  const isCoverLetterBuilder =
    pathname === `/${locale}/coverletter-builder/coverletters/${id}`;

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const currentLocale = pathname.split('/')[1] || 'en';
  const { data: session, status } = useSession();

  const toggleUserModal = () => {
    setIsUserModalOpen(!isUserModalOpen);
  };

  useEffect(() => {
    if (status === 'authenticated') {
      if (!session) {
        router.push(`/${locale}/login`);
      }
    }
  }, [status, session, router, locale]);

  const navigateToResume = () => {
    if (status === 'authenticated') {
      router.push(`/${locale}/eazyCV/resumes`);
    } else {
      router.push(`/${locale}/login`);
    }
  };

  const navigateToCoverLetter = () => {
    router.push('/eazyCV/cover-letters');
  };

  const getHeaderStyles = (): React.CSSProperties => {
    switch (pathname) {
      case `/${locale}/resume-builder/resumes/${id}`:
        return {
          backgroundColor: '#520668',
          color: 'white',
        };
      case `/${locale}/coverletter-builder/coverletters/${id}`:
        return {
          backgroundColor: '#520668',
          color: 'white',
        };
      default:
        return {
          backgroundColor: 'white',
        };
    }
  };

  const headerStyles = getHeaderStyles();

  const handleSignOut = async (e: FormEvent) => {
    e.preventDefault();
    await signOut({ callbackUrl: '/' });
  };
  const welcomeText = session ? `Welcome, ${session.user?.name}!` : '';

  const handleSignIn = () => {
    router.push('/login');
  };

  const [click, setClick] = useState(false);
  const categoryMenu = () => setClick(!click);

  const handleDownloadClick = () => {
    if (!session) {
      router.push('/login');
    }
  };

  const handleSettings = () => {
    router.push('/eazyCV/settings');
    setIsUserModalOpen(false);
  };

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value as string;
    const path = pathname.split('/').slice(2).join('/');
    router.push(`/${newLocale}/${path}`);
  };

  return (
    <Header style={headerStyles}>
      <HeaderMenuContainer>
        <LeftContainer>
          {isResumeBuilder && (
            <ResumeButton onClick={navigateToResume}>
              <ResumeButtonIcon>
                <FaArrowLeft />
              </ResumeButtonIcon>
              <ResumeButtonTitle> {t('resumeButton')}</ResumeButtonTitle>
            </ResumeButton>
          )}
          {isCoverLetterBuilder && (
            <ResumeButton onClick={navigateToCoverLetter}>
              <ResumeButtonIcon>
                <FaArrowLeft />
              </ResumeButtonIcon>
              <ResumeButtonTitle> {t('coverletterButton')}</ResumeButtonTitle>
            </ResumeButton>
          )}
        </LeftContainer>
        <RightContainer>
          {isResumeBuilder && (
            <ResumeButton onClick={session ? undefined : handleDownloadClick}>
              <DownloadPDFButton
                resumeInfo={resumeInfo}
                color="white"
                disabled={!session}
              />
            </ResumeButton>
          )}

          {isCoverLetterBuilder && (
            <ResumeButton>
              <DownloadCoverLetterButton
                coverLetterInfo={coverLetterInfo}
                color="white"
              />
            </ResumeButton>
          )}

          <HeaderLinksContainer>
            <IconContainer onClick={toggleUserModal}>
              <FaUser />
            </IconContainer>

            {isUserModalOpen && (
              <>
                {session ? (
                  <UserModal>
                    <ModalItemContainer>
                      <IoSettingsSharp />
                      <p onClick={handleSettings}>{t('settings')}</p>
                    </ModalItemContainer>
                    <ModalItemContainer>
                      <FaArrowRightFromBracket />
                      <p onClick={handleSignOut}>{t('logout')}</p>
                    </ModalItemContainer>
                  </UserModal>
                ) : (
                  <UserModal>
                    <ModalItemContainer onClick={handleSignIn}>
                      <FaArrowRightToBracket />
                      <p>{t('login')}</p>
                    </ModalItemContainer>
                  </UserModal>
                )}
              </>
            )}
          </HeaderLinksContainer>
          <StyledSelect value={currentLocale} onChange={handleLanguageChange}>
            <StyledOption value="en">EN</StyledOption>
            <StyledOption value="fi">FI</StyledOption>
          </StyledSelect>
        </RightContainer>
      </HeaderMenuContainer>
    </Header>
  );
};

export default PageHeader;
