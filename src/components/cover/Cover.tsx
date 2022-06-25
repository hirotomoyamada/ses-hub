import React from "react";
import styles from "./Cover.module.scss";

interface PropType {
  src: string;
}

export const Cover: React.FC<PropType> = ({ src }) => {
  return (
    <img
      src={`${process.env.PUBLIC_URL}/img/cover/${src}.png`}
      alt=""
      className={`${styles.cover}`}
    />
  );
};
