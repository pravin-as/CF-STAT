import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Chartbar from "./Chartbar";
import { Chart } from "react-google-charts";
import Show from "./Show";
import CollapsibleExample from "./CollapsibleExample";
import "./single.css";
export default function Details() {
  const { state } = useLocation();
  const [user, setUser] = useState([]);
  const [sub, setSub] = useState([]);
  const [lang, setLang] = useState([]);
  const [rating, setRating] = useState([]);
  const [problem_num, setProblem_num] = useState([]);
  const { username } = state;
  useEffect(() => {
    const fetchdata = async () => {
      const response = await fetch(
        `https://codeforces.com/api/user.rating?handle=${username}`
      );
      const submission = await fetch(
        `https://codeforces.com/api/user.status?handle=${username}&from=1&count=5000`
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
      const arr = [["Verdict", "count"]];
      const arr1 = [["Verdict", "count"]];
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
        if (key !== undefined) arr2.push({ name: key, count: value });
      }
      for (const [key, value] of problem_number) {
        if (key !== undefined) {
          arr4.push({ name: key, count: value });
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
    };
    fetchdata();
  }, [username]);

  return (
    <div>
      <CollapsibleExample />
      <div className="user">{username}</div>
      <div className="rating">
        <div className="ratingpara">Problem rating of {username}</div>
        <Chartbar data={rating} />
      </div>
      <div className="rating">
        <div className="ratingpara">Level of {username}</div>
        <Chartbar data={problem_num} />
      </div>
      <div className="pie-container">
        <div className="piechart">
          <Chart
            chartType="PieChart"
            data={sub}
            options={{
              title: "Verdicts",
              is3D: true,
              pieSliceText: "label",
              legend: "none",
            }}
            width="800px"
            height="800px"
          />
        </div>

        <div className="piechart2">
          <Chart
            chartType="PieChart"
            data={lang}
            options={{
              title: "Verdicts",
              is3D: true,
              pieSliceText: "label",
              legend: "none",
            }}
            width="800px"
            height="800px"
          />
        </div>
      </div>

      <div className="bigtable">
        <Show table={user} />
      </div>
    </div>
  );
}
