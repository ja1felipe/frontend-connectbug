import { BugReportService } from '@/bug-report/services/bug-report.service';
import { NotesService } from '@/bug-report/services/note.service';
import {
  BugReportType,
  StatusEnum,
  statusTranslated,
} from '@/bug-report/types/bug-report.types';
import Collapse from '@/components/Collapse';
import Modal from '@/components/Modal';
import AcceptPopup from '@/pages/home/_components/AcceptPopup';
import { isoDateToDMY } from '@/utils/date';
import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import Swal from 'sweetalert2';
import { Container, MainInfoContainer, SideInfoContainer } from './styles';

interface IBugReportModal {
  bugreport: BugReportType;
  onBugReportChange: (bugReport: BugReportType) => void;
}

const notesService = new NotesService();
const bugReportService = new BugReportService();

const BugReportModal = ({ bugreport, onBugReportChange }: IBugReportModal) => {
  const [newNote, setNewNote] = useState('');
  const [bugReportLocal, setBugReportLocal] = useState(bugreport);
  const [openModal, setOpenModal] = useState(false);

  const onCloseModal = useCallback(() => {
    setOpenModal(false);
  }, []);

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
      confirmButtonColor: '##9BC53D',
      cancelButtonColor: '#d33',
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
          });
      }
    });
  }, [bugReportLocal, onBugReportChangeLocal]);

  const BtnActions = useCallback(() => {
    if (bugReportLocal.status === StatusEnum.PENDING) {
      return (
        <>
          <button
            onClick={() => setOpenModal(true)}
            style={{ backgroundColor: '#9BC53D' }}
          >
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
        <>
          <button style={{ backgroundColor: '#9BC53D' }}>CONCLUIR</button>
        </>
      );
    }

    if (bugReportLocal.status === StatusEnum.DENIED) {
      return (
        <>
          <button
            onClick={() => setOpenModal(true)}
            style={{ backgroundColor: '#9BC53D' }}
          >
            ACEITAR
          </button>
        </>
      );
    }

    if (bugReportLocal.status === StatusEnum.CLOSED) {
      return (
        <>
          <button
            onClick={() => setOpenModal(true)}
            style={{ backgroundColor: '#9BC53D' }}
          >
            REABRIR
          </button>
        </>
      );
    }

    return <div />;
  }, [bugReportLocal.status, handleReject]);

  return (
    <Container id='bugreport-modal'>
      <Modal
        style={{ backgroundColor: 'transparent' }}
        onClose={onCloseModal}
        isOpen={openModal}
      >
        <AcceptPopup
          onBugReportChange={onBugReportChangeLocal}
          bugReport={bugReportLocal}
          onClose={onCloseModal}
        />
      </Modal>
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
                  <span>{note.created_by.name}</span>
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
