import React, { useState } from "react";
import styles from "./Page.module.scss";
import root from "../Setting.module.scss";

import { useFormContext } from "react-hook-form";
import { useScrollController } from "hooks/useScrollController";

import { User } from "types/user";
import { Data } from "../Setting";
import { ThreeDots } from "react-loader-spinner";

interface PropType {
  user: User;
  next: boolean;
  setReset: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Email: React.FC<PropType> = ({ user, next, setReset }) => {
  const [load, setLoad] = useState<boolean>(false);

  useScrollController();

  const {
    register,
    formState: { errors },
  } = useFormContext<Data>();

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

      <button type="submit" className={root.setting_btn}>
        次へ
      </button>
    </div>
  ) : (
    <div className={root.setting_inner}>
      <div className={styles.head}>
        <p className={styles.head_ttl}>メールアドレスの変更</p>
        <p className={styles.head_desc}>
          現在のメールアドレスは{user.profile.email}
          です。更新しますか？
          <br />
          メールアドレスは、すべてのユーザーに公開されます。
        </p>
      </div>

      <input type="hidden" {...register("password")} />

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

      <button
        type="submit"
        className={root.setting_btn}
        onClick={() => setLoad(true)}
      >
        {load ? <ThreeDots color="#FFF" height={24} width={24} /> : "変更する"}
      </button>
    </div>
  );
};
