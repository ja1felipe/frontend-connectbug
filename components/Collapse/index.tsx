import { Icon } from '@iconify/react';
import React, { CSSProperties, ReactNode, useState } from 'react';

import { Label } from './styles';

interface ICollapse {
  label: string;
  children: ReactNode;
  style: CSSProperties;
}

const Collapse = ({ label, children, style }: ICollapse) => {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Label style={style} onClick={toggle}>
        {label}
        <Icon
          width={30}
          icon={
            open
              ? 'material-symbols:keyboard-arrow-down'
              : 'material-symbols:keyboard-arrow-right'
          }
        />
      </Label>
      {open && <div className='toggle'>{children}</div>}
    </div>
  );
};

export default Collapse;
