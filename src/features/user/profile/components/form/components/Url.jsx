import styles from "../Form.module.scss";
import { useFormContext } from "react-hook-form";

import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

export const Url = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [open, setOpen] = useState(false);

  return (
    <div className={styles.form_col}>
      <button type="button" onClick={() => setOpen(!open)}>
        <div className={styles.form_row}>
          <span className={styles.form_tag}>URL</span>

          <FontAwesomeIcon
            icon={faChevronRight}
            className={`${styles.form_icon_open} ${
              open && styles.form_icon_close
            }`}
          />
        </div>
      </button>

      {open && (
        <div>
          <input
            className={`${styles.form_input} ${
              errors.url && styles.form_input_error
            }`}
            placeholder="https://"
            {...register("url", {
              pattern: {
                value: /^\S+/,
                message: "先頭にスペースは使えません",
              },
              maxLength: {
                value: 144,
                message: "144文字以内で入力してください",
              },
            })}
          />
          <span className={styles.form_error}>{errors.url?.message}</span>
        </div>
      )}
    </div>
  );
};
