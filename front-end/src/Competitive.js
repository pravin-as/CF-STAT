import React, { useRef, useState } from "react";
import CollapsibleExample from "./CollapsibleExample";
import "./index.css";
import styled from "styled-components";
import Button from "./input/Button.js";
import Chart from "react-google-charts";
import "./compare.css";
import ChartbarCompare from "./ChartbarCompare";
import Chartbar2 from "./Chartbar2";
import PuffLoader from "react-spinners/PuffLoader";
export default function Competitive() {
  const input1 = useRef(null);
  const input2 = useRef(null);
  const [username1, setUsername1] = useState("");
  const [username2, setUsername2] = useState("");
  const [exist1, setexist1] = useState(2);
  const [exist2, setexist2] = useState(2);
  const contest = [];
  let userSub1 = {},
    userSub2 = {};
  const [RatingGraph, setRatingGraph] = useState([]);
  const [noofContest, setContest] = useState([]);
  const [ratingChange, setRatingChange] = useState([]);
  const [updown, setupdown] = useState([]);
  const [levels, setLevels] = useState([]);
  const [ratings, setratings] = useState([]);
  const [commonContest, setCommonContest] = useState([]);
  const common_level = [],
    common_rating = [],
    common_Contest = [];

  const [loading, setLoading] = useState(true);
  function rating(userinfo) {
    const n = userinfo.length;
    const currRate = userinfo[n - 1].newRating;
    let maxRate = -100,
      minRate = 10000,
      maxUp = -100,
      maxDown = 1000,
      bestRank = 1000000,
      worstRank = -1;
    // timeline store karna hai
    const common = [];
    for (let i = 0; i < n; i++) {
      common.push({
        name: userinfo[i].contestName,
        rank: userinfo[i].rank,
        old: userinfo[i].oldRating,
        new: userinfo[i].newRating,
      });
      maxRate = Math.max(maxRate, userinfo[i].newRating);
      minRate = Math.min(minRate, userinfo[i].newRating);
      maxUp = Math.max(maxUp, userinfo[i].newRating - userinfo[i].oldRating);
      maxDown = Math.min(
        maxDown,
        userinfo[i].newRating - userinfo[i].oldRating
      );
      bestRank = Math.min(bestRank, userinfo[i].rank);
      worstRank = Math.max(worstRank, userinfo[i].rank);
    }
    return {
      length: n,
      curr: currRate,
      maxRate: maxRate,
      minRate: minRate,
      maxUp: maxUp,
      maxDown: maxDown,
      bestRank: bestRank,
      worstRank: worstRank,
      common: common,
    };
  }
  function problems(problem) {
    const problem_name = new Map();
    const problem_rate = new Map();
    const problem_lvl = new Map();
    problem.forEach((sub) => {
      let cnt = problem_name.get(sub.problem.name) ?? 0;
      let cnt1 = problem_rate.get(String(sub.problem.rating)) ?? 0;
      let cnt2 = problem_lvl.get(sub.problem.index.substring(0, 1)) ?? 0;
      if (!cnt) {
        problem_name.set(sub.problem.name, 1);
        problem_rate.set(String(sub.problem.rating), cnt1 + 1);
        problem_lvl.set(sub.problem.index.substring(0, 1), cnt2 + 1);
      }
    });

    return { rate: problem_rate, level: problem_lvl };
  }
  function Common(user1, user2, userN1, userN2) {
    const common_rate = new Map();
    for (const [key, value] of user1.rate) {
      const cnt = common_rate.get(key) ?? 0;
      if (!cnt && key) common_rate.set(key, 1);
    }
    for (const [key, value] of user2.rate) {
      const cnt = common_rate.get(key) ?? 0;
      if (!cnt && key) common_rate.set(key, 1);
    }
    for (const [key, value] of common_rate) {
      if (key !== "undefined") {
        common_rating.push({
          name: key,
          [userN1]: user1.rate.get(key) ?? 0,
          [userN2]: user2.rate.get(key) ?? 0,
        });
      }
    }

    const common_lvl = new Map();
    for (const [key, value] of user1.level) {
      const cnt = common_lvl.get(key) ?? 0;
      if (!cnt) common_lvl.set(key, 1);
    }
    for (const [key, value] of user2.level) {
      const cnt = common_lvl.get(key) ?? 0;
      if (!cnt) common_lvl.set(key, 1);
    }
    for (const [key, value] of common_lvl) {
      common_level.push({
        name: key,
        [userN1]: user1.level.get(key) ?? 0,
        [userN2]: user2.level.get(key) ?? 0,
      });
    }
    common_rating.sort((a, b) => Number(a.name) - Number(b.name));
    common_level.sort((a, b) => (a.name > b.name ? 1 : -1));
  }
  function common_contest(contest, user1, user2) {
    const user1map = new Map();
    const user2map = new Map();
    const com_con = new Map();
    for (let i = 0; i < contest[0].common.length; i++) {
      user1map.set(contest[0].common[i].name, [
        contest[0].common[i].rank,
        contest[0].common[i].old,
        contest[0].common[i].new,
      ]);
      const cnt = com_con.get(contest[0].common[i].name) ?? 0;
      if (!cnt) com_con.set(contest[0].common[i].name, 1);
    }
    for (let i = 0; i < contest[1].common.length; i++) {
      user2map.set(contest[1].common[i].name, [
        contest[1].common[i].rank,
        contest[1].common[i].old,
        contest[1].common[i].new,
      ]);
      const cnt = com_con.get(contest[1].common[i].name) ?? 0;
      if (!cnt) com_con.set(contest[1].common[i].name, 1);
    }
    const arr = [];
    for (const [key, value] of com_con) {
      const cnt1 = user1map.get(key);
      const cnt2 = user2map.get(key);
      if (!cnt1 || !cnt2) arr.push(key);
    }
    for (let i = 0; i < arr.length; i++) {
      com_con.delete(arr[i]);
    }
    common_Contest.push([
      "Common Contest",
      `${user1} Rank`,
      `${user2} Rank`,
      `${user1} Rating Change`,
      `${user2} Rating Change`,
    ]);
    const arr1 = [];
    for (const [key, value] of com_con) {
      const u1 = user1map.get(key);
      const u2 = user2map.get(key);
      arr1.push([
        key,
        String(u1[0]),
        String(u2[0]),
        String(u1[1]) + " -> " + String(u1[2]),
        String(u2[1]) + " -> " + String(u2[2]),
      ]);
    }
    arr1.reverse();
    for (let i = 0; i < arr1.length; i++) {
      common_Contest.push(arr1[i]);
    }
  }
  function details() {
    const fetchdata = async () => {
      const username11 = input1.current.value;
      const username22 = input2.current.value;
      setUsername1(username11);
      setUsername2(username22);
      if (username11 === username22) {
        setexist2(3);
      } else {
        const response1 = await fetch(
          `https://codeforces.com/api/user.rating?handle=${username11}`
        );
        const userdata1 = await response1.json();
        const response2 = await fetch(
          `https://codeforces.com/api/user.rating?handle=${username22}`
        );
        const userdata2 = await response2.json();
        if (response1.ok && response2.ok) {
          setexist1(1);
          setexist2(1);
          const submission1 = await fetch(
            `https://codeforces.com/api/user.status?handle=${username11}`
          );
          const submission_data1 = await submission1.json();
          const submission2 = await fetch(
            `https://codeforces.com/api/user.status?handle=${username22}`
          );

          const submission_data2 = await submission2.json();
          contest.push(rating(userdata1.result));
          contest.push(rating(userdata2.result));
          userSub1 = problems(submission_data1.result);
          userSub2 = problems(submission_data2.result);
          Common(userSub1, userSub2, username11, username22);
          common_contest(contest, username11, username22);
          setRatingGraph([
            {
              name: "Current Rating",
              [username11]: contest[0].curr,
              [username22]: contest[1].curr,
            },
            {
              name: "Max Rating",
              [username11]: contest[0].maxRate,
              [username22]: contest[1].maxRate,
            },
            {
              name: "Min Rating",
              [username11]: contest[0].minRate,
              [username22]: contest[1].minRate,
            },
          ]);
          setContest([
            { name: username11, contest: contest[0].length },
            { name: username22, contest: contest[1].length },
          ]);
          setRatingChange([
            {
              name: "Max Up",
              [username11]: contest[0].maxUp,
              [username22]: contest[1].maxUp,
            },
            {
              name: "Max Down",
              [username11]: contest[0].maxDown,
              [username22]: contest[1].maxDown,
            },
          ]);
          setupdown([
            ["Best And Worst", username11, username22],
            ["Best", contest[0].bestRank, contest[1].bestRank],
            ["Worst", contest[0].worstRank, contest[1].worstRank],
          ]);
          setLevels(common_level);
          setratings(common_rating);
          setCommonContest(common_Contest);
          setLoading(false);
        } else {
          if (!response1.ok) setexist1(0);
          if (!response2.ok) setexist2(0);
        }
      }
    };
    fetchdata();
  }
  function onSubmit(event) {
    event.preventDefault();
    setLoading(true);
    details();
  }
  function Form() {
    return (
      <form
        method="post"
        // action="/compare"
        onSubmit={onSubmit}
        className="styling"
      >
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
              ref={input1}
            />
          </InputContainer>
          <ErrorText
            style={{ fontFamily: "'Cormorant SC', serif", color: "#c4a88a" }}
          >
            {!exist1 && "User does not exist"}
          </ErrorText>
          <InputContainer>
            <StyledInput
              type="text"
              placeholder="Codeforces User Handle"
              ref={input2}
            />
          </InputContainer>
          <ErrorText
            style={{ fontFamily: "'Cormorant SC', serif", color: "#c4a88a" }}
          >
            {!exist2 && "User does not exist"}
          </ErrorText>
          <ErrorText
            style={{ fontFamily: "'Cormorant SC', serif", color: "#c4a88a" }}
          >
            {exist2 === 3 && "Same User"}
          </ErrorText>
          <ButtonContainer>
            <Button content="Submit" onSubmit={onSubmit} />
          </ButtonContainer>
        </MainContainer>
      </form>
    );
  }
  function Rating() {
    return (
      <ChartbarCompare data={RatingGraph} var1={username1} var2={username2} />
    );
  }
  function Contest() {
    return <Chartbar2 data={noofContest} var={"contest"} />;
  }
  function RateChange() {
    return (
      <ChartbarCompare data={ratingChange} var1={username1} var2={username2} />
    );
  }
  function UpDown() {
    return (
      <Chart
        chartType="Table"
        data={updown}
        width="100%"
        options={{
          allowHtml: true,
          cssClassNames: {
            tableCell: "game-cell",
            headerRow: "head-cell",
            oddTableRow: "odd-cell",
          },
        }}
        formatters={[
          {
            type: "NumberFormat",
            column: 1,
            options: {
              fractionDigits: 0,
            },
          },
          {
            type: "NumberFormat",
            column: 2,
            options: {
              fractionDigits: 0,
            },
          },
        ]}
      />
    );
  }
  function Levels() {
    return <ChartbarCompare data={levels} var1={username1} var2={username2} />;
  }
  function Ratings() {
    return <ChartbarCompare data={ratings} var1={username1} var2={username2} />;
  }
  function CommonContest() {
    return (
      <Chart
        chartType="Table"
        data={commonContest}
        width="100%"
        options={{
          allowHtml: true,
          cssClassNames: {
            tableCell: "game-cell",
            headerRow: "head-cell",
            oddTableRow: "odd-cell",
          },
        }}
        formatters={[
          {
            type: "NumberFormat",
            column: 1,
            options: {
              fractionDigits: 0,
            },
          },
          {
            type: "NumberFormat",
            column: 2,
            options: {
              fractionDigits: 0,
            },
          },
          {
            type: "NumberFormat",
            column: 3,
            options: {
              fractionDigits: 0,
            },
          },
          {
            type: "NumberFormat",
            column: 4,
            options: {
              fractionDigits: 0,
            },
          },
        ]}
      />
    );
  }
  function Details() {
    return (
      <div>
        <div className="compare-head heading heading-light">
          <div>
            <h2>
              {username1} | {username2}
            </h2>
          </div>
        </div>
        <div className="ratingcompare">
          <Rating />
        </div>
        <div className="contestcompare">
          <Contest />
        </div>
        <div className="ratingcompare">
          <RateChange />
        </div>
        {/* <div className="updown1">
          <UpDown />
        </div> */}
        <div>{/* Timeline */}</div>
        <div className="ratingcompare2">
          <Levels />
        </div>
        <div className="ratingcompare2">
          <Ratings />
        </div>
        <div className="bigtable2">
          <CommonContest />
        </div>
      </div>
    );
  }
  return (
    <div>
      <CollapsibleExample />
      {exist1 !==1 && exist2 !== 1 && <Form />}
      {loading && (
        <div className="loadingscreen">
          <PuffLoader size={30} color={"#c4a88a"} loading={loading} />
        </div>
      )}
      {exist1 === 1 && exist2 === 1 && !loading && <Details />}
    </div>
  );
}

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 60vh;
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
