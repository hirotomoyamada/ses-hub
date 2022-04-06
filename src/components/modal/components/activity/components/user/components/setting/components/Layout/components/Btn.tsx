import React from "react";
import root from "../../../Setting.module.scss";
import styles from "../Layout.module.scss";

import { useFormContext } from "react-hook-form";

import { Data } from "components/modal/components/activity/components/user/components/setting/Setting";

export const Btn = () => {
  const { register } = useFormContext<Data>();

  return (
    <div className={styles.btn}>
      <input
        type="radio"
        id="line"
        {...register("layout")}
        value="line"
        className={`${root.radio}`}
      />
      <label className={`${root.radio_label}`} htmlFor="line">
        グラフ
      </label>

      <input
        type="radio"
        id="number"
        {...register("layout")}
        value="number"
        className={`${root.radio}`}
      />
      <label className={`${root.radio_label}`} htmlFor="number">
        数値
      </label>

      <input
        type="radio"
        id="none"
        {...register("layout")}
        value="none"
        className={`${root.radio}`}
      />
      <label className={`${root.radio_label}`} htmlFor="none">
        非表示
      </label>
    </div>
  );
};
