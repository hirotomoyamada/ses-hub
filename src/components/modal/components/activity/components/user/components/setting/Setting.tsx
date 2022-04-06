import React, { useEffect, useRef, useState } from "react";
import styles from "./Setting.module.scss";

import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { Label } from "./components/Label/Label";
import { Layout } from "./components/Layout/Layout";

import { Activity } from "features/user/initialState";

export type Data = {
  label: string[];
  order: string[];
  layout: "line" | "number" | "none";
};

interface PropType {
  activity: Activity;
}

export const Setting: React.FC<PropType> = ({ activity }) => {
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
      label: [],
      order: [],
      layout: "line",
    },
  });

  const handleUpdate: SubmitHandler<Data> = (data) => {
    console.log(data);
  };

  return (
    <div ref={ref}>
      <FormProvider {...methods}>
        <form
          className={styles.setting}
          onSubmit={methods.handleSubmit(handleUpdate)}
          id="setting"
        >
          <Label activity={activity} />
          <Layout offsetWidth={offsetWidth} activity={activity} />
        </form>
      </FormProvider>
    </div>
  );
};
