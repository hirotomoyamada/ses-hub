import styles from "./Form.module.scss";

import { useFormContext } from "react-hook-form";

export const Form = ({ create }) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const verifiedPassword = watch("verifiedPassword");

  return (
    <div className={styles.form}>
      <div className={styles.form_head}>
        <p className={styles.form_head_ttl}>
          {create ? "新しいアカウントの作成" : "パスワードを再入力"}
        </p>
        {!create && (
          <p className={styles.form_head_desc}>
            続けるにはこのアカウントのパスワードをもう一度入力してください
          </p>
        )}
      </div>

      {create && (
        <div>
          <input
            type="text"
            className={`${styles.form_input} ${
              errors.email && styles.form_input_error
            }`}
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

          {errors.email?.message && (
            <span className={styles.form_error}>{errors.email?.message}</span>
          )}
        </div>
      )}

      <div>
        <input
          type="password"
          className={`${styles.form_input} ${
            errors.verifiedPassword && styles.form_input_error
          }`}
          placeholder="パスワード"
          {...register(create ? "verifiedPassword" : "password", {
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

        {(create && errors.verifiedPassword?.message) ||
          (!create && errors.password?.message && (
            <span className={styles.form_error}>
              {create
                ? errors.verifiedPassword?.message
                : errors.password?.message}
            </span>
          ))}
      </div>

      {create && (
        <div>
          <input
            type="password"
            className={`${styles.form_input} ${
              errors.password && styles.form_input_error
            }`}
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

          {errors.password?.type === "verified" && (
            <span className={styles.form_error}>パスワードが一致しません</span>
          )}

          {errors.password?.message && (
            <span className={styles.form_error}>
              {errors.password?.message}
            </span>
          )}
        </div>
      )}

      <button type="submit" className={styles.form_btn}>
        {create ? "作成する" : "次へ"}
      </button>
    </div>
  );
};
