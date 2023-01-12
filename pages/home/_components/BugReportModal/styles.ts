import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #efefef;
  padding: 20px;
  opacity: 1;
  border-radius: 5px;
  overflow-y: auto;
  max-height: 70%;
  width: 720px;
`;

export const MainInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 70%;
  padding-right: 20px;
  gap: 20px;
  border-right: 2px solid #d9d9d9;
  height: fit-content;
  flex-grow: 2;
  .description {
    h2 {
      margin: 0;
      color: #c3423f;
      font-size: 26px;
      font-weight: bold;
    }
  }

  .screenshots {
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

  .notes {
    display: flex;
    flex-direction: column;
    gap: 5px;

    span {
      color: #2274a5;
      font-size: 20px;
      font-weight: bold;
    }

    .note {
      background-color: #fff;
      border-radius: 5px;
      padding: 5px;

      span {
        color: #6a6b83;
        font-size: 14px;
      }

      p {
        margin: 0;
        font-size: 16px;

        color: #6a6b83;
      }
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
      width: fit-content;
      margin-left: auto;
    }
  }
`;

export const SideInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  flex-grow: 1;
  gap: 10px;
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
