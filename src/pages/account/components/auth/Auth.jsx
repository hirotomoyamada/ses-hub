import root from "../../Account.module.scss";
import styles from "./Auth.module.scss";

import { useFormContext } from "react-hook-form";
import { useScrollController } from "../../../../hooks/useScrollController";

export const Auth = ({ reset, setReset }) => {
  useScrollController();

  const {
    register,
    formState: { errors },
  } = useFormContext();

  return !reset ? (
    <div className={root.account_inner}>
      <div className={styles.head}>
        <p className={styles.head_ttl}>パスワードを再入力</p>
        <p className={styles.head_desc}>
          続けるにはアカウントのパスワードをもう一度入力してください
        </p>
      </div>

      <div>
        <input
          type="password"
          className={`${styles.input} ${errors.password && styles.input_error}`}
          placeholder="現在のパスワード"
          {...register("password", {
            required: {
              value: true,
              message: "パスワードを入力してください",
            },
          })}
        />

        {errors.password?.message && (
          <span className={styles.error}>{errors.password?.message}</span>
        )}
      </div>

      <button
        type="button"
        className={styles.link}
        onClick={() => setReset(true)}
      >
        パスワードをお忘れですか？
      </button>

      <button type="submit" className={root.account_btn}>
        次へ
      </button>
    </div>
  ) : (
    <div className={root.account_inner}>
      <div className={styles.head}>
        <p className={styles.head_ttl}>パスワード再設定メールを送る</p>
      </div>

      <input
        type="hidden"
        {...register("password", {
          required: {
            value: false,
          },
        })}
      />

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

        {errors.email?.message && (
          <span className={styles.error}>{errors.email?.message}</span>
        )}
      </div>

      <button type="submit" className={root.account_btn}>
        送信
      </button>
    </div>
  );
};
