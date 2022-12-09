import { useAuth } from '@/auth/contexts/auth.context';
import { BugReportService } from '@/bug-report/services/bug-report.service';
import { BugReportType, statusTranslated } from '@/bug-report/types';
import Modal from '@/components/Modal';
import withAuth from '@/hooks/withAuth';
import { isoDateToDMY } from '@/utils/date';
import { Icon } from '@iconify/react';
import React, { useCallback, useEffect, useState } from 'react';

import { Container, IconBtn, Table } from './styles';

const bugReportService = new BugReportService();

const Home: React.FC = () => {
  const [bugReports, setBugReports] = useState<BugReportType[]>([]);

  const [openModal, setOpenModal] = useState(true);

  const onCloseModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  useEffect(() => {
    bugReportService
      .getAll()
      .then((res) => {
        setBugReports(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const { isLogged } = useAuth();
  if (!isLogged) return null;
  return (
    <Container>
      <Modal isOpen={openModal} onClose={onCloseModal}>
        opa
      </Modal>
      <h1>Bugs Reportados</h1>
      <div>
        <Table>
          <thead className='table-head'>
            <th>Título</th>
            <th>Descrição</th>
            <th>Status</th>
            <th>Nº Passos</th>
            <th>Screenshots</th>
            <th>Anotações</th>
            <th>Criado em</th>
            <th>Ações</th>
          </thead>

          <tbody>
            {bugReports &&
              bugReports.map((br) => (
                <tr key={br.id}>
                  <td>{br.title}</td>
                  <td>{br.description}</td>
                  <td>{statusTranslated[br.status]}</td>
                  <td>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                      }}
                    >
                      {br.steps.length}
                      <Icon width={10} icon='fa6-solid:person-walking' />
                    </div>
                  </td>
                  <td>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                      }}
                    >
                      {br.screenshots.length}
                      <Icon width={18} icon='mingcute:pic-line' />
                    </div>
                  </td>
                  <td>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                      }}
                    >
                      {br.notes.length}
                      <Icon
                        width={18}
                        icon='material-symbols:sticky-note-2-outline'
                      />
                    </div>
                  </td>
                  <td>{isoDateToDMY(br.created_at)}</td>
                  <td>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignContent: 'center',
                      }}
                    >
                      <IconBtn
                        color='#2274A5'
                        icon='ic:outline-remove-red-eye'
                      />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default withAuth(Home);
