import React from "react";
import styles from "./Main.module.scss";

import { useFormContext } from "react-hook-form";

import { Data } from "components/modal/components/analytics/components/export/Export";

export const Span: React.FC = () => {
  const { register } = useFormContext<Data>();

  return (
    <div
      className={`
          ${styles.main_container} 
          ${styles.main_container_span}
        `}
    >
      <input
        type="radio"
        id="total"
        {...register("span")}
        value="total"
        className={`${styles.main_input}`}
      />
      <label className={`${styles.main_input_label}`} htmlFor="total">
        すべて
      </label>

      <input
        type="radio"
        id="day"
        {...register("span")}
        value="day"
        className={`${styles.main_input}`}
      />
      <label className={`${styles.main_input_label}`} htmlFor="day">
        今日
      </label>

      <input
        type="radio"
        id="week"
        {...register("span")}
        value="week"
        className={`${styles.main_input}`}
      />
      <label className={`${styles.main_input_label}`} htmlFor="week">
        今週
      </label>

      <input
        type="radio"
        id="month"
        {...register("span")}
        value="month"
        className={`${styles.main_input}`}
      />
      <label className={`${styles.main_input_label}`} htmlFor="month">
        今月
      </label>
    </div>
  );
};
