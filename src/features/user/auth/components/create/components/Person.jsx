import styles from "../Create.module.scss";
import root from "../../../Auth.module.scss";

import { useFormContext } from "react-hook-form";

export const Person = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <span className={styles.create_tag}>
        担当者名
        <span className={styles.create_tag_desc}>
          &nbsp;※&nbsp;必ず、フルネームで入力してください
        </span>
      </span>
      <div>
        <input
          className={`${root.auth_input} ${
            errors.person && root.auth_input_error
          }`}
          placeholder="山田太郎"
          {...register("person", {
            required: {
              value: true,
              message: "担当者名を入力してください",
            },
            pattern: {
              value: /^\S+/,
              message: "先頭にスペースは使えません",
            },
            minLength: {
              value: 2,
              message: "2文字以上で入力してください",
            },
            maxLength: {
              value: 24,
              message: "24文字以内で入力してください",
            },
          })}
        />
        <span className={root.auth_error}>{errors.person?.message}</span>
      </div>
    </>
  );
};
