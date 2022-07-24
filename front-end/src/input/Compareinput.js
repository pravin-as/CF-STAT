import "../index.css";
import React from "react";
import styled from "styled-components";
import Button from "./Button.js";
import Input from "./Input.js";
function Compareinput({ setuser1, setuser2, setsubmit, exist1, exist2 }) {
  function nameChange1(val) {
    setuser1(val);
  }
  function nameChange2(val) {
    setuser2(val);
  }
  function submit(event) {
    setsubmit(event);
  }
  return (
    <MainContainer>
      <WelcomeText>Welcome</WelcomeText>
      <InputContainer>
        <Input
          type="text"
          placeholder="Codeforces User Handle"
          namechange={nameChange1}
        />
      </InputContainer>
      <ErrorText>{!exist1 && "User does not exist" }</ErrorText>
      <InputContainer>
        <Input
          type="text"
          placeholder="Codeforces User Handle"
          namechange={nameChange2}
        />
      </InputContainer>
      <ErrorText>{!exist2 && "User does not exist" }</ErrorText>
      <ButtonContainer>
        <Button content="Submit" onSubmit={submit} />
      </ButtonContainer>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 60vh;
  width: 30vw;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
  @media only screen and (max-width: 320px) {
    width: 80vw;
    height: 60vh;
    hr {
      margin-bottom: 0.3rem;
    }
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 360px) {
    width: 80vw;
    height: 60vh;
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 411px) {
    width: 80vw;
    height: 60vh;
  }
  @media only screen and (min-width: 768px) {
    width: 80vw;
    height: 60vh;
  }
  @media only screen and (min-width: 1024px) {
    width: 70vw;
    height: 60vh;
  }
  @media only screen and (min-width: 1280px) {
    width: 30vw;
    height: 60vh;
  }
`;

const WelcomeText = styled.h2`
  margin: 3rem 0 2rem 0;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 20%;
  width: 100%;
`;

const ButtonContainer = styled.div`
  margin: 1rem 0 2rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ErrorText = styled.p`
 margin: 1rem 0 1rem 0;
`;
export default Compareinput;
