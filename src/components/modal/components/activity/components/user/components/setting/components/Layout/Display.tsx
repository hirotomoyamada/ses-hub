import React, { useState } from "react";
import root from "../../Setting.module.scss";
import styles from "./Layout.module.scss";

import { useFormContext } from "react-hook-form";

import { Data } from "components/modal/components/activity/components/user/components/setting/Setting";

export const Display: React.FC = () => {
  const { register } = useFormContext<Data>();
  const [open, setOpen] = useState<boolean>(true);

  return (
    <div className={root.setting_wrap}>
      <div className={styles.header}>
        <p className={root.setting_container_ttl}>レイアウト</p>
        <button
          type="button"
          id="display"
          className={`${root.toggle} ${open && root.toggle_open}`}
          onClick={() => setOpen(!open)}
        />
        <label className={`${root.toggle_label}`} htmlFor="display"></label>
      </div>

      {open && (
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
      )}
    </div>
  );
};
