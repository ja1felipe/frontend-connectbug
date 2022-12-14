import { BugReportService } from '@/bug-report/services/bug-report.service';
import { NotesService } from '@/bug-report/services/note.service';
import {
  BugReportType,
  StatusEnum,
  statusTranslated,
} from '@/bug-report/types/bug-report.types';
import Collapse from '@/components/Collapse';
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
const bugReportService = new BugReportService();

const BugReportModal = ({ bugreport, onBugReportChange }: IBugReportModal) => {
  const [newNote, setNewNote] = useState('');
  const [bugReportLocal, setBugReportLocal] = useState(bugreport);
  const [users, setUsers] = useState<UserType[]>([]);

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

  const options = useMemo(async () => {
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
      inputOptions: options,
      confirmButtonColor: '#9BC53D',
      cancelButtonColor: '#c3423f',
      inputPlaceholder: 'Selecione alguém',
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          console.log(value);
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
  }, [bugReportLocal, onBugReportChangeLocal, options, users]);

  const handleConclud = useCallback(() => {
    Swal.fire({
      title: 'Você tem certeza?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#9BC53D',
      cancelButtonColor: '#c3423f',
      confirmButtonText: 'Confirmar',
      target: '#bugreport-modal',
    })
      .then((result) => {
        if (result.isConfirmed) {
          bugReportService.conclude(bugReportLocal.id)!.then(() => {
            const newBugReport = { ...bugReportLocal };
            newBugReport.status = StatusEnum.CLOSED;
            onBugReportChangeLocal(newBugReport);
            toast('Bug Report concluído!', { type: 'success' });
          });
        }
      })
      .catch((error) => {
        toast(`Erro: ${error.message}`, { type: 'error' });
      });
  }, [bugReportLocal, onBugReportChangeLocal]);

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

  return (
    <Container id='bugreport-modal'>
      <MainInfoContainer>
        <div className='description'>
          <h2>{bugReportLocal.title}</h2>
          <p>
            {bugReportLocal.description}Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Nunc lectus urna, tristique at fermentum ut,
            vestibulum at mi. Suspendisse potenti. In euismod, urna vitae
            porttitor congue, ipsum augue accumsan nisl, venenatis efficitur leo
            arcu ut quam. Vivamus viverra tempus tellus quis hendrerit.
            Pellentesque non porttitor dui, ut efficitur lacus. Donec in turpis
            sit amet metus interdum volutpat sed in elit. Aliquam purus dui,
            facilisis ac velit semper, tempus lacinia sem. Etiam eget nunc
            consectetur, placerat orci fringilla, laoreet nunc. Duis sodales
            posuere arcu, hendrerit pretium nisl vulputate id. Praesent
            sollicitudin lorem quis lorem sagittis congue. Nullam in congue
            sapien. Nullam elementum lacus erat, quis lobortis purus vehicula a.
            Fusce vitae dui sodales, luctus magna a, tristique libero.
          </p>
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

        <div className='created_by'>
          <span>criado por</span>
          <p>{bugReportLocal.created_by.name}</p>
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
