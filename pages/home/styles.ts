import { Icon } from '@iconify/react';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 25px;

  h1 {
    color: #c3423f;
  }
`;

export const IconBtn = styled(Icon)`
  cursor: pointer;
  font-size: 20px;
`;
