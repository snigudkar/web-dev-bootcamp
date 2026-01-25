import React from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

const Chart = ({ data }) => {
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

  return (
    <PieChart width={400} height={300}>
      <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};

export default Chart;
