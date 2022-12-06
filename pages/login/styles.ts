import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: lightgray;
`;

export const InnerContainer = styled.div`
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

export const Button = styled.button`
  font-size: 16px;
  color: white;
  border: 1px solid lightgray;
  background-color: #2d91f9;
  text-transform: uppercase;
  padding: 10px;
  align-self: flex-end;
  border-radius: 3px;

  &:hover {
    cursor: pointer;
  }
`;
