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
      }
    }
  }
`;
