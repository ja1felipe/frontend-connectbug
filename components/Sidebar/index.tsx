import React, { useCallback, useState } from 'react';
import { Icon } from '@iconify/react';

import { Container, Option } from './styles';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '@/auth/contexts/auth.context';
import SettingsModal from '@/components/SettingsModal';

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
];

const Sidebar: React.FC = () => {
  const { logout, user } = useAuth();
  const router = useRouter();

  const [openModal, setOpenModal] = useState(false);

  const onCloseModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  return (
    <Container>
      <SettingsModal onClose={onCloseModal} isOpen={openModal} />
      <Image width={195} height={100} src={'/assets/logo.png'} alt='a' />
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
      <Option onClick={() => setOpenModal(true)}>
        <Icon width={25} icon={'ph:gear-six'} />
        Dados pessoais
      </Option>
      <Option onClick={logout} style={{ marginTop: 'auto' }}>
        <Icon width={25} icon='mdi:exit-run' />
        Sair
      </Option>
      <span style={{ fontSize: 10, color: 'white', opacity: 0.5 }}>
        logged as: {user?.email}
      </span>
    </Container>
  );
};

export default Sidebar;
