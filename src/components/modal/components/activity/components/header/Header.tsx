import React from "react";
import styles from "./Header.module.scss";

import { Span } from "./components/span/Span";
import { Sort } from "./components/sort/Sort";

import * as Activity from "components/modal/components/activity/Activity";

interface PropType {
  type?: "user" | "post";
  span: Activity.Span;
  sort: Activity.Sort;
  setSpan: React.Dispatch<React.SetStateAction<Activity.Span>>;
  setSort: React.Dispatch<React.SetStateAction<Activity.Sort>>;
  handleClose: () => void;
}

export const Header: React.FC<PropType> = ({
  type,
  span,
  sort,
  setSpan,
  setSort,
  handleClose,
}) => {
  return (
    <div
      className={`${styles.header} ${type === "user" && styles.header_user}`}
    >
      <button onClick={handleClose} className={styles.header_cancel}>
        もどる
      </button>

      <p className={styles.header_ttl}>アクティビティ</p>

      {type === "user" && (
        <div className={styles.header_command}>
          <Sort sort={sort} setSort={setSort} />
          <Span span={span} setSpan={setSpan} />
        </div>
      )}
    </div>
  );
};
