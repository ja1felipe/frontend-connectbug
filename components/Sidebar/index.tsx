import React from 'react';
import { Icon } from '@iconify/react';

import { Container, Option, Profile } from './styles';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '@/auth/contexts/auth.context';

const OPTIONS = [
  {
    label: 'Home',
    path: '/home',
    icon: 'ion:bug-outline',
  },
  {
    label: 'Usuários',
    path: '/users',
    icon: 'ph:user-circle',
  },
  {
    label: 'Recompensas',
    path: '/rewards',
    icon: 'fluent:reward-24-regular',
  },
  {
    label: 'Dados pessoais',
    path: '/settings',
    icon: 'ph:gear-six',
  },
];

const Sidebar: React.FC = () => {
  const { logout } = useAuth();
  const router = useRouter();

  return (
    <Container>
      <Image width={175} height={100} src={'/assets/logo.png'} alt='a' />
      {OPTIONS.map((option) => {
        return (
          <Link key={option.label} href={option.path}>
            <Option selected={router.pathname === option.path}>
              <Icon width={25} icon={option.icon} />
              {option.label}
            </Option>
          </Link>
        );
      })}
      <Option onClick={logout} style={{ marginTop: 'auto' }}>
        <Icon width={25} icon='mdi:exit-run' />
        Sair
      </Option>
    </Container>
  );
};

export default Sidebar;
