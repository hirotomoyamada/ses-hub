import React, { useEffect, useMemo, useState } from "react";
import styles from "./Layout.module.scss";

import { useFormContext } from "react-hook-form";

import { Data } from "components/modal/components/analytics/components/setting/Setting";
import { Header } from "components/modal/components/analytics/components/charts/Header";
import { LineChart } from "components/modal/components/analytics/components/charts/LineChart";
import { NumberChart } from "components/modal/components/analytics/components/charts/NumberChart";
import { Footer } from "components/modal/components/analytics/components/charts/Footer";

import { Analytics } from "features/user/initialState";

interface PropType {
  offsetWidth?: number;
  analytics: Analytics;
}

export const Sample: React.FC<PropType> = ({ offsetWidth, analytics }) => {
  const { watch } = useFormContext<Data>();

  const layout = watch("layout");
  const color = watch("color");

  const data = analytics.find(({ key }) => key === "likes");

  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    if (offsetWidth) {
      if (innerWidth > 959) {
        const columns = 2;
        const gap = 16 * (columns - 1);
        const padding = 16 * 4;
        const border = 1 * columns * 4;
        const w = (offsetWidth - gap) / columns - padding - border;
        setWidth(w);
        setHeight(w / 2);
        return;
      }

      if (innerWidth > 519) {
        const columns = 1;
        const padding = 16 * 4;
        const border = 1 * columns * 4;
        const w = offsetWidth / columns - padding - border;
        setWidth(w);
        setHeight(w / 2);
        return;
      } else {
        const columns = 1;
        const padding = 12 * 4;
        const border = 1 * columns * 4;
        const w = offsetWidth / columns - padding - border;
        setWidth(w);
        setHeight(w / 2);
        return;
      }
    }
  }, [offsetWidth]);

  const Body: React.VFC = useMemo<React.VFC>(
    (): React.VFC => (): JSX.Element => {
      switch (layout) {
        case "line":
          return (
            <LineChart
              sample
              setting={{ analytics: { color: color } }}
              width={width}
              height={height}
              data={data}
            />
          );
        case "number":
          return (
            <NumberChart
              sample
              setting={{ analytics: { color: color } }}
              data={data}
            />
          );
        default:
          return <></>;
      }
    },
    [layout, width, height]
  );

  return (
    <div className={styles.sample}>
      <Header
        setting={{ analytics: { layout: layout, color: color } }}
        sample
        data={data}
      />
      <Body />
      <Footer setting={{ analytics: { layout: layout } }} data={data} />
    </div>
  );
};
