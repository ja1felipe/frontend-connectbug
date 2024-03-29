import { useAuth } from '@/auth/contexts/auth.context';
import Spinner from '@/components/Spinner';
import { NextPageWithLayout } from '@/pages/_app';
import { Button } from '@/styles/shared';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { FormEvent, useEffect, useState } from 'react';

import {
  Container,
  FormContainer,
  Input,
  InputContainer,
  Label,
} from './styles';

const Login: NextPageWithLayout = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { login, isLogged } = useAuth();

  useEffect(() => {
    if (isLogged) router.replace('/home');
  }, [isLogged, router]);

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    login(email, password)
      .then((res) => {
        if (res) router.push('/home');
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Container>
      <FormContainer onSubmit={handleLogin}>
        <Image width={195} height={100} src={'/assets/logo-dark.png'} alt='a' />

        <InputContainer>
          <Label htmlFor='email'>email</Label>
          <Input
            value={email}
            id='email'
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            placeholder='exemplo@exemplo.com'
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor='password'>senha</Label>
          <Input
            value={password}
            id='password'
            onChange={(e) => setPassword(e.target.value)}
            type='password'
          />
        </InputContainer>
        <Button disabled={loading} type='submit'>
          {loading ? <Spinner size={15} border={4} /> : 'Entrar'}
        </Button>
      </FormContainer>
    </Container>
  );
};
Login.getLayout = (page) => page;
export default Login;
