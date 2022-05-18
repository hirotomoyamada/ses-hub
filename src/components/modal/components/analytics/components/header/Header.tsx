import React from "react";
import styles from "./Header.module.scss";

import { Span } from "./components/span/Span";
import { Sort } from "./components/sort/Sort";

import * as Analytics from "components/modal/components/analytics/Analytics";
import { Save } from "./components/save/Save";

interface PropType {
  span: Analytics.Span;
  sort: Analytics.Sort;
  setting: boolean;
  setSpan: React.Dispatch<React.SetStateAction<Analytics.Span>>;
  setSort: React.Dispatch<React.SetStateAction<Analytics.Sort>>;
  setSetting: React.Dispatch<React.SetStateAction<boolean>>;
  handleClose: () => void;
}

export const Header: React.FC<PropType> = ({
  span,
  sort,
  setting,
  setSpan,
  setSort,
  setSetting,
  handleClose,
}) => {
  return (
    <div
      className={`
        ${styles.header} 
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
        {!setting ? "アナリティクス" : "設定"}
      </p>

      {!setting && (
        <div className={styles.header_command}>
          <Sort sort={sort} setSort={setSort} />
          <Span span={span} setSpan={setSpan} />
        </div>
      )}

      {setting && <Save />}
    </div>
  );
};
