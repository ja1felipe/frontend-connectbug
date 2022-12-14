import styled from 'styled-components';

export const Button = styled.button`
  cursor: pointer;
  padding: 10px;
  width: 100%;
  font-size: 14px;
  color: white;
  border: 1px solid #6a6b83;
  background-color: #9bc53d;
  text-transform: uppercase;

  &:hover {
    opacity: 0.9;
  }
`;

export const Container = styled.div`
  display: flex;
  background-color: #efefef;
  padding: 20px;
  border-radius: 5px;
  overflow-y: auto;
  max-height: 70%;
  flex-direction: column;
  gap: 10px;

  h2 {
    margin: 0;
    color: #c3423f;
    font-size: 26px;
    font-weight: bold;
  }
`;

export const FormContainer = styled.form`
  display: flex;
  overflow-y: auto;
  flex-direction: column;
  gap: 10px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  label {
    color: #6a6b83;
  }
`;
