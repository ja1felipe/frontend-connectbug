import React from 'react';

import { Spin } from './styles';
interface ISpin {
  size: number;
  border: number;
}
const Spinner = ({ size, border }: ISpin) => {
  return <Spin size={size} border={border} />;
};

export default Spinner;
