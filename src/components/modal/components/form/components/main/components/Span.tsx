import React from "react";
import styles from "./Item.module.scss";
import root from "../Main.module.scss";

import { useFormContext } from "react-hook-form";

export const Span: React.FC = () => {
  const { register } = useFormContext();

  return (
    <div className={root.main_col}>
      <span className={root.main_tag}>支払いサイト</span>
      <div className={`${styles.item} ${styles.item_select}`}>
        <select className={styles.item_input} {...register("span")}>
          <option value={30}>30日</option>
          <option value={35}>35日</option>
          <option value={40}>40日</option>
          <option value={45}>45日</option>
          <option value={50}>50日</option>
          <option value={60}>60日</option>
          <option value={"その他"}>その他</option>
        </select>
      </div>
    </div>
  );
};
