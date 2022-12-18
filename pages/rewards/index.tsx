import withAuth from '@/hooks/withAuth';
import CreateReward from '@/pages/rewards/_components/CreateReward';
import InfoModal from '@/pages/rewards/_components/InfoModal';
import { RewardService } from '@/reward/services/reward.service';
import { RewardType } from '@/reward/types';
import { IconBtn, Table } from '@/styles/shared';
import { isoDateToDMY } from '@/utils/date';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

import { Button, Container } from './styles';

const rewardService = new RewardService();

const Reward: React.FC = () => {
  const [rewards, setRewards] = useState<RewardType[]>([]);

  const onCreateNewReward = useCallback((reward: RewardType) => {
    setRewards((prev) => [...prev, reward]);
  }, []);

  const onEditReward = useCallback(
    (reward: RewardType) => {
      const index = rewards.findIndex((rw) => rw.id === reward.id);
      const update = [...rewards];
      update[index] = { ...reward };
      setRewards(update);
    },
    [rewards]
  );

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

  const handleInfos = () => {
    Swal.fire({
      title: 'Recompensas',
      html: '<p>Recompensas são agrados que você pode dar a um usuário quando um bug que o mesmo reportou for concluido. Mas técnicamente falando tudo que uma recompensa cadastrada no ConnectBug faz é, enviar um request do tipo POST para a URL do webhook que você cadastrar, enviando no <code>body</code> da requisição, o ID e e-mail do usuário que reportou o bug, além do ID do bug report concluído. Além disso, se você desejar, o próprio ConnectBug enviará uma notificação avisando que o usuário ganhou uma recompensa.</p><p>Você pode testar se o webhook está funcionando clicando no ícone de ação verde, você deverá receber uma request POST com o body { "test" : "success"} no seu endpoint.</p>',
      icon: 'info',
      confirmButtonColor: '#9BC53D',
      confirmButtonText: 'Ok',
      target: '#bugreport-modal',
    });
  };

  const handleTest = (id: string) => {
    rewardService
      .test(id)
      .then(() => {
        toast('Teste enviado com sucesso', { type: 'success' });
      })
      .catch((error) => {
        toast(error.message, { type: 'error' });
      });
  };
  return (
    <Container>
      <h1>Recompensas</h1>
      <div
        style={{
          alignSelf: 'end',
          display: 'flex',
          flexDirection: 'row',
          gap: 5,
        }}
      >
        <Button onClick={handleInfos}>O QUE SÃO RECOMPENSAS</Button>
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
                  <div
                    style={{ display: 'flex', alignItems: 'center', gap: 15 }}
                  >
                    <InfoModal onEditReward={onEditReward} reward={reward} />
                    <div
                      onClick={() => handleTest(reward.id)}
                      style={{ height: 15 }}
                      title='Testar'
                    >
                      <IconBtn
                        width={15}
                        color='#9BC53D'
                        icon='pajamas:retry'
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default withAuth(Reward);
