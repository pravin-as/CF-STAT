import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
function Chartbar(props) {
  return (
    <ResponsiveContainer width="100%" aspect={3}>
      <BarChart
        width={500}
        height={300}
        data={props.data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" style={{fontFamily: "'Cormorant SC', serif"}} />
        <YAxis style={{fontFamily: "'Cormorant SC', serif"}} />
        <Tooltip />
        <Legend wrapperStyle={{fontFamily: "'Cormorant SC', serif"}} />
        <Bar dataKey={props.var} fill="#c4a88a" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default Chartbar;
