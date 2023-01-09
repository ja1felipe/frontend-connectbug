import Modal from '@/components/Modal';
import Spinner from '@/components/Spinner';
import { InputContainer } from '@/pages/rewards/_components/CreateReward/styles';
import { Button, IconBtn, Input, Select, Option } from '@/styles/shared';
import { UserService } from '@/user/services/users.service';
import { Role, roleTranslated, UserType } from '@/user/types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Container } from './styles';

const userService = new UserService();

interface IInfoModal {
  user: UserType;
  onEditUser: (user: UserType) => void;
}

const InfoModal = ({ user, onEditUser }: IInfoModal) => {
  const [localUser, setLocalUser] = useState(user);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
  }, [user.email, user.name, user.role]);

  const router = useRouter();

  useEffect(() => {
    const id = router.asPath.split('#')[1];
    if (!id) return;

    if (id === user.id) {
      setOpen(true);
    }
  }, [user.id, router.asPath]);

  const handleClose = useCallback(() => {
    router.push('/users');
    setEdit(false);
    setOpen(false);
  }, [router]);

  const handleSave = () => {
    setLoading(true);
    const body = {
      name: name,
      email: email,
      role: role as Role,
    };

    userService
      .update(localUser.id, body)
      .then((res) => {
        const userUpdated = res.data;
        setLocalUser(userUpdated);
        onEditUser(userUpdated);
        setEdit(false);
        toast('Usuário atualizado com sucesso.', { type: 'success' });
      })
      .catch((error) => {
        toast(`Erro ao atualizar usuário: ${error.message}.`, {
          type: 'error',
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <Modal onClose={handleClose} isOpen={open}>
        <Container>
          <InputContainer>
            <label>Nome</label>
            {edit ? (
              <Input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Nome do usuário'
                id='name'
              />
            ) : (
              <span>{localUser.name}</span>
            )}
          </InputContainer>
          <InputContainer>
            <label>Email</label>
            {edit ? (
              <Input
                value={email}
                required
                type='email'
                onChange={(e) => setEmail(e.target.value)}
                placeholder='E-mail do usuário'
                id='email'
              />
            ) : (
              <span>{localUser.email}</span>
            )}
          </InputContainer>
          <InputContainer>
            <label>Título da notificação</label>
            {edit ? (
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
            ) : (
              <span>{localUser.role}</span>
            )}
          </InputContainer>
          {edit ? (
            <Button
              style={{ width: '100%' }}
              disabled={loading}
              onClick={handleSave}
            >
              {loading ? <Spinner border={4} size={15} /> : 'Salvar'}
            </Button>
          ) : (
            <Button style={{ width: '100%' }} onClick={() => setEdit(true)}>
              Editar
            </Button>
          )}
        </Container>
      </Modal>
      <Link
        href={`#${localUser.id}`}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          cursor: 'pointer',
        }}
      >
        <IconBtn width={20} color='#2274A5' icon='ic:outline-remove-red-eye' />
      </Link>
    </div>
  );
};

export default InfoModal;
