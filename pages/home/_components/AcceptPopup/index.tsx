import { BugReportService } from '@/bug-report/services/bug-report.service';
import { BugReportType, StatusEnum } from '@/bug-report/types/bug-report.types';
import { UserService } from '@/user/services/users.service';
import { UserType } from '@/user/types';
import React, { useEffect, useState } from 'react';
import { useCallback } from 'react';

import { Container, Header } from './styles';

const userService = new UserService();
const bugReportService = new BugReportService();

interface IAcceptPopup {
  onClose: () => void;
  onBugReportChange: (bugReport: BugReportType) => void;
  bugReport: BugReportType;
}

const AcceptPopup = ({
  onClose,
  onBugReportChange,
  bugReport,
}: IAcceptPopup) => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserType>();

  useEffect(() => {
    let mounted = true;
    const fetchUsers = () => {
      userService.getAll().then((res) => {
        if (mounted) setUsers(res.data);
      });
    };

    fetchUsers();
    return () => {
      mounted = false;
    };
  }, []);

  const handleSelectUser = useCallback(
    (id: string) => {
      const user = users.find((user) => user.id === id);
      setSelectedUser(user);
    },
    [users]
  );

  const handleConfirm = useCallback(() => {
    bugReportService
      .update(bugReport.id, {
        status: StatusEnum.ACCEPT,
        assigned_to_id: selectedUser?.id,
      })!
      .then(() => {
        const newBugReport = { ...bugReport };
        newBugReport.status = StatusEnum.ACCEPT;
        newBugReport.assigned_to_id = selectedUser?.id;
        newBugReport.assigned_to = selectedUser;
        onBugReportChange(newBugReport);
        onClose();
      });
  }, [bugReport, onBugReportChange, onClose, selectedUser]);

  return (
    <Container>
      <Header>
        <h4>Tem certeza?</h4>
      </Header>
      <div className='content'>
        <p>
          Por favor, para seguir com essa ação é necessário atribuir o bug
          report para algum dev da sua equipe ficar responsável por
          investiga-lo.
        </p>
        <label>Atribuir bug report para:</label>
        <select
          onChange={(e) => {
            handleSelectUser(e.target.value);
          }}
          defaultValue={''}
        >
          <option value={''} disabled>
            Selecione
          </option>
          {users.map((user) => {
            return (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            );
          })}
        </select>
      </div>

      <div className='btnContainer'>
        <button onClick={onClose} style={{ backgroundColor: '#c3423f' }}>
          Cancelar
        </button>
        <button
          onClick={handleConfirm}
          disabled={!selectedUser}
          style={{
            backgroundColor: !selectedUser ? 'grey' : '#9BC53D',
            cursor: !selectedUser ? 'not-allowed' : 'pointer',
            pointerEvents: !selectedUser ? 'none' : 'all',
          }}
        >
          Confirmar
        </button>
      </div>
    </Container>
  );
};

export default React.memo(AcceptPopup);
