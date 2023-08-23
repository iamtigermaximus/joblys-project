'use client';
import React, { ChangeEvent, FormEventHandler, useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import {
  Container,
  LoginContainer,
  InputContainer,
  LoginTitleContainer,
  LoginTitle,
  InputLabel,
  Input,
  ForgotPasswordContainer,
  ForgotPasswordLink,
  SignInButtonContainer,
  SignInButton,
  CreateAccountContainer,
  CreateAccountTitle,
  CreateAccountButton,
  ErrorContainer,
} from './SignInForm.styles';
import { useSearchParams, useRouter } from 'next/navigation';

interface Credentials {
  username: string;
  password: string;
}

const SignInForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/profile';
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState<Credentials>({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setFormValues({ username: '', password: '' });

      const res = await signIn('credentials', {
        redirect: false,
        ...formValues,
      });

      setLoading(false);

      console.log(res);
      if (!res?.error) {
        router.push('/profile');
      } else {
        setError('Invalid username or password');
      }
    } catch (error: any) {
      setLoading(false);
      setError(error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  return (
    <Container>
      <div>
        <title>SIGN IN</title>
      </div>
      <LoginContainer>
        <form onSubmit={onSubmit}>
          <InputContainer>
            <LoginTitleContainer>
              <LoginTitle>Sign In</LoginTitle>
            </LoginTitleContainer>
            <InputLabel>Username</InputLabel>
            <Input
              value={formValues?.username}
              onChange={handleChange}
              type="text"
              name="username"
              placeholder="Enter username"
            />
            <InputLabel>Password</InputLabel>
            <Input
              value={formValues?.password}
              onChange={handleChange}
              name="password"
              type="password"
              placeholder="Enter password"
            />
            <ErrorContainer>{error && <p>{error}</p>}</ErrorContainer>
            <ForgotPasswordContainer>
              <Link href={'/auth/forgot-password'}>
                <ForgotPasswordLink>Forgot your password?</ForgotPasswordLink>
              </Link>
            </ForgotPasswordContainer>
            <SignInButtonContainer>
              <SignInButton type="submit" disabled={loading}>
                {loading ? 'loading...' : 'Sign In'}
              </SignInButton>
            </SignInButtonContainer>
            <CreateAccountContainer>
              <CreateAccountTitle>
                Don&apos;t have an account yet?
              </CreateAccountTitle>
            </CreateAccountContainer>
            <SignInButtonContainer>
              <Link href={'/pages/signup'}>
                <CreateAccountButton>Create account</CreateAccountButton>
              </Link>
            </SignInButtonContainer>
          </InputContainer>
        </form>
      </LoginContainer>
    </Container>
  );
};
export default SignInForm;
// 'use client';
// import { useState, FormEvent } from 'react';
// import { signIn } from 'next-auth/react';
// import { ErrorContainer } from './SignInForm.styles';
// import { useRouter } from 'next/navigation';

// interface Credentials {
//   username: string;
//   password: string;
// }

// export default function SignIn() {
//   const [credentials, setCredentials] = useState<Credentials>({
//     username: '',
//     password: '',
//   });
//   const [error, setError] = useState('');
//   const router = useRouter();

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();

//     const response = await signIn('credentials', {
//       redirect: false,
//       ...credentials,
//     });

//     if (!response?.error) {
//       router.push('/profile');
//     } else {
//       setError('Invalid username or password');
//     }
//   };

//   return (
//     <div>
//       <h2>Sign In</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="username">Username</label>
//           <input
//             type="text"
//             id="username"
//             name="username"
//             value={credentials.username}
//             onChange={(e) =>
//               setCredentials({ ...credentials, username: e.target.value })
//             }
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={credentials.password}
//             onChange={(e) =>
//               setCredentials({ ...credentials, password: e.target.value })
//             }
//           />
//         </div>
//         <ErrorContainer>{error && <p>{error}</p>}</ErrorContainer>
//         <button type="submit">Sign In</button>
//       </form>
//     </div>
//   );
// }
