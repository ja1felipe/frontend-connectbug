import styled from 'styled-components';

export const Outside = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  max-height: calc(100% - 40px);
`;
