import React, { CSSProperties, ReactNode, useEffect, useRef } from 'react';

import { Outside, Container } from './styles';

interface IModal {
  children: ReactNode;
  isOpen: boolean;
  onClose: (e: Event) => void;
  style?: CSSProperties;
}

const Modal = ({ children, isOpen, onClose, style }: IModal) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: Event): void {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose(event);
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
    <Outside style={style}>
      <Container ref={ref}>{children}</Container>
    </Outside>
  );
};

export default Modal;
