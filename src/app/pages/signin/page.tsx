'use client';
import PageHeader from '@/components/page-header/PageHeader';
import { Container } from '../../page.styles';
import SignInForm from './form';
// import 'transition-style'; transition-style="in:circle:top-right"

const SignIn = () => {
  return (
    <Container>
      <PageHeader />
      <SignInForm />
    </Container>
  );
};

export default SignIn;
