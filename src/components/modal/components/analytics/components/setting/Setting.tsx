import React, { useEffect, useRef, useState } from "react";
import styles from "./Setting.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

import * as rootSlice from "features/root/rootSlice";

import { Active } from "./components/active/Active";
import { Layout } from "./components/layout/Layout";

import { Analytics } from "features/user/initialState";
import { Setting as SettingType } from "types/user";

export type Data = Required<SettingType>["analytics"];

interface PropType {
  analytics: Analytics;
}

export const Setting: React.FC<PropType> = ({ analytics }) => {
  const dispatch = useDispatch();
  const setting = useSelector(rootSlice.setting);
  const ref = useRef<HTMLDivElement>(null);
  const [offsetWidth, setOffsetWidth] = useState<number>(0);

  const methods = useForm<Data>({
    defaultValues: {
      active: setting?.analytics?.active || [
        "posts",
        "histories",
        "likes",
        "outputs",
        "entries",
        "follows",
        "distribution",
        "approval",
      ],
      order: setting?.analytics?.order || [
        "posts",
        "histories",
        "likes",
        "outputs",
        "entries",
        "follows",
        "distribution",
        "approval",
      ],
      layout: setting?.analytics?.layout || "line",
      color: {
        self: setting?.analytics?.color.self || "#49b657",
        others: setting?.analytics?.color.others || "#ff9900",
      },
    },
  });

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

  const handleSetting: SubmitHandler<Data> = (data) => {
    dispatch(rootSlice.handleSetting({ type: "analytics", ...data }));
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
          <Active setting={setting} analytics={analytics} />
          <Layout offsetWidth={offsetWidth} analytics={analytics} />
        </form>
      </FormProvider>
    </div>
  );
};
