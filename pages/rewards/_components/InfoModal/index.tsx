import Modal from '@/components/Modal';
import Spinner from '@/components/Spinner';
import { InputContainer } from '@/pages/rewards/_components/CreateReward/styles';
import { RewardService } from '@/reward/services/reward.service';
import { RewardType } from '@/reward/types';
import { Button, IconBtn, Input } from '@/styles/shared';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Container } from './styles';

const rewardService = new RewardService();

interface IInfoModal {
  reward: RewardType;
  onEditReward: (reward: RewardType) => void;
}

const InfoModal = ({ reward, onEditReward }: IInfoModal) => {
  const [localReward, setLocalReward] = useState(reward);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    setName(reward.name);
    setUrl(reward.url);
  }, [reward.name, reward.url]);

  const router = useRouter();

  useEffect(() => {
    const id = router.asPath.split('#')[1];
    if (!id) return;

    if (id === localReward.id) {
      setOpen(true);
    }
  }, [localReward.id, router.asPath]);

  const handleClose = useCallback(() => {
    router.push('/rewards');
    setEdit(false);
    setOpen(false);
  }, [router]);

  const handleSave = () => {
    setLoading(true);
    const body = {
      name: name,
      url: url,
      notification_active: false,
    };

    rewardService
      .update(localReward.id, body)
      .then((res) => {
        const rewardUpdated = res.data;
        setLocalReward(rewardUpdated);
        onEditReward(rewardUpdated);
        setEdit(false);
        toast('Recompensa atualizada com sucesso.', { type: 'success' });
      })
      .catch((error) => {
        toast(`Erro ao atualizar recompensa: ${error.message}.`, {
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
                placeholder='Nome da recompensa'
                id='name'
              />
            ) : (
              <span>{localReward.name}</span>
            )}
          </InputContainer>
          <InputContainer>
            <label>Webhook URL</label>
            {edit ? (
              <Input
                value={url}
                required
                onChange={(e) => setUrl(e.target.value)}
                placeholder='Url do webhook'
                id='url'
              />
            ) : (
              <span>{localReward.url}</span>
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
        href={`#${localReward.id}`}
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
