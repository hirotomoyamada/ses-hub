import React, { useEffect, useState } from "react";
import styles from "../Layout.module.scss";

import { useFormContext } from "react-hook-form";

import { Data } from "components/modal/components/activity/components/user/components/setting/Setting";
import { Header } from "components/modal/components/activity/components/user/components/charts/Header";
import { LineChart } from "components/modal/components/activity/components/user/components/charts/LineChart";
import { Number } from "components/modal/components/activity/components/user/components/charts/Number";
import { Footer } from "components/modal/components/activity/components/user/components/charts/Footer";

import { Activity } from "features/user/initialState";

interface PropType {
  offsetWidth?: number;
  activity: Activity;
}

export const Sample: React.FC<PropType> = ({ offsetWidth, activity }) => {
  const { watch } = useFormContext<Data>();

  const layout = watch("layout");

  const data = activity.find(({ key }) => key === "likes");

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

  const Body = (): JSX.Element => {
    switch (layout) {
      case "line":
        return <LineChart sample width={width} height={height} data={data} />;
      case "number":
        return <Number sample data={data} />;
      default:
        return <></>;
    }
  };

  return (
    <div className={styles.sample}>
      <Header setting={{ activity: { layout: layout } }} sample data={data} />
      <Body />
      <Footer setting={{ activity: { layout: layout } }} data={data} />
    </div>
  );
};
