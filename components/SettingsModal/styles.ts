import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 25px;
  gap: 10px;
  align-self: center;
  justify-self: center;
  margin: auto;
  background-color: #f2f2f2;
  border-radius: 5px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  label {
    color: #6a6b83;
  }
`;
