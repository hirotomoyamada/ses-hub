import React, { useEffect, useRef, useState } from "react";
import styles from "./Setting.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

import * as rootSlice from "features/root/rootSlice";

import { Active } from "./components/active/Active";
import { Layout } from "./components/Layout/Layout";

import { Activity } from "features/user/initialState";
import { Setting as SettingType } from "types/user";

export type Data = SettingType["activity"];

interface PropType {
  activity: Activity;
}

export const Setting: React.FC<PropType> = ({ activity }) => {
  const dispatch = useDispatch();
  const setting = useSelector(rootSlice.setting);
  const ref = useRef<HTMLDivElement>(null);
  const [offsetWidth, setOffsetWidth] = useState<number>(0);

  useEffect(() => {
    const current = ref.current;

    if (current) {
      setOffsetWidth(current.offsetWidth);

      window.addEventListener("resize", () =>
        setOffsetWidth(current.offsetWidth)
      );

      return () => {
        window.removeEventListener("resize", () =>
          setOffsetWidth(current.offsetWidth)
        );
      };
    }
  }, [ref]);

  const methods = useForm<Data>({
    defaultValues: {
      active: setting?.activity.active || [
        "posts",
        "histories",
        "likes",
        "outputs",
        "entries",
        "follows",
        "distributions",
        "approval",
      ],
      order: setting?.activity.order,
      layout: setting?.activity.layout || "line",
      color: {
        self: setting?.activity.color.self || "#49b657",
        others: setting?.activity.color.others || "#ff9900",
      },
    },
  });

  const handleSetting: SubmitHandler<Data> = (data) => {
    if (!data.active) {
      data.active = [];
    }

    dispatch(rootSlice.handleSetting({ type: "activity", ...data }));
    dispatch(rootSlice.handleAnnounce({ success: "保存しました" }));
  };

  return (
    <div ref={ref}>
      <FormProvider {...methods}>
        <form
          className={styles.setting}
          onSubmit={methods.handleSubmit(handleSetting)}
          id="setting"
        >
          <Active setting={setting} activity={activity} />
          <Layout offsetWidth={offsetWidth} activity={activity} />
        </form>
      </FormProvider>
    </div>
  );
};
