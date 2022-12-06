import React from 'react';

import {
  Button,
  Container,
  InnerContainer,
  Input,
  InputContainer,
  Label,
} from './styles';

const Login: React.FC = () => {
  return (
    <Container>
      <InnerContainer>
        <InputContainer>
          <Label>email</Label>
          <Input placeholder='exemplo@exemplo.com' />
        </InputContainer>
        <InputContainer>
          <Label>senha</Label>
          <Input />
        </InputContainer>
        <Button>Entrar</Button>
      </InnerContainer>
    </Container>
  );
};

export default Login;
