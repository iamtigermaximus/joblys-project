import FormHeader from '@/components/common/form-header/FormHeader';
import { Container } from '../page.styles';
import Login from '@/components/forms/login/Login';
// import 'transition-style'; transition-style="in:circle:top-right"

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
