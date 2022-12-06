import { useRouter } from 'next/router';
import { NextComponentType } from 'next';
import { useEffect } from 'react';
import { useAuth } from '@/auth/contexts/auth.context';

function withAuth<T extends object>(Component: NextComponentType<T>) {
  const Auth = (props: T) => {
    const { isLogged, user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLogged) {
        router.push('/login');
        return;
      }
    }, [isLogged, router, user]);

    return <Component {...props} />;
  };

  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
}

export default withAuth;
