import React, { useEffect, useMemo, useState } from "react";
import styles from "./Charts.module.scss";

import { useChart } from "hooks/useChart";

import { Header } from "./Header";
import { LineChart } from "./LineChart";
import { BarChart } from "./BarChart";
import { NumberChart } from "./NumberChart";
import { Footer } from "./Footer";

import { Span, Sort } from "components/modal/components/activity/Activity";
import { useDnD } from "hooks/useDnd";
import { Activity } from "features/user/initialState";
import { useSelector } from "react-redux";
import * as rootSlice from "features/root/rootSlice";

interface PropType {
  span: Span;
  sort: Sort;
  activity?: Activity;
}

export const Charts: React.FC<PropType> = ({ span, sort, activity }) => {
  const [ref, width, height] = useChart();
  const [updateActivity, setUpdateActivity] = useState<Activity>(
    activity || []
  );
  const [data] = useDnD<Activity[number]>(updateActivity);
  const setting = useSelector(rootSlice.setting);

  useEffect(() => {
    if (setting?.activity?.order) {
      const newActivity = setting.activity.order
        .map((key) => activity?.find((data) => data.key === key))
        .filter((data): data is Activity[number] => data !== undefined);

      setUpdateActivity(newActivity);
    }
  }, [setting?.activity]);

  const Chart: React.VFC<{
    data: Activity[number];
  }> = useMemo<React.VFC<{ data: Activity[number] }>>(
    (): React.VFC<{
        data: Activity[number];
      }> =>
      ({ data }): JSX.Element => {
        switch (setting?.activity?.layout) {
          case "number":
            return <NumberChart sort={sort} data={data} setting={setting} />;
          case "none":
            return <></>;
          default: {
            if (data.key !== "distribution" && data.key !== "approval") {
              return (
                <LineChart
                  width={width}
                  height={height}
                  setting={setting}
                  data={data}
                  sort={sort}
                />
              );
            } else {
              return (
                <BarChart
                  width={width}
                  height={height}
                  setting={setting}
                  data={data}
                />
              );
            }
          }
        }
      },
    [updateActivity, setting, width, height, sort]
  );

  return (
    <div className={styles.charts} ref={ref}>
      {data.map(
        (activity) =>
          activity.data.active &&
          (setting?.activity?.layout !== "none" ||
            (activity.data.key !== "distribution" &&
              activity.data.key !== "approval")) &&
          (sort.self ||
            (sort.others &&
              activity.data.key !== "posts" &&
              activity.data.key !== "distribution" &&
              activity.data.key !== "approval")) && (
            <div
              key={activity.key}
              className={styles.chart}
              {...activity.events}
            >
              <Header setting={setting} sort={sort} data={activity.data} />

              <Chart data={activity.data} />

              <Footer setting={setting} span={span} data={activity.data} />
            </div>
          )
      )}
    </div>
  );
};
