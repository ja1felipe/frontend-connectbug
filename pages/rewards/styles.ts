import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 25px;
  gap: 10px;

  h1 {
    color: #c3423f;
    margin-bottom: 0;
  }
`;

export const Button = styled.button`
  cursor: pointer;
  padding: 10px;
  width: 100%;
  font-size: 14px;
  color: white;
  border: 1px solid #6a6b83;
  background-color: #2274a5;
  text-transform: uppercase;

  &:hover {
    opacity: 0.9;
  }
`;
