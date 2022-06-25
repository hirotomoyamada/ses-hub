import React from "react";
import styles from "./Span.module.scss";

import FilterListIcon from "@material-ui/icons/FilterList";

import * as Activity from "components/modal/components/activity/Activity";

interface PropType {
  span: Activity.Span;
  setSpan: React.Dispatch<React.SetStateAction<Activity.Span>>;
}

export const Span: React.FC<PropType> = ({ span, setSpan }) => {
  return (
    <div className={styles.span}>
      <select
        className={styles.span_select}
        onChange={(e) => setSpan(e.target.value as Activity.Span)}
        defaultValue={span}
      >
        <option value="total">すべて</option>
        <option value="day">今日</option>
        <option value="week">今週</option>
        <option value="month">今月</option>
      </select>

      <FilterListIcon className={styles.span_icon} />
    </div>
  );
};
