import { useAuth } from '@/auth/contexts/auth.context';
import withAuth from '@/hooks/withAuth';
import React from 'react';

// import { Container } from './styles';

const Home: React.FC = () => {
  const { logout, user, isLogged } = useAuth();
  if (!isLogged) return null;
  return (
    <>
      <ul>
        {user &&
          Object.entries(user).map(([key, val]) => (
            <li key={key}>{key + '-' + val}</li>
          ))}
      </ul>
      <button onClick={logout}>oi</button>
    </>
  );
};

export default withAuth(Home);
