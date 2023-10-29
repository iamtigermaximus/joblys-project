import FormHeader from '@/components/common/form-header/FormHeader';
import { Container } from '../page.styles';
import Login from '@/components/forms/login/Login';

const LoginPage = () => {
  return (
    <Container>
      <div>
        <title>LOG IN</title>
      </div>
      <FormHeader />
      <Login />
    </Container>
  );
};

export default LoginPage;
