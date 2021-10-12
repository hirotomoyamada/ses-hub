import styles from "./Page.module.scss";
import root from "../../Setting.module.scss";

import { useFormContext } from "react-hook-form";

export const Create = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const verifiedPassword = watch("verifiedPassword");

  return (
    <div className={root.setting_inner}>
      <div className={styles.head}>
        <p className={styles.head_ttl}>メールアカウント作成</p>
      </div>

      <div>
        <input
          type="text"
          className={`${styles.input} ${errors.email && styles.input_error}`}
          placeholder="メールアドレス"
          {...register("email", {
            required: {
              value: true,
              message: "メールアドレスを入力してください",
            },
            pattern: {
              value:
                /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/,
              message: "メールアドレスを正しい形式で入力してください",
            },
          })}
        />

        <span className={styles.error}>{errors.email?.message}</span>
      </div>

      <div>
        <input
          type="password"
          className={`${styles.input} ${
            errors.verifiedPassword && styles.input_error
          }`}
          placeholder="新しいパスワード"
          {...register("verifiedPassword", {
            required: {
              value: true,
              message: "パスワードを入力してください",
            },
            minLength: {
              value: 8,
              message: "パスワードを8文字以上で入力してください",
            },
          })}
        />

        <span className={styles.error}>{errors.verifiedPassword?.message}</span>
      </div>

      <div>
        <input
          type="password"
          className={`${styles.input} ${errors.password && styles.input_error}`}
          placeholder="パスワード確認"
          {...register("password", {
            required: {
              value: true,
              message: "パスワードを入力してください",
            },
            minLength: {
              value: 8,
              message: "パスワードを8文字以上で入力してください",
            },
            validate: {
              verified: (value) => value === verifiedPassword,
            },
          })}
        />

        <span className={styles.error}>
          {errors.password?.type === "verified" && "パスワードが一致しません"}
        </span>

        <span className={styles.error}>{errors.password?.message}</span>
      </div>

      <button type="submit" className={root.setting_btn}>
        有効にする
      </button>
    </div>
  );
};
