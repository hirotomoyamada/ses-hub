import React, { useState } from "react";
import styles from "./Page.module.scss";
import root from "../Setting.module.scss";

import { useFormContext } from "react-hook-form";
import { useScrollController } from "hooks/useScrollController";

import { Data } from "../Setting";
import { ThreeDots } from "react-loader-spinner";

export const Reset: React.FC = () => {
  const [load, setLoad] = useState<boolean>(false);

  useScrollController();

  const {
    register,
    formState: { errors },
  } = useFormContext<Data>();

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

        {errors?.email?.message && (
          <span className={styles.error}>{errors.email.message}</span>
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
