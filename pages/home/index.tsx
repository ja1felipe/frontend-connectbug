import { useAuth } from '@/auth/contexts/auth.context';
import Sidebar from '@/components/Sidebar';
import withAuth from '@/hooks/withAuth';
import React from 'react';

import { Container } from './styles';

const Home: React.FC = () => {
  const { logout, user, isLogged } = useAuth();
  if (!isLogged) return null;
  return (
    <Container>
      <div>
        <ul>
          {user &&
            Object.entries(user).map(([key, val]) => (
              <li key={key}>{key + '-' + val}</li>
            ))}
        </ul>
      </div>
      <button onClick={logout}>oi</button>
    </Container>
  );
};

export default withAuth(Home);
