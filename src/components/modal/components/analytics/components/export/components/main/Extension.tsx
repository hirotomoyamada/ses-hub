import React from "react";
import styles from "./Main.module.scss";

import { useFormContext } from "react-hook-form";
import { Data } from "components/modal/components/analytics/components/export/Export";

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
        id="utf8"
        {...register("extension")}
        value="utf8"
        className={`${styles.main_input}`}
      />
      <label className={`${styles.main_input_label}`} htmlFor="utf8">
        <span>.csv</span>
        <span className={styles.main_desc}>(UTF-8)</span>
      </label>

      <input
        type="radio"
        id="sjis"
        {...register("extension")}
        value="sjis"
        className={`${styles.main_input}`}
      />
      <label className={`${styles.main_input_label}`} htmlFor="sjis">
        <span>.csv</span>
        <span className={styles.main_desc}>(SJIS)</span>
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
