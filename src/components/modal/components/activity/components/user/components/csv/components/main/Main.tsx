import React from "react";
import styles from "./Main.module.scss";

import { Select } from "./Select";
import { Sort } from "./Sort";
import { Span } from "./Span";
import { Extension } from "./Extension";

interface PropType {
  all: boolean;
  handleAll: () => void;
}

export const Main: React.FC<PropType> = ({ all, handleAll }) => {
  return (
    <div className={styles.main}>
      <Select all={all} handleAll={handleAll} />
      <Sort />
      <Span />
      <Extension />
    </div>
  );
};
