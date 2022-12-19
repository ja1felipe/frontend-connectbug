import Modal from '@/components/Modal';
import { Input, Option, Select } from '@/styles/shared';
import { UserService } from '@/user/services/users.service';
import {
  CreateUserRequestType,
  Role,
  roleTranslated,
  UserType,
} from '@/user/types';
import React, { FormEvent, useCallback, useState } from 'react';
import { toast } from 'react-toastify';

import { Button, Container, InputContainer, FormContainer } from './styles';

const userService = new UserService();

interface ICreateUser {
  onCreateUser: (user: UserType) => void;
}

const CreateUser = ({ onCreateUser }: ICreateUser) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(Role.ADMIN);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleCreate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body: CreateUserRequestType = {
      name,
      email,
      password,
      role: role as Role,
    };
    userService
      .create(body)
      .then((res) => {
        toast('Usuário criado com sucesso', { type: 'success' });
        onCreateUser(res.data);
        handleClose();
      })
      .catch((error) => {
        toast(`Falha ao criar usuário ${error.message}`, { type: 'error' });
      });
  };
  return (
    <>
      <Modal onClose={handleClose} isOpen={open}>
        <Container>
          <h2>Criar novo usuário</h2>
          <FormContainer onSubmit={handleCreate}>
            <InputContainer>
              <label htmlFor='name'>Nome</label>
              <Input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Nome do usuário'
                id='name'
              />
            </InputContainer>
            <InputContainer>
              <label htmlFor='email'>E-mail</label>
              <Input
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder='E-mail do usuário'
                id='email'
              />
            </InputContainer>
            <InputContainer>
              <label htmlFor='password'>Senha</label>
              <Input
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type='password'
                placeholder='Senha do usuário'
                id='password'
              />
            </InputContainer>
            <InputContainer>
              <label htmlFor='role'>Cargo</label>
              <Select
                onChange={(e) => setRole(e.target.value as Role)}
                required
              >
                {Object.entries(roleTranslated).map(([key, value]) => {
                  return (
                    <Option value={key} key={key}>
                      {value}
                    </Option>
                  );
                })}
              </Select>
            </InputContainer>
            <Button type='submit'>Criar usuário</Button>
          </FormContainer>
        </Container>
      </Modal>
      <Button onClick={() => setOpen(true)}>Criar usuário</Button>
    </>
  );
};

export default CreateUser;
