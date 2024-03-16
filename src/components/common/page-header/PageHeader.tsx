'use client';
import React, { FC, FormEvent, useEffect, useState } from 'react';
import {
  Button,
  ButtonContainer,
  Header,
  HeaderLinksContainer,
  HeaderMenuContainer,
  HorizontalLine,
  IconContainer,
  Input,
  InputContainer,
  Label,
  LeftContainer,
  LogoutButton,
  ModalItemContainer,
  Provider,
  ProviderButton,
  ProviderIcon,
  ProvidersContainer,
  ResumeButton,
  ResumeButtonIcon,
  ResumeButtonTitle,
  RightContainer,
  SeparatorContainer,
  SidebarContentContainer,
  SidebarHeader,
  SidebarHeaderClose,
  SidebarHeaderItem,
  SidebarMenuContainer,
  SidebarText,
  SignInButton,
  TextContainer,
  UserModal,

  // MenuLink,
  // MenuLinkButton,
  // RegisterButton,
  // RegisterLink,
  // SignInButton,
  // SignInLink,
  WelcomeTextContainer,
} from './PageHeader.styles';
import { useSession, signOut } from 'next-auth/react';
import { FaBell, FaUser, FaArrowLeft } from 'react-icons/fa';
import { useRouter, usePathname } from 'next/navigation';
import { SignOut } from '@/components/navbar/Navbar.styles';
import {
  FaArrowRightFromBracket,
  FaArrowRightToBracket,
  FaLinkedin,
} from 'react-icons/fa6';
import { IoCloseSharp, IoSettingsSharp } from 'react-icons/io5';
import { FcGoogle } from 'react-icons/fc';

interface PageHeaderProps {
  handleDownloadPDF: () => Promise<void>;
}

const PageHeader: FC<PageHeaderProps> = ({ handleDownloadPDF }) => {
  const router = useRouter();
  const pathname = usePathname();
  const isProfileBuilder = pathname === '/profile-builder';
  const isCoverLetterBuilder = pathname === '/coverletter-builder';

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const { data: session, status } = useSession();

  const toggleUserModal = () => {
    setIsUserModalOpen(!isUserModalOpen);
  };

  useEffect(() => {
    // Redirect to a login page if the session is not loading and the user is not authenticated
    if (status === 'authenticated') {
      if (!session) {
        router.push('/login');
      }
    }
  }, [status, session, router]);

  const navigateToResume = () => {
    router.push('/joblys/resumes');
  };

  const navigateToCoverLetter = () => {
    router.push('/joblys/cover-letters');
  };

  const getHeaderStyles = (): React.CSSProperties => {
    switch (pathname) {
      case '/profile-builder':
        return {
          backgroundColor: '#520668',
          color: 'white',
        };
      case '/coverletter-builder':
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
    await signOut({ callbackUrl: '/joblys/dashboard' });
  };
  const welcomeText = session ? `Welcome, ${session.user?.name}!` : '';

  const handleSignIn = () => {
    router.push('/login');
  };

  const [click, setClick] = useState(false);
  const categoryMenu = () => setClick(!click);

  return (
    <Header style={headerStyles}>
      <HeaderMenuContainer>
        <LeftContainer>
          {isProfileBuilder && (
            <ResumeButton onClick={navigateToResume}>
              <ResumeButtonIcon>
                <FaArrowLeft />
              </ResumeButtonIcon>
              <ResumeButtonTitle> Resume</ResumeButtonTitle>
            </ResumeButton>
          )}
          {isCoverLetterBuilder && (
            <ResumeButton onClick={navigateToCoverLetter}>
              <ResumeButtonIcon>
                <FaArrowLeft />
              </ResumeButtonIcon>
              <ResumeButtonTitle> Cover Letters</ResumeButtonTitle>
            </ResumeButton>
          )}
        </LeftContainer>
        <RightContainer>
          <ResumeButton onClick={handleDownloadPDF}>
            <ResumeButtonTitle>Download</ResumeButtonTitle>
          </ResumeButton>
          {/* <WelcomeTextContainer>{welcomeText}</WelcomeTextContainer>
              <LogoutButton onClick={handleSignOut}>Log out</LogoutButton> */}
          {/* <ResumeButton>
            <ResumeButtonTitle onClick={categoryMenu}>
              Download
            </ResumeButtonTitle>
            {click && (
              <SidebarMenuContainer
                className={click ? 'category active' : 'category'}
              >
                <SidebarHeader>
                  <SidebarHeaderItem>
                    <ResumeButton>
                      <ResumeButtonTitle>Account</ResumeButtonTitle>
                    </ResumeButton>
                  </SidebarHeaderItem>
                  <SidebarHeaderClose onClick={categoryMenu}>
                    <IoCloseSharp />
                  </SidebarHeaderClose>
                </SidebarHeader>
                <SidebarContentContainer>
                  <TextContainer>
                    <SidebarText>What is your email address?</SidebarText>
                  </TextContainer>
                  <InputContainer>
                    <Label>Email address</Label>
                    <Input placeholder="" />
                  </InputContainer>
                  <ButtonContainer>
                    <Button>Next</Button>
                  </ButtonContainer>
                  <SeparatorContainer>
                    <HorizontalLine></HorizontalLine>
                    <div style={{ padding: '0 5px', color: 'gray' }}>or</div>
                    <HorizontalLine></HorizontalLine>
                  </SeparatorContainer>
                  <ProvidersContainer>
                    <Provider>
                      <ProviderButton>
                        <ProviderIcon>
                          <FcGoogle />
                        </ProviderIcon>
                        Continue with Google
                      </ProviderButton>
                    </Provider>
                    <Provider>
                      <ProviderButton>
                        <ProviderIcon>
                          <FaLinkedin />
                        </ProviderIcon>
                        Continue with LinkedIn
                      </ProviderButton>
                    </Provider>
                  </ProvidersContainer>
                </SidebarContentContainer>
              </SidebarMenuContainer>
            )}
          </ResumeButton> */}
          {/* <HeaderLinksContainer>
              <IconContainer>
                <FaBell />
              </IconContainer>
            </HeaderLinksContainer> */}
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
                      <p>Settings</p>
                    </ModalItemContainer>
                    <ModalItemContainer>
                      <FaArrowRightFromBracket />
                      <p onClick={handleSignOut}>Log out</p>
                    </ModalItemContainer>
                  </UserModal>
                ) : (
                  <UserModal>
                    <ModalItemContainer onClick={handleSignIn}>
                      <FaArrowRightToBracket />
                      <p>Log in</p>
                    </ModalItemContainer>
                  </UserModal>
                )}
              </>
            )}
          </HeaderLinksContainer>
        </RightContainer>
      </HeaderMenuContainer>
    </Header>
  );
};

export default PageHeader;
