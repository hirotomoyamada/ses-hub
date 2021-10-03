import styles from "../Create.module.scss";
import root from "../../../Auth.module.scss";

import { useFormContext } from "react-hook-form";

export const Name = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <span className={styles.create_tag}>
        会社名
        <span className={styles.create_tag_desc}>
          &nbsp;※&nbsp;個人の方は、個人と入力してください
        </span>
      </span>
      <div>
        <input
          className={`${root.auth_input} ${
            errors.name && root.auth_input_error
          }`}
          placeholder="Hit me up 株式会社"
          {...register("name", {
            required: {
              value: true,
              message: "会社名を入力してください",
            },
            pattern: {
              value: /^\S+/,
              message: "先頭にスペースは使えません",
            },
            maxLength: {
              value: 32,
              message: "32文字以内で入力してください",
            },
          })}
        />
        <span className={root.auth_error}>{errors.name?.message}</span>
      </div>
    </>
  );
};
