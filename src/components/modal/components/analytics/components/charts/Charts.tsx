import React, { useEffect, useMemo, useState } from "react";
import styles from "./Charts.module.scss";

import { useChart } from "hooks/useChart";

import { Header } from "./Header";
import { LineChart } from "./LineChart";
import { BarChart } from "./BarChart";
import { NumberChart } from "./NumberChart";
import { Footer } from "./Footer";
import { Audio } from "react-loader-spinner";

import { Span, Sort } from "components/modal/components/analytics/Analytics";
import { useDnD } from "hooks/useDnd";
import { Analytics } from "features/user/initialState";
import { useSelector } from "react-redux";
import * as rootSlice from "features/root/rootSlice";

interface PropType {
  span: Span;
  sort: Sort;
  analytics?: Analytics;
}

export const Charts: React.FC<PropType> = ({ span, sort, analytics }) => {
  const fetch = useSelector(rootSlice.load).fetch;
  const [ref, width, height] = useChart();
  const [updateAnalytics, setUpdateAnalytics] = useState<Analytics>(
    analytics || []
  );
  const [data] = useDnD<Analytics[number]>(updateAnalytics);
  const setting = useSelector(rootSlice.setting);

  useEffect(() => {
    if (setting?.analytics?.order) {
      const newAnalytics = setting.analytics.order
        .map((key) => analytics?.find((data) => data.key === key))
        .filter((data): data is Analytics[number] => data !== undefined);

      setUpdateAnalytics(newAnalytics);
    } else {
      if (analytics) setUpdateAnalytics(analytics);
    }
  }, [analytics, setting?.analytics]);

  const Chart = useMemo<React.FC<{ data: Analytics[number] }>>(
    () =>
      ({ data }): JSX.Element => {
        switch (setting?.analytics?.layout) {
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
    [updateAnalytics, sort, width, height, setting]
  );

  return !fetch ? (
    <div className={styles.charts} ref={ref}>
      {data.map((analytics) => {
        if (!analytics.data.active) return <></>;

        if (
          setting?.analytics?.layout === "none" &&
          (analytics.data.key === "distribution" ||
            analytics.data.key === "approval")
        )
          return <></>;

        if (
          !sort.self &&
          sort.others &&
          (analytics.data.key === "posts" ||
            analytics.data.key === "distribution" ||
            analytics.data.key === "approval")
        )
          return <></>;

        return (
          <div
            key={analytics.key}
            className={styles.chart}
            {...analytics.events}
          >
            <Header setting={setting} sort={sort} data={analytics.data} />

            <Chart data={analytics.data} />

            <Footer setting={setting} span={span} data={analytics.data} />
          </div>
        );
      })}
    </div>
  ) : (
    <div className={`${styles.charts_fetch}`}>
      <Audio color="#49b757" height={48} width={48} />
    </div>
  );
};
