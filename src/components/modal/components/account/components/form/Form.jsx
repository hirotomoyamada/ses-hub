import styles from "./Form.module.scss";

import { useFormContext } from "react-hook-form";

export const Form = ({ type }) => {
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
          {type === "create"
            ? "新しいアカウントの作成"
            : type === "email"
            ? "メールアドレスの変更"
            : "アカウントを削除"}
        </p>
        {type === "email" && (
          <p className={styles.form_head_desc}>
            変更するには、新しいメールアドレスと
            <br />
            変更したいアカウントのパスワードを入力してください
          </p>
        )}

        {type === "delete" && (
          <p className={styles.form_head_desc}>
            削除するには、削除したいアカウントのパスワードを入力してください
            <br />
            <br />
            アカウントを削除すると、これまでのデータ(投稿やプロフィールなど)は
            <br />
            すべて削除され、アカウント同士のリンクも解除されます
            <br />
            <br />
            また、復元することもできませんのでご注意ください
            <br />
          </p>
        )}
      </div>

      {type !== "delete" && (
        <div>
          <input
            type="text"
            className={`${styles.form_input} ${
              errors.email && styles.form_input_error
            }`}
            placeholder={
              type === "create" ? "メールアドレス" : "新しいメールアドレス"
            }
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
          {...register(type === "create" ? "verifiedPassword" : "password", {
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

        {((type === "create" && errors.verifiedPassword?.message) ||
          (type === "delete" && errors.password?.message)) && (
          <span className={styles.form_error}>
            {type === "create"
              ? errors.verifiedPassword?.message
              : errors.password?.message}
          </span>
        )}
      </div>

      {type === "create" && (
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
        className={`${styles.form_btn} ${
          type === "delete" && styles.form_btn_delete
        } ${
          ((type === "create" && (!email || !password || !verifiedPassword)) ||
            (type === "email" && (!email || !password)) ||
            (type === "delete" && !password)) &&
          styles.form_btn_disable
        }`}
      >
        {type === "create"
          ? email && password && verifiedPassword
            ? "作成する"
            : "メールアドレスとパスワードを入力してください"
          : type === "email"
          ? email && password
            ? "変更する"
            : "メールアドレスとパスワードを入力してください"
          : password
          ? "アカウントを削除"
          : "パスワードを入力してください"}
      </button>
    </div>
  );
};
