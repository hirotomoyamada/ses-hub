import styles from "./Form.module.scss";

import { useFormContext } from "react-hook-form";

export const Form = ({ create }) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const email = watch("email");
  const password = watch("password");
  const verifiedPassword = watch("verifiedPassword");

  return (
    <div className={styles.form}>
      <div className={styles.form_head}>
        <p className={styles.form_head_ttl}>
          {create ? "新しいアカウントの作成" : "アカウントを削除"}
        </p>
        {!create && (
          <p className={styles.form_head_desc}>
            削除するには、このアカウントのパスワードを入力してください
            <br />
            <br />
            アカウントを削除すると、これまでのデータはすべて削除され
            <br />
            アカウント同士のリンクも解除されます
            <br />
            <br />
            また、復元することもできませんのでご注意ください
            <br />
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

        {((create && errors.verifiedPassword?.message) ||
          (!create && errors.password?.message)) && (
          <span className={styles.form_error}>
            {create
              ? errors.verifiedPassword?.message
              : errors.password?.message}
          </span>
        )}
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

      <button
        type="submit"
        className={`${styles.form_btn} ${!create && styles.form_btn_delete} ${
          ((create && (!email || !password || !verifiedPassword)) ||
            (!create && !password)) &&
          styles.form_btn_disable
        }`}
      >
        {create
          ? email && password && verifiedPassword
            ? "作成する"
            : "メールアドレスとパスワードを入力してください"
          : password
          ? "アカウントを削除"
          : "パスワードを入力してください"}
      </button>
    </div>
  );
};
