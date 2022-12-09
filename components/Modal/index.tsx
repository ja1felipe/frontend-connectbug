import React, { ReactNode, useEffect, useRef } from 'react';

import { Outside, Container } from './styles';

interface IModal {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ children, isOpen, onClose }: IModal) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: Event): void {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;
  return (
    <Outside>
      <Container ref={ref}>{children}</Container>
    </Outside>
  );
};

export default Modal;
