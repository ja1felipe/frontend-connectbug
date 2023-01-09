import { BugReportService } from '@/bug-report/services/bug-report.service';
import { NotesService } from '@/bug-report/services/note.service';
import {
  BugReportConcludeRequestType,
  BugReportType,
  StatusEnum,
  statusTranslated,
} from '@/bug-report/types/bug-report.types';
import Collapse from '@/components/Collapse';
import { RewardService } from '@/reward/services/reward.service';
import { RewardType } from '@/reward/types';
import { UserService } from '@/user/services/users.service';
import { UserType } from '@/user/types';
import { isoDateToDMY } from '@/utils/date';
import Image from 'next/image';
import React, { useCallback, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { Container, MainInfoContainer, SideInfoContainer } from './styles';

interface IBugReportModal {
  bugreport: BugReportType;
  onBugReportChange: (bugReport: BugReportType) => void;
}

const notesService = new NotesService();
const userService = new UserService();
const rewardService = new RewardService();
const bugReportService = new BugReportService();

const BugReportModal = ({ bugreport, onBugReportChange }: IBugReportModal) => {
  const [newNote, setNewNote] = useState('');
  const [bugReportLocal, setBugReportLocal] = useState(bugreport);
  const [users, setUsers] = useState<UserType[]>([]);
  const [rewards, setRewards] = useState<RewardType[]>([]);

  const handleCreateNote = () => {
    notesService
      .create({
        bug_report_id: bugreport.id,
        note: newNote,
      })
      .then((res) => {
        const notes = [...bugreport.notes, res.data];
        const bug_att = { ...bugreport, notes };
        onBugReportChangeLocal(bug_att);
        setNewNote('');
      });
  };

  const onBugReportChangeLocal = useCallback(
    (bugReport: BugReportType) => {
      setBugReportLocal({ ...bugReport });
      onBugReportChange({ ...bugReport });
    },
    [onBugReportChange]
  );

  const handleReject = useCallback(() => {
    Swal.fire({
      title: 'Você tem certeza?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#9BC53D',
      cancelButtonColor: '#c3423f',
      confirmButtonText: 'Confirmar',
      target: '#bugreport-modal',
    }).then((result) => {
      if (result.isConfirmed) {
        bugReportService
          .update(bugReportLocal.id, {
            status: StatusEnum.DENIED,
          })!
          .then(() => {
            const newBugReport = { ...bugReportLocal };
            newBugReport.status = StatusEnum.DENIED;
            onBugReportChangeLocal(newBugReport);
            toast('Bug Report rejeitado!', { type: 'success' });
          })
          .catch((error) => {
            toast(`Erro: ${error.message}`, { type: 'error' });
          });
      }
    });
  }, [bugReportLocal, onBugReportChangeLocal]);

  const userOptions = useMemo(async () => {
    const users = (await userService.getAll()).data;
    setUsers(users);
    const options: Record<string, string> = {};
    users.forEach((user) => (options[user.id] = user.name));
    return options;
  }, []);

  const handleAccept = useCallback(async () => {
    const { value: userId } = await Swal.fire({
      title: 'Atribua o Bug Report a alguém',
      target: '#bugreport-modal',
      input: 'select',
      inputOptions: userOptions,
      confirmButtonColor: '#9BC53D',
      cancelButtonColor: '#c3423f',
      inputPlaceholder: 'Selecione alguém',
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value === '') {
            resolve('Por favor, selecione alguém!');
          } else {
            resolve(null);
          }
        });
      },
    });

    if (userId) {
      bugReportService
        .update(bugReportLocal.id, {
          status: StatusEnum.ACCEPT,
          assigned_to_id: userId,
        })!
        .then(() => {
          const user = users.find((user) => user.id === userId);
          const newBugReport = { ...bugReportLocal };
          newBugReport.status = StatusEnum.ACCEPT;
          newBugReport.assigned_to_id = userId;
          newBugReport.assigned_to = user;
          onBugReportChangeLocal(newBugReport);
          toast('Bug Report aceito!', { type: 'success' });
        })
        .catch((error) => {
          toast(`Erro: ${error.message}`, { type: 'error' });
        });
    }
  }, [bugReportLocal, onBugReportChangeLocal, userOptions, users]);

  const rewardOptions = useMemo(async () => {
    const rewards = (await rewardService.getAll()).data;
    setRewards(rewards);
    const options: Record<string, string> = {
      '': 'Não enviar recompensa',
    };
    rewards.forEach((reward) => (options[reward.id] = reward.name));
    return options;
  }, []);

  const handleConclud = useCallback(async () => {
    const { value: rewardId, isConfirmed } = await Swal.fire({
      title: 'Gostaria de enviar uma recompensa?',
      text: 'Ao escolher uma recompensa uma request será enviada ao webhook atrelado a recompensa escolhida, no corpo dessa request estarão, o ID do usuário que criou o bug report, o email do usuário e o ID do bug report.',
      input: 'select',
      inputOptions: rewardOptions,
      showCancelButton: true,
      confirmButtonColor: '#9BC53D',
      cancelButtonColor: '#c3423f',
      confirmButtonText: 'Confirmar',
      target: '#bugreport-modal',
    });

    if (!isConfirmed) return;

    const body: BugReportConcludeRequestType = {};
    if (rewardId) {
      body.reward_id = rewardId;
    }

    bugReportService
      .conclude(bugReportLocal.id, body)!
      .then(() => {
        const newBugReport = { ...bugReportLocal };
        newBugReport.status = StatusEnum.CLOSED;
        onBugReportChangeLocal(newBugReport);
        toast('Bug Report concluído!', { type: 'success' });
      })
      .catch((error) => {
        toast(`Erro: ${error.message}`, { type: 'error' });
      });
  }, [bugReportLocal, onBugReportChangeLocal, rewardOptions]);

  const BtnActions = useCallback(() => {
    if (bugReportLocal.status === StatusEnum.PENDING) {
      return (
        <>
          <button onClick={handleAccept} style={{ backgroundColor: '#9BC53D' }}>
            ACEITAR
          </button>
          <button onClick={handleReject} style={{ backgroundColor: '#c3423f' }}>
            REJEITAR
          </button>
        </>
      );
    }

    if (bugReportLocal.status === StatusEnum.ACCEPT) {
      return (
        <button onClick={handleConclud} style={{ backgroundColor: '#9BC53D' }}>
          CONCLUIR
        </button>
      );
    }

    if (bugReportLocal.status === StatusEnum.DENIED) {
      return (
        <button onClick={handleAccept} style={{ backgroundColor: '#9BC53D' }}>
          ACEITAR
        </button>
      );
    }

    if (bugReportLocal.status === StatusEnum.CLOSED) {
      return (
        <button onClick={handleAccept} style={{ backgroundColor: '#9BC53D' }}>
          REABRIR
        </button>
      );
    }

    return <div />;
  }, [bugReportLocal.status, handleAccept, handleConclud, handleReject]);

  const handleImages = useCallback((url: string) => {
    Swal.fire({
      target: '#bugreport-modal',
      imageUrl: url,
      imageHeight: 400,
      imageAlt: 'print',
      confirmButtonText: 'Fechar',
      confirmButtonColor: '#c3423f',
    });
  }, []);

  return (
    <Container id='bugreport-modal'>
      <MainInfoContainer>
        <div className='description'>
          <h2>{bugReportLocal.title}</h2>
          <p>{bugReportLocal.description}</p>
        </div>

        <Collapse
          style={{ color: '#2274a5', fontSize: 20, fontWeight: 'bold' }}
          label='Passo-a-passo'
        >
          <div>
            <ol>
              {bugReportLocal.steps.map((step) => (
                <li key={step.id}>{step.description}</li>
              ))}
            </ol>
          </div>
        </Collapse>

        <Collapse
          style={{ color: '#2274a5', fontSize: 20, fontWeight: 'bold' }}
          label='Screenshots'
        >
          <div className='screenshots'>
            {bugReportLocal.screenshots.map((ss) => {
              return (
                <Image
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleImages(ss.url)}
                  key={ss.id}
                  width={140}
                  alt={ss.url}
                  height={100}
                  src={ss.url}
                />
              );
            })}
          </div>
        </Collapse>

        {bugReportLocal.deviceInfos ? (
          <Collapse
            style={{ color: '#2274a5', fontSize: 20, fontWeight: 'bold' }}
            label='Informações do aparelho'
          >
            <div>
              <ol>
                {Object.entries(bugReportLocal.deviceInfos).map(
                  ([key, value]) => (
                    <li style={{ listStyle: 'none' }} key={key}>
                      <strong>{key}</strong>: {value}
                    </li>
                  )
                )}
              </ol>
            </div>
          </Collapse>
        ) : null}

        <Collapse
          style={{ color: '#2274a5', fontSize: 20, fontWeight: 'bold' }}
          label='Anotações'
        >
          <div className='notes'>
            {bugReportLocal.notes.map((note, i) => {
              return (
                <div key={note.id} className='note'>
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <span>{note.created_by.name}</span>
                    <span style={{ fontWeight: 'normal' }}>
                      {isoDateToDMY(note.created_at)}
                    </span>
                  </div>
                  <p>{note.note}</p>
                </div>
              );
            })}

            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            />
            <button onClick={handleCreateNote}>Adicionar anotação</button>
          </div>
        </Collapse>
      </MainInfoContainer>
      <SideInfoContainer>
        <div className='status'>
          <span>status</span>
          <p>{statusTranslated[bugReportLocal.status]}</p>
        </div>

        <div className='created_at'>
          <span>criado em</span>
          <p>{isoDateToDMY(bugReportLocal.created_at)}</p>
        </div>

        <div className='assigned_to'>
          <span>atribuido a</span>
          <p>{bugReportLocal.assigned_to?.name || '-'}</p>
        </div>

        <div className='actions'>{<BtnActions />}</div>
      </SideInfoContainer>
    </Container>
  );
};

export default React.memo(BugReportModal);
