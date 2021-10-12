import styles from "./Page.module.scss";
import root from "../../Setting.module.scss";

import { useFormContext } from "react-hook-form";

export const Password = ({ next, setReset }) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const verifiedPassword = watch("verifiedPassword");

  return !next ? (
    <div className={root.setting_inner}>
      <div className={styles.head}>
        <p className={styles.head_ttl}>パスワードを再入力</p>
        <p className={styles.head_desc}>
          続けるにはアカウントのパスワードをもう一度入力してください
        </p>
      </div>

      <div>
        <input
          type="password"
          className={`${styles.input} ${
            errors.currentPassword && styles.input_error
          }`}
          placeholder="現在のパスワード"
          {...register("currentPassword", {
            required: {
              value: true,
              message: "パスワードを入力してください",
            },
          })}
        />

        <span className={styles.error}>{errors.currentPassword?.message}</span>
      </div>

      <button
        type="button"
        className={styles.link}
        onClick={() => setReset(true)}
      >
        パスワードをお忘れですか？
      </button>

      <button type="submit" className={root.setting_btn}>
        次へ
      </button>
    </div>
  ) : (
    <div className={root.setting_inner}>
      <div className={styles.head}>
        <p className={styles.head_ttl}>パスワードの変更</p>
      </div>

      <input type="hidden" {...register("currentPassword")} />

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
          className={`${styles.input} ${
            errors.newPassword && styles.input_error
          }`}
          placeholder="パスワード確認"
          {...register("newPassword", {
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
          {errors.newPassword?.type === "verified" &&
            "パスワードが一致しません"}
        </span>

        <span className={styles.error}>{errors.newPassword?.message}</span>
      </div>

      <button type="submit" className={root.setting_btn}>
        　変更する
      </button>
    </div>
  );
};
