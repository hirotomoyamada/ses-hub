import React from "react";

import {
  BarChart as BC,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
  LabelList,
} from "recharts";

import { Activity } from "features/user/initialState";

interface PropType {
  width: number;
  height: number;
  data?: Activity[number];
}

export const BarChart: React.FC<PropType> = ({ width, height, data }) => {
  return (
    <BC
      layout="vertical"
      barGap={8}
      width={width}
      height={height * 1.3}
      data={data?.log}
    >
      <XAxis type="number" domain={[0, "dataMax"]} hide />
      <YAxis type="category" dataKey="label" hide />

      <Tooltip
        separator=""
        contentStyle={{
          borderRadius: "12px",
          paddingTop: "16px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "8px",
        }}
        itemStyle={{
          display: "flex",
          gap: "2px",
          color: "#49b657",
        }}
        labelStyle={{
          fontWeight: "bold",
        }}
        formatter={(value: number) => [value, ""]}
      />

      <Bar
        dataKey="self"
        barSize={32}
        fill="#dbf0dd"
        animationDuration={1580}
        animationEasing="ease-in-out"
      >
        <LabelList
          dataKey="label"
          position="insideLeft"
          fill="#515a74"
          fontSize="14px"
        />
      </Bar>
    </BC>
  );
};
