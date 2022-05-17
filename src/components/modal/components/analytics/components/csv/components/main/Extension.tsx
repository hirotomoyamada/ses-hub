import React from "react";
import styles from "./Main.module.scss";

import { useFormContext } from "react-hook-form";
import { Data } from "components/modal/components/analytics/components/csv/Csv";

export const Extension = () => {
  const { register } = useFormContext<Data>();

  return (
    <div
      className={`
          ${styles.main_container} 
          ${styles.main_container_extension}
        `}
    >
      <input
        type="radio"
        id="csv"
        {...register("extension")}
        value="csv"
        className={`${styles.main_input}`}
      />
      <label className={`${styles.main_input_label}`} htmlFor="csv">
        .csv
      </label>

      <input
        type="radio"
        id="xlsx"
        {...register("extension")}
        value="xlsx"
        className={`${styles.main_input}`}
      />
      <label className={`${styles.main_input_label}`} htmlFor="xlsx">
        .xlsx
      </label>
    </div>
  );
};
