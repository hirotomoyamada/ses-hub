import styles from "./Page.module.scss";
import root from "../Setting.module.scss";

import { useFormContext } from "react-hook-form";
import { useScrollController } from "../../../hook/useScrollController";

export const Reset = () => {
  useScrollController();

  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={root.setting_inner}>
      <div className={styles.head}>
        <p className={styles.head_ttl}>パスワード再設定メールを送る</p>
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

      <button type="submit" className={root.setting_btn}>
        送信
      </button>
    </div>
  );
};
