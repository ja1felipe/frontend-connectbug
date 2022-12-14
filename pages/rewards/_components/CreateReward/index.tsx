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
  const [checked, setChecked] = useState(false);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [notTitle, setNotTitle] = useState('');
  const [notText, setNotText] = useState('');

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleCreate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body: RewardRequestType = {
      name,
      url,
      notification_active: checked,
      notification_title: notTitle,
      notification_text: notText,
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
            <InputContainer
              style={{
                flexDirection: 'row',
                marginTop: 10,
                alignItems: 'center',
              }}
            >
              <Input
                onClick={() => setChecked((prev) => !prev)}
                checked={checked}
                type='radio'
                id='active_notification'
              />
              <label htmlFor='active_notification'>Enviar notificação</label>
            </InputContainer>
            <InputContainer>
              <label htmlFor='title_notification'>Titulo da notificação</label>
              <Input
                required={checked}
                value={notTitle}
                onChange={(e) => setNotTitle(e.target.value)}
                disabled={!checked}
                placeholder='Titulo da notificação'
                id='title_notification'
              />
            </InputContainer>
            <InputContainer>
              <label htmlFor='text_notification'>Texto da notificação</label>
              <Input
                value={notText}
                required={checked}
                onChange={(e) => setNotText(e.target.value)}
                disabled={!checked}
                placeholder='Texto da notificação'
                id='text_notification'
              />
            </InputContainer>
            <Button type='submit' onClick={() => setOpen(true)}>
              Criar recompensa
            </Button>
          </FormContainer>
        </Container>
      </Modal>
      <Button onClick={() => setOpen(true)}>Criar recompensa</Button>
    </>
  );
};

export default CreateReward;
