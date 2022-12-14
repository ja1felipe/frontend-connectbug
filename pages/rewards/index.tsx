import withAuth from '@/hooks/withAuth';
import { IconBtn } from '@/pages/home/styles';
import CreateReward from '@/pages/rewards/_components/CreateReward';
import { RewardService } from '@/reward/services/reward.service';
import { RewardType } from '@/reward/types';
import { Table } from '@/styles/shared';
import { isoDateToDMY } from '@/utils/date';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Container } from './styles';

const rewardService = new RewardService();

const Reward: React.FC = () => {
  const [rewards, setRewards] = useState<RewardType[]>([]);

  const onCreateNewReward = useCallback((reward: RewardType) => {
    setRewards((prev) => [...prev, reward]);
  }, []);

  useEffect(() => {
    rewardService
      .getAll()
      .then((res) => {
        setRewards(res.data);
      })
      .catch((error) => {
        toast(error.message, { type: 'error' });
      });
  }, []);
  return (
    <Container>
      <h1>Recompensas</h1>
      <div style={{ alignSelf: 'end' }}>
        <CreateReward onCreateReward={onCreateNewReward} />
      </div>
      <Table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>URL</th>
            <th>Status Notificação</th>
            <th>Titulo Notificação</th>
            <th>Texto Notificação</th>
            <th>Criado em</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {rewards &&
            rewards.map((reward) => (
              <tr key={reward.id}>
                <td title={reward.name}>{reward.name}</td>
                <td title={reward.url}>{reward.url}</td>
                <td title={reward.notification_active ? 'Ativo' : 'Desativado'}>
                  {reward.notification_active ? 'Ativo' : 'Desativado'}
                </td>
                <td title={reward.notification_title}>
                  {reward.notification_title || '-'}
                </td>
                <td title={reward.notification_text}>
                  {reward.notification_text || '-'}
                </td>
                <td>{isoDateToDMY(reward.created_at)}</td>
                <td>
                  <Link
                    href={`#${reward.id}`}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignContent: 'center',
                    }}
                  >
                    <IconBtn color='#2274A5' icon='ic:outline-remove-red-eye' />
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default withAuth(Reward);
