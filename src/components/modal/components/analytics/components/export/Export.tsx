import React, { useEffect, useState } from "react";
import styles from "./Export.module.scss";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { downloadFileFromArrayBuffer, ConvertOptions } from "libs/fileHelper";
import { Header } from "./components/Header/Header";
import { Main } from "./components/main/Main";
import { Footer } from "./components/footer/Footer";
import { Sort, Span } from "components/modal/components/analytics/Analytics";
import { Analytics } from "features/user/initialState";
import { useSelector } from "react-redux";
import * as rootSlice from "features/root/rootSlice";
import { createExcelSheet } from "libs/excel";

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

export const Export: React.FC<PropType> = ({ span, sort, analytics }) => {
  const fetch = useSelector(rootSlice.load).fetch;

  const [all, setAll] = useState<boolean>(false);

  const methods = useForm<Data>({
    defaultValues: {
      select: [],
      sort: ["self", "others"],
      span: span,
      extension: "utf8",
    },
  });

  const select = methods.watch("select")?.length;

  useEffect(() => {
    setAll(select ? true : false);
  }, [select, all]);

  useEffect(() => {
    methods.setValue("sort", [
      sort.self ? "self" : "",
      sort.others ? "others" : "",
    ]);
    methods.setValue("span", span);
  }, [span, sort]);

  const handleAll = (): void => {
    if (all) {
      methods.setValue("select", []);
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

  const handleDownload: SubmitHandler<Data> = async (data) => {
    const { select, sort, span, extension } = data;
    const format: "xlsx" | "csv" = extension === "xlsx" ? "xlsx" : "csv";

    const sheetName = "sheet1";

    const columns = [
      { header: "ID", key: "id" },
      { header: "作成日時", key: "createdAt" },
      { header: "名前", key: "name" },
    ];

    const rows = [
      {
        id: "f001",
        createdAt: 1629902208,
        name: "りんご",
      },
      {
        id: "f002",
        createdAt: 1629902245,
        name: "ぶどう",
      },
      {
        id: "f003",
        createdAt: 1629902265,
        name: "ばなな",
      },
    ];

    const utf8Array = await createExcelSheet({
      sheetName,
      columns,
      rows,
      format,
    });

    const type = "application/octet-binary";
    const fileName = `sample.${format}`;
    const option: ConvertOptions = (() => {
      switch (extension) {
        case "sjis":
          return {
            from: "UTF8",
            to: "SJIS",
          };

        default:
          return;
      }
    })();

    downloadFileFromArrayBuffer({ utf8Array, type, fileName, option });
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
