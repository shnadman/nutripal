import { PieChart } from "react-minimal-pie-chart";
import React, { useState } from "react";

export default ({ ratio }) => {
  const [protein, carbs, fat] = ratio;
  if(ratio ===[0,0,0]) return null
  const init = [
    { title: "Protein", value: protein, color: "#2740e3" },
    { title: "Carbs", value: carbs, color: "#e90f08" },
    { title: "Fat", value: fat, color: "#00ec50" },
  ];

  const [selected, setSelected] = useState(0);
  const [hovered, setHovered] = useState(undefined);

  const data = init.map((entry, i) => {
    if (hovered === i) {
      return {
        ...entry,
        color: "#987070",
      };
    }
    return entry;
  });

  const lineWidth = 60;

  return (
    <PieChart
      style={{
        fontFamily:
          '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
        fontSize: "9px",
      }}
      data={data}
      radius={PieChart.defaultProps.radius - 4}
      lineWidth={50}
      segmentsStyle={{ transition: "stroke .3s", cursor: "pointer" }}
      segmentsShift={(index) => (index === selected ? 6 : 1)}
      animate
      label={({ dataEntry }) => Math.round(dataEntry.percentage) + "%"}
      labelPosition={100 - lineWidth / 2}
      labelStyle={{
        fill: "#fff",
        opacity: 0.75,
        pointerEvents: "none",
      }}
      onClick={(_, index) => {
        setSelected(index === selected ? undefined : index);
      }}
      onMouseOver={(_, index) => {
        setHovered(index);
      }}
      onMouseOut={() => {
        setHovered(undefined);
      }}
    />
  );
};

// <defs>
//     <linearGradient id="gradient1">
//         <stop offset="0%" stopColor="#4CAF50" />
//         <stop offset="45%" stopColor="#ffb961" />
//         <stop offset="55%" stopColor="#ffb961" />
//         <stop offset="100%" stopColor="#C13C37" />
//     </linearGradient>
// </defs>
