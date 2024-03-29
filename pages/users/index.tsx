import CreateUser from './_components/CreateUser';
import { Table } from '@/styles/shared';
import { UserService } from '@/user/services/users.service';
import { UserType } from '@/user/types';
import { isoDateToDMY } from '@/utils/date';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Container } from './styles';
import InfoModal from './_components/InfoModal';

const userService = new UserService();

const Users: React.FC = () => {
  const [users, setUsers] = useState<UserType[]>([]);

  const onCreateNewUser = useCallback((user: UserType) => {
    setUsers((prev) => [...prev, user]);
  }, []);

  const onEditUser = useCallback(
    (newUser: UserType) => {
      const index = users.findIndex((user) => user.id === newUser.id);
      const update = [...users];
      update[index] = { ...newUser };
      setUsers(update);
    },
    [users]
  );

  useEffect(() => {
    userService
      .getAll()
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        toast(error.message, { type: 'error' });
      });
  }, []);

  return (
    <Container>
      <h1>Usuários</h1>
      <div
        style={{
          alignSelf: 'end',
          display: 'flex',
          flexDirection: 'row',
          gap: 5,
        }}
      >
        <CreateUser onCreateUser={onCreateNewUser} />
      </div>
      <Table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Cargo</th>
            <th>Criado em</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user.id}>
                <td title={user.name}>{user.name}</td>
                <td title={user.email}>{user.email}</td>
                <td title={user.role}>{user.role}</td>
                <td>{isoDateToDMY(user.created_at)}</td>
                <td>
                  <InfoModal onEditUser={onEditUser} user={user} />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Users;
