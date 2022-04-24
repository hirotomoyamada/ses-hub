import React, { useEffect, useState } from "react";
import styles from "./Charts.module.scss";

import {
  BarChart as BC,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
  LabelList,
} from "recharts";

import { Activity } from "features/user/initialState";
import { Setting } from "types/user";
import { NestedPartial } from "types/utils";

interface PropType {
  width: number;
  height: number;
  setting?: NestedPartial<Setting>;
  data?: Activity[number];
}

export const BarChart: React.FC<PropType> = ({
  width,
  height,
  setting,
  data,
}) => {
  const [display, setDisplay] = useState<boolean>();

  useEffect(() => {
    const display = Boolean(data?.log.filter(({ self }) => self).length);

    console.log(display);

    setDisplay(display);
  }, [data]);

  return display ? (
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
          color: setting?.activity?.color?.self || "#49b657",
        }}
        labelStyle={{
          fontWeight: "bold",
        }}
        formatter={(value: number) => [value, ""]}
      />

      <Bar
        dataKey="self"
        barSize={32}
        fill={
          setting?.activity?.color?.self
            ? `${setting?.activity?.color?.self}3b`
            : "#49b6573b"
        }
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
  ) : (
    <div style={{ width: width, height: height * 1.3 }} className={styles.none}>
      <span className={styles.none_txt}>データがありません</span>
    </div>
  );
};
