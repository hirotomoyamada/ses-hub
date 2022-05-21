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

import { Analytics } from "features/user/initialState";
import { Setting } from "types/user";
import { NestedPartial } from "types/utils";

interface PropType {
  width: number;
  height: number;
  setting?: NestedPartial<Setting>;
  data?: Analytics[number];
}

export const BarChart: React.FC<PropType> = React.memo(
  ({ width, height, setting, data }) => {
    const [display, setDisplay] = useState<boolean>(false);

    useEffect(() => {
      if (!data) return;

      const log = data.log[0];

      const display = Boolean(
        Object.keys(log).filter((label) => label !== "label" && log[label])
          .length
      );

      setDisplay(display);
    }, [data]);

    return display ? (
      <BC
        layout="vertical"
        barGap={8}
        width={width}
        height={height * 1.3}
        data={(() => {
          if (!data) return [];

          switch (data.key) {
            case "distribution":
            case "approval": {
              const log = Object.keys(data.log[0])
                .map((label) => {
                  if (label === "label") return;

                  const self = data.log[0][label] || 0;

                  return { label, self };
                })
                .filter(
                  (data): data is { label: string; self: number } =>
                    data !== undefined
                );

              return log;
            }

            default:
              return data.log;
          }
        })()}
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
            color: setting?.analytics?.color?.self || "#49b657",
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
            setting?.analytics?.color?.self
              ? `${setting?.analytics?.color?.self}3b`
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
      <div
        style={{ width: width, height: height * 1.3 }}
        className={styles.none}
      >
        <span className={styles.none_txt}>データがありません</span>
      </div>
    );
  }
);
