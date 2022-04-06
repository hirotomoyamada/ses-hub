import React from "react";
import styles from "./Charts.module.scss";

import { useChart } from "hooks/useChart";

import { Header } from "./Header";
import { LineChart } from "./LineChart";
import { BarChart } from "./BarChart";
import { Footer } from "./Footer";

import { Span, Sort } from "components/modal/components/activity/Activity";
import { useDnD } from "hooks/useDnd";
import { Activity } from "features/user/initialState";

interface PropType {
  span: Span;
  sort: Sort;
  activity: Activity;
}

export const Charts: React.FC<PropType> = ({ span, sort, activity }) => {
  const [ref, width, height] = useChart();
  const [data, map] = useDnD<Activity[number]>(activity);

  console.log(map);

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
              <Header sort={sort} span={span} data={activity.data} />

              {activity.data.name !== "distributions" &&
              activity.data.name !== "approval" ? (
                <LineChart
                  width={width}
                  height={height}
                  data={activity.data}
                  sort={sort}
                />
              ) : (
                <BarChart width={width} height={height} data={activity.data} />
              )}

              <Footer data={activity.data} />
            </div>
          )
      )}
    </div>
  );
};
