import React, { useEffect, useState } from "react";
import styles from "./Csv.module.scss";

import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

import { Header } from "./components/Header/Header";
import { Main } from "./components/main/Main";
import { Footer } from "./components/footer/Footer";
import { Sort, Span } from "components/modal/components/analytics/Analytics";
import { Analytics } from "features/user/initialState";
import { useSelector } from "react-redux";
import * as rootSlice from "features/root/rootSlice";

interface PropType {
  span: Span;
  sort: Sort;
  analytics?: Analytics;
}

export type Data = {
  select: string[];
  sort: string[];
  span: string;
  extension: string;
};

export const Csv: React.FC<PropType> = ({ span, sort, analytics }) => {
  const fetch = useSelector(rootSlice.load).fetch;

  const [all, setAll] = useState<boolean>(false);

  const methods = useForm<Data>({
    defaultValues: {
      select: [],
      sort: ["self", "others"],
      span: span,
      extension: "csv",
    },
  });

  const select = methods.watch("select")?.length;

  useEffect(() => {
    setAll(select ? true : false);
  }, [select, all]);

  useEffect(() => {
    methods.reset({
      sort: [sort.self ? "self" : "", sort.others ? "others" : ""],
      span: span,
    });
  }, [span, sort]);

  const handleAll = (): void => {
    if (all) {
      methods.setValue("select", []);
      methods.setError("select", {
        type: "required",
        message: "選択してください",
      });
    } else {
      methods.setValue("select", [
        "posts",
        "histories",
        "likes",
        "outputs",
        "entries",
        "follows",
        "distribution",
        "approval",
      ]);
      methods.clearErrors("select");
    }
  };

  const handleDownload: SubmitHandler<Data> = (data) => {
    console.log(data);
  };

  return !fetch && analytics?.length ? (
    <FormProvider {...methods}>
      <form
        className={styles.csv}
        onSubmit={methods.handleSubmit(handleDownload)}
      >
        <Header />
        <Main all={all} handleAll={handleAll} />
        <Footer />
      </form>
    </FormProvider>
  ) : (
    <></>
  );
};
