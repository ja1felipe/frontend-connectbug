import styled from 'styled-components';

export const Container = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  border-radius: 10px;
  max-width: 300px;
  border: 1px solid #6a6b83;
  filter: drop-shadow(0px 0px 7px rgba(76, 76, 76, 0.8));

  .content {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .btnContainer {
    display: flex;
    flex-direction: row;
    gap: 5px;
    button {
      cursor: pointer;
      padding: 10px;
      width: 100%;
      font-size: 14px;
      color: white;
      border: 1px solid #6a6b83;
    }
    button:hover {
      opacity: 0.9;
    }
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 0;
  justify-content: space-between;
  align-items: center;

  border-bottom: 1px solid grey;

  h4 {
    margin: 0;
  }
`;
