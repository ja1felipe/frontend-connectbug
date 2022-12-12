import { useAuth } from '@/auth/contexts/auth.context';
import { BugReportService } from '@/bug-report/services/bug-report.service';
import {
  BugReportType,
  statusTranslated,
} from '@/bug-report/types/bug-report.types';
import Modal from '@/components/Modal';
import withAuth from '@/hooks/withAuth';
import BugReportModal from '@/pages/home/_components/BugReportModal';
import { isoDateToDMY } from '@/utils/date';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';

import { Container, IconBtn, Table } from './styles';

const bugReportService = new BugReportService();

const Home: React.FC = () => {
  const [bugReports, setBugReports] = useState<BugReportType[]>([]);
  const [selectedBugReport, setSelectedBugReport] = useState<BugReportType>();

  const [openModal, setOpenModal] = useState(false);

  const router = useRouter();

  const onCloseModal = useCallback(() => {
    setOpenModal(false);
    router.replace('/home');
  }, [router]);

  const onChangeBugReport = (bugReport: BugReportType) => {
    const newArray = [...bugReports];

    const bugreportIndex = bugReports.findIndex((br) => br.id === bugReport.id);

    newArray[bugreportIndex] = bugReport;

    setBugReports(newArray);
  };

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

  useEffect(() => {
    const id = router.asPath.split('#')[1];
    if (!id || bugReports.length === 0) return;
    const bugreport = bugReports.find((br) => br.id === id);

    if (!bugreport) return;

    setSelectedBugReport(bugreport);
    setOpenModal(true);
  }, [bugReports, router.asPath]);

  const { isLogged } = useAuth();
  if (!isLogged) return null;
  return (
    <Container>
      {selectedBugReport && (
        <Modal isOpen={openModal} onClose={onCloseModal}>
          <BugReportModal
            onBugReportChange={onChangeBugReport}
            bugreport={selectedBugReport}
          />
        </Modal>
      )}
      <h1>Bugs Reportados</h1>
      <div>
        <Table>
          <thead className='table-head'>
            <tr>
              <th>Título</th>
              <th>Descrição</th>
              <th>Status</th>
              <th>Nº Passos</th>
              <th>Screenshots</th>
              <th>Anotações</th>
              <th>Criado em</th>
              <th>Ações</th>
            </tr>
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
                    <Link
                      href={`#${br.id}`}
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
                    </Link>
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
