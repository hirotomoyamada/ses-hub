import React from "react";
import styles from "./Icon.module.scss";

interface PropType {
  src: string;
}

export const Icon: React.FC<PropType> = ({ src }) => {
  return (
    <img
      src={`${process.env.PUBLIC_URL}/img/icon/${src}.svg`}
      alt=""
      className={`${styles.icon}`}
    />
  );
};
