import { Icon } from '@iconify/react';
import styled from 'styled-components';

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  thead {
    border-top: 1px solid #6a6b83;
    th {
      line-height: 30px;
      color: #6a6b83;
      font-weight: normal;
      text-align: left;
      vertical-align: bottom;
      padding: 10px;
      text-transform: uppercase;
    }
  }

  tbody {
    background-color: #efefef;

    tr {
      td {
        padding: 10px;
        color: #454554;
        max-width: 150px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }
`;

export const Input = styled.input`
  padding: 10px;
  background-color: #d9d9d9;
  color: #6a6b83;
  border: 1px solid #6a6b83;

  &:invalid {
    border: 1px solid #c3423f;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export const IconBtn = styled(Icon)`
  cursor: pointer;
  font-size: 20px;
`;

export const Button = styled.button`
  font-size: 16px;
  color: white;
  border: 1px solid lightgray;
  background-color: #2d91f9;
  text-transform: uppercase;
  padding: 10px;
  align-self: flex-end;
  border-radius: 3px;
  width: 120px;
  display: flex;
  justify-content: center;
  &:hover {
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  }
`;
