import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #efefef;
  padding: 20px;
  opacity: 1;
  border-radius: 5px;
  overflow-y: scroll;
  max-height: 70%;
`;

export const MainInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 70%;
  padding-right: 20px;
  gap: 20px;
  border-right: 2px solid #d9d9d9;
  .description {
    h2 {
      margin: 0;
      color: #c3423f;
      font-size: 26px;
      font-weight: bold;
    }
  }

  details {
    border-bottom: 2px solid #d9d9d9;
    padding: 5px 0;

    summary {
      color: #2274a5;
      font-size: 20px;
      font-weight: bold;
    }

    summary:hover {
      cursor: pointer;
    }
  }

  .screenshots {
    span {
      color: #2274a5;
      font-size: 20px;
      font-weight: bold;
    }

    div {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      margin-top: 5px;
      gap: 20px;
      padding: 20px;
      background-color: #d9d9d9;
      overflow-y: auto;

      span {
        flex-shrink: 0;
      }
    }
  }

  .notes {
    span {
      color: #2274a5;
      font-size: 20px;
      font-weight: bold;
    }

    textarea {
      padding: 5px;
      margin-top: 10px;
      width: 100%;
      resize: none;
      height: 3rem;
      box-sizing: border-box;
    }

    button {
      float: right;
      margin: 0;
    }
  }
`;

export const SideInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  gap: 10px;
  width: 100%;
  * {
    margin: 0;
  }

  span {
    color: #6a6b83;
  }

  p {
    text-transform: uppercase;
  }

  .actions {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;

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
