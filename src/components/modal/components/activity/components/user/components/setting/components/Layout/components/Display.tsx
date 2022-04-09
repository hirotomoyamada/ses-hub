import React from "react";
import root from "../../../Setting.module.scss";
import styles from "../Layout.module.scss";

import { useFormContext } from "react-hook-form";

import { Data } from "components/modal/components/activity/components/user/components/setting/Setting";

export const Display = () => {
  const { register } = useFormContext<Data>();

  return (
    <div className={root.setting_wrap}>
      <p className={root.setting_container_ttl}>レイアウト</p>

      <div className={styles.container}>
        <div className={styles.wrap}>
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
      </div>
    </div>
  );
};
