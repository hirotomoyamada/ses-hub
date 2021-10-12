import styles from "../Form.module.scss";
import { useFormContext } from "react-hook-form";

import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

export const Tel = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [open, setOpen] = useState(false);

  return (
    <div className={styles.form_col}>
      <button type="button" onClick={() => setOpen(!open)}>
        <div className={styles.form_row}>
          <span className={styles.form_tag}>電話番号</span>

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
            className={`${styles.form_input} ${styles.form_input_min} ${
              errors.tel && styles.form_input_error
            }`}
            placeholder="01-2345-6789"
            {...register("tel", {
              pattern: {
                value: /^0\d{2,4}-\d{2,4}-\d{3,4}$/,
                message: "正しい電話番号を入力してください",
              },
              maxLength: {
                value: 13,
                message: "13文字以内で入力してください",
              },
            })}
          />
          <span className={styles.form_error}>{errors.tel?.message}</span>
        </div>
      )}
    </div>
  );
};
