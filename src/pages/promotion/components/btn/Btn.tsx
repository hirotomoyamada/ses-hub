import styles from "./Btn.module.scss";
import { Link } from "react-router-dom";
import React from "react";

interface PropType {
  txt: string;
  func: () => void;
  src: string;
  acnt?: boolean;
  square?: boolean;
}

export const Btn: React.FC<
  Pick<PropType, "txt" | "acnt" | "square" | "func">
> = ({ txt, acnt, square, func }) => {
  return (
    <button
      type="button"
      className={`${styles.btn} ${
        square && styles.btn_square
      } && styles.btn_acnt} ${acnt && styles.btn_acnt}`}
      onClick={() => func()}
    >
      {txt}
    </button>
  );
};

export const LinkBtn: React.FC<
  Pick<PropType, "txt" | "acnt" | "square" | "src">
> = ({ txt, acnt, square, src }) => {
  return (
    <Link
      to={`/${src}`}
      className={`${styles.btn} ${square && styles.btn_square} ${
        acnt && styles.btn_acnt
      }`}
    >
      {txt}
    </Link>
  );
};
