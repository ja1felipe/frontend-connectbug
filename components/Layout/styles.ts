import styled from 'styled-components';

export const Container = styled.div`
  margin: 50px;
  border-radius: 10px;
  overflow: hidden;
  height: calc(100vh - 102px);
  background-color: white;
  filter: drop-shadow(0px 0px 7px rgba(76, 76, 76, 0.8));
`;

export const Content = styled.div`
  height: 100%;
  background-color: #2274a5;
  display: flex;
  flex-direction: row;
  height: 100%;
`;

export const PageContainer = styled.div`
  margin: 10px;
  border-radius: 10px;
  background-color: white;
  width: 100%;
  padding: 5px;
  overflow: hidden;
`;
