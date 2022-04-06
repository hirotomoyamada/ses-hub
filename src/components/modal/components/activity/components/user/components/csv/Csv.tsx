import React, { useEffect, useState } from "react";
import styles from "./Csv.module.scss";

import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

import { Header } from "./components/Header/Header";
import { Main } from "./components/main/Main";
import { Footer } from "./components/footer/Footer";
import { Sort, Span } from "components/modal/components/activity/Activity";

interface PropType {
  span: Span;
  sort: Sort;
}

export type Data = {
  label: string[];
  sort: string[];
  span: string;
  extension: string;
};

export const Csv: React.FC<PropType> = ({ span, sort }) => {
  const [all, setAll] = useState<boolean>(false);

  const methods = useForm<Data>({
    defaultValues: {
      label: [],
      sort: ["self", "others"],
      span: span,
      extension: "csv",
    },
  });

  const label = methods.watch("label")?.length;

  useEffect(() => {
    setAll(label ? true : false);
  }, [label, all]);

  useEffect(() => {
    methods.reset({
      sort: [sort.self ? "self" : "", sort.others ? "others" : ""],
      span: span,
    });
  }, [span, sort]);

  const handleAll = (): void => {
    if (all) {
      methods.setValue("label", []);
      methods.setError("label", {
        type: "required",
        message: "選択してください",
      });
    } else {
      methods.setValue("label", [
        "posts",
        "histories",
        "likes",
        "outputs",
        "entries",
        "follows",
        "distributions",
        "approval",
      ]);
      methods.clearErrors("label");
    }
  };

  const handleDownload: SubmitHandler<Data> = (data) => {
    console.log(data);
  };

  return (
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
  );
};
