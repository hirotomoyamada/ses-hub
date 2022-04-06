import { Sort } from "components/modal/components/activity/Activity";
import { Activity } from "features/user/initialState";
import React from "react";

import { LineChart as LC, Line, XAxis, Tooltip } from "recharts";

interface PropType {
  width: number;
  height: number;
  data: Activity[number];
  sort: Sort;
}

export const LineChart: React.FC<PropType> = ({
  width,
  height,
  data,
  sort,
}) => {
  return (
    <LC width={width} height={height} data={data.log}>
      <XAxis dataKey="label" hide />

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
        }}
        labelStyle={{
          fontWeight: "bold",
        }}
        formatter={(value: number, name: string) => [
          value,
          name === "self" ? "した数" : "された数",
        ]}
      />

      {(sort.self || data.name === "posts") && (
        <Line
          type="linear"
          dataKey="self"
          stroke="#49b657"
          animationEasing="ease-in-out"
        />
      )}

      {sort.others && data.others && (
        <Line
          type="linear"
          dataKey="others"
          stroke="#ff9900"
          animationEasing="ease-in-out"
        />
      )}
    </LC>
  );
};
