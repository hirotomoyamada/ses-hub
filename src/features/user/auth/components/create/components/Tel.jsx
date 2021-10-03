import styles from "../Create.module.scss";
import root from "../../../Auth.module.scss";

import { useFormContext } from "react-hook-form";

export const Tel = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <span className={styles.create_tag}>電話番号</span>
      <div>
        <input
          className={`${root.auth_input} ${root.auth_input_min} ${
            errors.tel && root.auth_input_error
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
        <span className={root.auth_error}>{errors.tel?.message}</span>
      </div>
    </>
  );
};
