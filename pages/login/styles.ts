import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: lightgray;
`;

export const FormContainer = styled.form`
  background-color: white;
  border: 1px solid grey;
  border-radius: 3px;
  padding: 30px;
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-direction: column;
  align-items: center;
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  flex-direction: column;
  align-items: baseline;
`;

export const Input = styled.input`
  font-size: 14px;
  padding: 10px;
  background-color: white;
  color: #464646;
  border: 1px solid lightgray;
  width: 230px;

  &::placeholder {
    font-size: 10px;
  }
`;

export const Label = styled.label`
  font-size: 16px;
  color: black;
`;
