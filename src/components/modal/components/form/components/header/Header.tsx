import React from "react";
import styles from "./Header.module.scss";

import { useFormContext } from "react-hook-form";
import { ThreeDots } from "react-loader-spinner";

interface PropType {
  handleClose: () => void;
  edit?: boolean;
  fetch?: boolean;
}

export const Header: React.FC<PropType> = ({ edit, fetch, handleClose }) => {
  const { register } = useFormContext();

  return (
    <div className={styles.header}>
      <button
        type="button"
        className={`${styles.header_cancel} ${
          fetch && styles.header_cancel_disabled
        }`}
        onClick={handleClose}
      >
        キャンセル
      </button>

      <div className={styles.header_wrap}>
        <div className={styles.header_display}>
          <input
            type="radio"
            id="display1"
            value="public"
            {...register("display")}
          />

          <label className={styles.header_display_btn} htmlFor="display1">
            公開
          </label>

          <input
            type="radio"
            id="display2"
            value="private"
            {...register("display")}
          />

          <label className={styles.header_display_btn} htmlFor="display2">
            非公開
          </label>
        </div>

        <button className={styles.header_submit} type="submit">
          {fetch ? (
            <ThreeDots color="#FFF" height={24} width={24} />
          ) : edit ? (
            "編集"
          ) : (
            "登録"
          )}
        </button>
      </div>
    </div>
  );
};
