import SignUp from '@/components/forms/signup/SignUp';
import { Container } from '../page.styles';
import FormHeader from '@/components/common/form-header/FormHeader';

const SignupPage = () => {
  return (
    <Container>
      <div>
        <title>SIGN UP</title>
      </div>
      <FormHeader />
      <SignUp />
    </Container>
  );
};

export default SignupPage;
