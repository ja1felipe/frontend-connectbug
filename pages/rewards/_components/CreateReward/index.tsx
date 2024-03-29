import Modal from '@/components/Modal';
import { RewardService } from '@/reward/services/reward.service';
import { RewardRequestType, RewardType } from '@/reward/types';
import { Input } from '@/styles/shared';
import React, { FormEvent, useCallback, useState } from 'react';
import { toast } from 'react-toastify';

import { Button, Container, InputContainer, FormContainer } from './styles';

const rewardService = new RewardService();

interface ICreateReward {
  onCreateReward: (reward: RewardType) => void;
}

const CreateReward = ({ onCreateReward }: ICreateReward) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleCreate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body: RewardRequestType = {
      name,
      url,
      notification_active: false,
    };
    rewardService
      .create(body)
      .then((res) => {
        toast('Recompensa criada com sucesso', { type: 'success' });
        onCreateReward(res.data);
        handleClose();
      })
      .catch((error) => {
        toast(`Falha ao criar recompensa ${error.message}`, { type: 'error' });
      });
  };
  return (
    <>
      <Modal onClose={handleClose} isOpen={open}>
        <Container>
          <h2>Criar nova recompensa</h2>
          <FormContainer onSubmit={handleCreate}>
            <InputContainer>
              <label htmlFor='name'>Nome</label>
              <Input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Nome da recompensa'
                id='name'
              />
            </InputContainer>
            <InputContainer>
              <label htmlFor='url'>Webhook URL</label>
              <Input
                value={url}
                required
                onChange={(e) => setUrl(e.target.value)}
                placeholder='Url do webhook'
                id='url'
              />
            </InputContainer>
            <Button type='submit'>Criar recompensa</Button>
          </FormContainer>
        </Container>
      </Modal>
      <Button onClick={() => setOpen(true)}>Criar recompensa</Button>
    </>
  );
};

export default CreateReward;
