import "./index.css";
import React, { useState, useRef } from "react";
import CollapsibleExample from "./CollapsibleExample";
import styled from "styled-components";
import Button from "./input/Button.js";
import Chartbar from "./Chartbar";
import { Chart } from "react-google-charts";
import Show from "./Show";
import "./single.css";
import PuffLoader from "react-spinners/PuffLoader";


export default function Individual() {
  const input = useRef(null);
  const [username, setUsername] = useState("");
  const [exist, setExist] = useState(2);
  const [user, setUser] = useState([]);
  const [sub, setSub] = useState([]);
  const [lang, setLang] = useState([]);
  const [rating, setRating] = useState([]);
  const [problem_num, setProblem_num] = useState([]);
  const [loading, setLoading] = useState(false);
  function details() {
    const fetchdata = async () => {
      const username1 = input.current.value;
      setUsername(username1);
      const response = await fetch(
        `https://codeforces.com/api/user.rating?handle=${username1}`
      );
      if (response.ok) {
        setExist(1);
        const submission = await fetch(
          `https://codeforces.com/api/user.status?handle=${username1}`
        );
        const userdata = await response.json();
        const submission_data = await submission.json();
        const submit = new Map();
        const language = new Map();
        const rate = new Map();
        const problem_number = new Map();
        const problem_name = new Map();
        submission_data.result.forEach((sub) => {
          let cnt = submit.get(sub.verdict) ?? 0;
          let num = language.get(sub.programmingLanguage) ?? 0;
          let cnt1 = rate.get(sub.problem.rating) ?? 0;
          let cnt2 = problem_number.get(sub.problem.index.substring(0, 1)) ?? 0;
          cnt++;
          num++;
          if (sub.verdict === "OK") {
            let val = problem_name.get(sub.problem.name);
            if (!val) {
              cnt1++;
              cnt2++;
            }
            problem_name.set(sub.problem.name, 1);
          }
          language.set(sub.programmingLanguage, num);
          submit.set(sub.verdict, cnt);
          rate.set(sub.problem.rating, cnt1);
          problem_number.set(sub.problem.index.substring(0, 1), cnt2);
        });
        const arr = [["Verdict", "rating"]];
        const arr1 = [["Verdict", "rating"]];
        const arr2 = [];
        const arr4 = [];
        const verdicts = new Map();
        verdicts.set("OK", "AC");
        verdicts.set("WRONG_ANSWER", "WA");
        verdicts.set("TIME_LIMIT_EXCEEDED", "TLE");
        verdicts.set("MEMORY_LIMIT_EXCEEDED", "MLE");
        for (const [key, value] of submit) {
          if (key !== undefined) {
            arr.push([verdicts.get(key) ?? key, value]);
          }
        }
        for (const [key, value] of language) {
          if (key !== undefined) arr1.push([key, value]);
        }
        for (const [key, value] of rate) {
          if (key !== undefined) arr2.push({ name: key, Rating: value });
        }
        for (const [key, value] of problem_number) {
          if (key !== undefined) {
            arr4.push({ name: key, Question: value });
          }
        }
        const arr3 = [...arr2].sort((a, b) => a.name - b.name);
        const arr5 = [...arr4].sort((a, b) =>
          a.name > b.name ? 1 : a.name < b.name ? -1 : 0
        );
        setSub(arr);
        setLang(arr1);
        setRating(arr3);
        setProblem_num(arr5);
        setUser(userdata.result.reverse());
        setLoading(false);
      } else {
        setExist(false);
      }
    };
    fetchdata();
  }

  function onSubmit(event) {
    event.preventDefault();
    setLoading(true);
    details();
  }

  function Details() {
    return (
      <div>
        <div>
          <div className="heading heading-light">
            <h1>{username}</h1>
          </div>
        </div>
        <div className="rating">
          <div className="ratingpara">Problem rating of {username}</div>
          <Chartbar data={rating} var="Rating" />
        </div>
        <div className="rating">
          <div className="ratingpara">Level of {username}</div>
          <Chartbar data={problem_num} var="Question" />
        </div>
        <div className="pie-container">
          <div className="piechart">
            <Chart
              chartType="PieChart"
              data={sub}
              options={{
                backgroundColor: "#1c1e26",
                title: `Verdicts of ${username}`,
                is3D: true,
                pieSliceText: "label",
                legend: "none",
                titleTextStyle: {
                  color: "#c4a88a",
                  fontName: "'Cormorant SC', serif",
                  fontSize: "20",
                },
              }}
              width="600px"
              height="600px"
            />
          </div>

          <div className="piechart2">
            <Chart
              chartType="PieChart"
              data={lang}
              options={{
                backgroundColor: "#1c1e26",
                title: `Languages used by ${username}`,
                is3D: true,
                pieSliceText: "label",
                legend: "none",
                titleTextStyle: {
                  color: "#c4a88a",
                  fontName: "'Cormorant SC', serif",
                  fontSize: "20",
                },
              }}
              width="600px"
              height="600px"
            />
          </div>
        </div>

        <div className="bigtable">
          <Show table={user} />
        </div>
      </div>
    );
  }

  function Form() {
    return (
      <form
        method="post"
        //action="/individual"
        onSubmit={onSubmit}
        className="styling"
      >
        {/* <Username setsubmit={onSubmit} exist={exist}/> */}
        <MainContainer>
          <WelcomeText
            style={{ fontFamily: "'Cormorant SC', serif", color: "#c4a88a" }}
          >
            Welcome
          </WelcomeText>
          <InputContainer>
            <StyledInput
              type="text"
              placeholder="Codeforces User Handle"
              ref={input}
            />
          </InputContainer>
          <ErrorText>{!exist && "User does not exist"}</ErrorText>
          <ButtonContainer>
            <Button content="Submit" />
          </ButtonContainer>
        </MainContainer>
      </form>
    );
  }
  return (
    <div className="individual">
      <CollapsibleExample />
      {exist !== 1 && <Form />}
      {loading && (
        <div className="loadingscreen">
          <PuffLoader
            size={30}
            color={"#c4a88a"}
            loading={loading}
          />
        </div>
      )}
      {exist === 1 && !loading && <Details />}
    </div>
  );
}

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 50vh;
  width: 30vw;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 #1c1e26;
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  -webkit-box-shadow: -1px 1px 5px 9px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: -1px 1px 5px 9px rgba(0, 0, 0, 0.75);
  box-shadow: -1px 1px 5px 9px rgba(0, 0, 0, 0.75);
  border-radius: 10px;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
  @media only screen and (max-width: 320px) {
    width: 80vw;
    height: 50vh;
    hr {
      margin-bottom: 0.3rem;
    }
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 360px) {
    width: 80vw;
    height: 50vh;
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 411px) {
    width: 80vw;
    height: 50vh;
  }
  @media only screen and (min-width: 768px) {
    width: 80vw;
    height: 50vh;
  }
  @media only screen and (min-width: 1024px) {
    width: 70vw;
    height: 50vh;
  }
  @media only screen and (min-width: 1280px) {
    width: 30vw;
    height: 50vh;
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

const StyledInput = styled.input`
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 #1c1e26;
  border-radius: 2rem;
  width: 80%;
  height: 3rem;
  padding: 1rem;
  border: none;
  outline: none;
  color: #3c354e;
  font-size: 1rem;
  font-weight: bold;
  &:focus {
    display: inline-block;
    box-shadow: 0 0 0 0.2rem #c4a88a;
    backdrop-filter: blur(12rem);
    border-radius: 2rem;
  }
  &::placeholder {
    color: #c4a88a;
    font-weight: 100;
    font-size: 1rem;
  }
`;
