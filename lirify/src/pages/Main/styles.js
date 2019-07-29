import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;

  #lyrics {
    width: 100%;
    max-width: 580px;
    background: #fafafa;
    padding-left: 50px;
    padding-bottom: 20px;
    border-radius: 5px;
    margin-bottom: 50px;

    .fa {
      padding-top: 20px;
      padding-bottom: 15px;
      font-size: 60px !important;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 20px;
    }
  }

  #lyrics h2 {
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 24px;
  }
`;

export const Card = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 40px;

  .music {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    max-width: 580px;

    background: #fafafa;
    padding-top: 20px;
    padding-bottom: 20px;
    border-radius: 5px;
  }
  .music img {
    margin-left: 50px;
    border-radius: 2px;
  }

  .info {
    margin-left: 50px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    p {
      align-items: center;
    }
    span {
      margin: 5px;
      font-size: 24px;
    }

    #title {
      font-size: 18px;
    }

    button {
      background: #2ebd59;
      border-radius: 500px;
      color: #fff;
      border: 0;
      cursor: pointer;
      font-size: 10px;
      letter-spacing: 2px;
      font-weight: 700;
      min-width: 92px;
      padding: 10px;
      position: relative;
      text-align: center;
      white-space: nowrap;
      margin: 10px 10px 0 0px;
      float: left;
    }
  }
`;
