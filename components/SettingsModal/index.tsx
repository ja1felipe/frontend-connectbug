import React, { useEffect, useState } from 'react';
import { Button, Input } from '@/styles/shared';
import { Container, InputContainer } from './styles';
import { useAuth } from '@/auth/contexts/auth.context';
import Modal from '@/components/Modal';
import Spinner from '@/components/Spinner';
import { UserService } from '@/user/services/users.service';
import { toast } from 'react-toastify';
import { UserJwtType } from '@/user/types';

const userService = new UserService();

interface ISettingsModal {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal = ({ isOpen, onClose }: ISettingsModal) => {
  const { user } = useAuth();
  const [localUser, setLocalUser] = useState<Partial<UserJwtType>>(user!);
  const [edit, setEdit] = useState(false);

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    setName(localUser!.name!);
    setEmail(localUser!.email!);
  }, [localUser]);

  const validate = () => {
    setIsValid(password === confirmPassword);
  };

  const handleSave = () => {
    setLoading(true);
    const body = {
      name: name,
      email: email,
    };

    userService
      .update(localUser!.id!, body)
      .then((res) => {
        const userUpdated = res.data;
        setLocalUser(userUpdated);
        setEdit(false);
        toast('Dados atualizados com sucesso.', { type: 'success' });
      })
      .catch((error) => {
        toast(`Erro ao atualizar usuário: ${error.message}.`, {
          type: 'error',
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Container>
        <h3 style={{ margin: 5, color: '#c3423f' }}>Dados pessoais</h3>
        <InputContainer>
          <label>Nome</label>
          {edit ? (
            <Input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Novo nome'
              id='name'
            />
          ) : (
            <span>{localUser!.name}</span>
          )}
        </InputContainer>

        <InputContainer>
          <label>E-mail</label>
          {edit ? (
            <Input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Novo email'
              id='email'
              type='email'
            />
          ) : (
            <span>{localUser!.email}</span>
          )}
        </InputContainer>

        <InputContainer>
          <label>Nova senha</label>
          {edit ? (
            <>
              <Input
                type='password'
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                onBlur={validate}
              />
              <label>Confirme a senha</label>
              <Input
                type='password'
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                onBlur={validate}
              />
              {isValid ? null : (
                <p style={{ color: 'red', fontSize: 14 }}>
                  As senhas precisam ser iguais.
                </p>
              )}
            </>
          ) : (
            <span>************</span>
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
  );
};

export default SettingsModal;
