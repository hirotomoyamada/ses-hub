import React, { useEffect, useState } from "react";
import styles from "./Export.module.scss";
import { functions } from "libs/firebase";
import { httpsCallable, HttpsCallable } from "firebase/functions";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { downloadFileFromArrayBuffer, ConvertOptions } from "libs/fileHelper";
import { Header } from "./components/Header/Header";
import { Main } from "./components/main/Main";
import { Footer } from "./components/footer/Footer";
import { Sort, Span } from "components/modal/components/analytics/Analytics";
import { Analytics } from "features/user/initialState";
import { useSelector } from "react-redux";
import * as rootSlice from "features/root/rootSlice";
import { createExcelSheet, Columns, Rows } from "libs/excel";

interface PropType {
  uid: string;
  span: Span;
  sort: Sort;
  analytics?: Analytics;
}

export type Data = {
  select: string[];
  sort: (keyof Sort | string)[];
  span: Span;
  extension: string;
};

export const Export: React.FC<PropType> = ({ uid, span, sort, analytics }) => {
  const fetch = useSelector(rootSlice.load).fetch;
  const [load, setLoad] = useState<boolean>(false);
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

  const handleDownload: SubmitHandler<Data> = async ({
    select,
    span: selectSpan,
    sort,
    extension,
  }) => {
    try {
      if (!analytics) return;

      setLoad(true);

      const format: "xlsx" | "csv" = extension === "xlsx" ? "xlsx" : "csv";

      const date = new Date();
      const year = date.getFullYear();
      const month = ("0" + String(date.getMonth() + 1)).slice(-2);
      const day = ("0" + String(date.getDate())).slice(-2);
      const hours = ("0" + String(date.getHours())).slice(-2);
      const minutes = ("0" + String(date.getMinutes())).slice(-2);
      const seconds = ("0" + String(date.getSeconds())).slice(-2);

      const timestamp = `${year}${month}${day}${hours}${minutes}${seconds}`;

      const data: Analytics = await (async () => {
        if (selectSpan === span) {
          return analytics;
        } else {
          const fetchAnalytics: HttpsCallable<
            { uid: string; span: Span },
            Analytics
          > = httpsCallable(functions, "sh-fetchAnalytics");

          const { data } = await fetchAnalytics({ uid, span: selectSpan });

          return data;
        }
      })();

      const sheetName = uid;
      const columns: Columns = [{ header: "期間", key: "label" }];
      const rows: Rows = [];

      select.forEach((k) => {
        const upstream = data.find(({ key }) => key === k);

        if (!upstream) return;

        const { label, self, others, log } = upstream;

        if (k !== "distribution" && k !== "approval") {
          if (sort.indexOf("self") >= 0)
            if (self !== null && self !== undefined) {
              const header = `${label}した数`;
              const key = `${k}_self`;

              columns.push({ header, key });
            }

          if (sort.indexOf("others") >= 0)
            if (others !== null && others !== undefined) {
              const header = `${label}された数`;
              const key = `${k}_others`;

              columns.push({ header, key });
            }
        } else {
          if (sort.indexOf("self") < 0) return;

          Object.keys(log[0]).forEach((key) => {
            if (key === "label") return;

            const header = `${label}(${key})`;

            columns.push({ header, key });
          });
        }
      });

      [...data[0].log].reverse().forEach(({ label: l }) => {
        const label = (() => {
          switch (l) {
            case "今日":
              return `${month.replace(/^0/, "")}月${day.replace(/^0/, "")}日`;

            case "今月":
              return `${month.replace(/^0/, "")}月`;

            default:
              return l;
          }
        })();
        const row: Rows[number] = {
          label,
        };

        select.forEach((k) => {
          const upstream = data.find(({ key }) => key === k);

          if (!upstream) return;

          const { key, log } = upstream;

          const downstream = log.find(({ label }) => label === l);

          if (k !== "distribution" && k !== "approval") {
            if (sort.indexOf("self") >= 0) {
              row[`${key}_self`] = downstream?.self || 0;
            }

            if (sort.indexOf("others") >= 0) {
              row[`${key}_others`] = downstream?.others || 0;
            }
          } else {
            if (sort.indexOf("self") < 0) return;

            Object.keys(downstream || []).forEach((key) => {
              if (key === "label") return;

              row[key] = downstream?.[key] || 0;
            });
          }
        });

        rows.push(row);
      });

      const utf8Array = await createExcelSheet({
        sheetName,
        columns,
        rows,
        format,
      });

      const type = "application/octet-binary";
      const fileName = `${uid || "demo"}_${timestamp}.${format}`;
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
    } finally {
      setLoad(false);
    }
  };

  return !fetch && analytics?.length ? (
    <FormProvider {...methods}>
      <form
        className={styles.csv}
        onSubmit={methods.handleSubmit(handleDownload)}
      >
        <Header />
        <Main all={all} handleAll={handleAll} />
        <Footer load={load} />
      </form>
    </FormProvider>
  ) : (
    <></>
  );
};
