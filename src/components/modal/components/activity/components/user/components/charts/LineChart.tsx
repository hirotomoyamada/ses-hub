import React from "react";

import { LineChart as LC, Line, XAxis, Tooltip } from "recharts";

import { Activity } from "features/user/initialState";
import { Sort } from "components/modal/components/activity/Activity";
import { Setting } from "types/user";
import { NestedPartial } from "types/utils";

interface PropType {
  width: number;
  height: number;
  sample?: boolean;
  setting?: NestedPartial<Setting>;
  data?: Activity[number];
  sort?: Sort;
}

export const LineChart: React.FC<PropType> = ({
  width,
  height,
  sample,
  setting,
  data,
  sort,
}) => {
  return (
    <LC width={width} height={height} data={data?.log}>
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

      {(sample || sort?.self || data?.key === "posts") && (
        <Line
          type="linear"
          dataKey="self"
          stroke={setting?.activity?.color?.self || "#49b657"}
          animationEasing="ease-in-out"
        />
      )}

      {(sample || (sort?.others && data?.others)) && (
        <Line
          type="linear"
          dataKey="others"
          stroke={setting?.activity?.color?.others || "#ff9900"}
          animationEasing="ease-in-out"
        />
      )}
    </LC>
  );
};
