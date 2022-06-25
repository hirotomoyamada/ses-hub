import React from "react";
import styles from "./Select.module.scss";

interface PropType {
  select: string[];
}

export const Select: React.FC<PropType> = ({ select }) => {
  return (
    <div className={styles.select}>
      {select.length}&nbsp;<span>/&nbsp;15人</span>
    </div>
  );
};
