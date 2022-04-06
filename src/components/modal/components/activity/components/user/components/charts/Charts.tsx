import React from "react";
import styles from "./Charts.module.scss";

import { useChart } from "hooks/useChart";

import { Header } from "./Header";
import { LineChart } from "./LineChart";
import { BarChart } from "./BarChart";
import { Number } from "./Number";
import { Footer } from "./Footer";

import { Span, Sort } from "components/modal/components/activity/Activity";
import { useDnD } from "hooks/useDnd";
import { Activity } from "features/user/initialState";

interface PropType {
  layout: "line" | "number" | "none";
  span: Span;
  sort: Sort;
  activity: Activity;
}

export const Charts: React.FC<PropType> = ({
  layout,
  span,
  sort,
  activity,
}) => {
  const [ref, width, height] = useChart();
  const [data, order] = useDnD<Activity[number]>(activity);

  const Chart: React.VFC<{ data: Activity[number] }> = ({ data }) => {
    switch (layout) {
      case "line": {
        if (data.name !== "distributions" && data.name !== "approval") {
          return (
            <LineChart width={width} height={height} data={data} sort={sort} />
          );
        } else {
          return <BarChart width={width} height={height} data={data} />;
        }
      }
      case "number":
        return <Number sort={sort} data={data} />;
      default:
        return <></>;
    }
  };

  return (
    <div className={styles.charts} ref={ref}>
      {data.map(
        (activity) =>
          (sort.self ||
            (sort.others &&
              activity.data.name !== "posts" &&
              activity.data.name !== "distributions" &&
              activity.data.name !== "approval")) && (
            <div
              key={activity.key}
              className={styles.chart}
              {...activity.events}
            >
              <Header
                layout={layout}
                sort={sort}
                span={span}
                data={activity.data}
              />

              <Chart data={activity.data} />

              <Footer layout={layout} span={span} data={activity.data} />
            </div>
          )
      )}
    </div>
  );
};
