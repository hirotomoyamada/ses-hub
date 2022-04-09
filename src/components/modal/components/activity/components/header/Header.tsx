import React from "react";
import styles from "./Header.module.scss";

import { Span } from "./components/span/Span";
import { Sort } from "./components/sort/Sort";

import * as Activity from "components/modal/components/activity/Activity";
import { Save } from "./components/save/Save";

interface PropType {
  type?: "user" | "post";
  span: Activity.Span;
  sort: Activity.Sort;
  setting: boolean;
  verification: boolean;
  setSpan: React.Dispatch<React.SetStateAction<Activity.Span>>;
  setSort: React.Dispatch<React.SetStateAction<Activity.Sort>>;
  setSetting: React.Dispatch<React.SetStateAction<boolean>>;
  handleClose: () => void;
}

export const Header: React.FC<PropType> = ({
  type,
  span,
  sort,
  setting,
  verification,
  setSpan,
  setSort,
  setSetting,
  handleClose,
}) => {
  return (
    <div
      className={`
        ${styles.header} 
        ${type === "user" && styles.header_user} 
        ${setting && styles.header_setting}
      `}
    >
      <button
        onClick={!setting ? handleClose : () => setSetting(false)}
        className={styles.header_cancel}
      >
        {!setting ? "とじる" : "もどる"}
      </button>

      <p
        className={`${styles.header_ttl} ${
          setting && styles.header_ttl_setting
        }`}
      >
        {!setting ? "アクティビティ" : "設定"}
      </p>

      {type === "user" && !setting && (
        <div className={styles.header_command}>
          <Sort sort={sort} setSort={setSort} />
          <Span span={span} setSpan={setSpan} />
        </div>
      )}

      {setting && <Save verification={verification} />}
    </div>
  );
};
