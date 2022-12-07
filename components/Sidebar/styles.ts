import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #2274a5;
  align-items: center;
  width: fit-content;
  padding: 10px 30px;
  gap: 15px;
`;

interface IOption {
  selected?: boolean;
}

export const Option = styled.div<IOption>`
  display: flex;
  flex-direction: row;
  gap: 15px;
  padding: 10px 25px;
  color: white;
  width: 100%;
  justify-content: flex-end;
  box-sizing: border-box;
  font-size: 15px;
  opacity: ${(props) => (props.selected ? 1 : 0.8)};
  align-items: center;
  white-space: nowrap;

  border-width: 2px;
  border-style: solid;

  border-image: ${(props) =>
    props.selected
      ? 'linear-gradient(to right, #3454d1 0%, #efefef 100%) 0 0 100% 0'
      : 'linear-gradient(to right, #3454d185 0%, #efefef85 100%) 0 0 100% 0'};

  &:hover {
    border-image: linear-gradient(to right, #3454d1 0%, #efefef 100%) 0 0 100% 0;
    cursor: pointer;
    opacity: 1;
  }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #6a6b83;
  align-items: center;
  gap: 15px;
  padding: 10px 45px;
  color: white;
  border-radius: 10px;
`;
