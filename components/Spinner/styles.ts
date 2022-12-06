import styled from 'styled-components';

interface ISpin {
  size: number;
  border: number;
}

export const Spin = styled.div<ISpin>`
  border: ${(props) => `${props.border}px`} solid #f3f3f3;
  border-top: ${(props) => `${props.border}px`} solid #3498db;
  border-radius: 50%;
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
