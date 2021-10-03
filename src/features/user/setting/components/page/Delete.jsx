import styles from "./Page.module.scss";
import root from "../../Setting.module.scss";

import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { VerificationModal } from "../../../../../components/modal/Modal";

export const Delete = ({ next, user, setReset, setNext }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const [verification, setVerification] = useState(false);

  useEffect(() => {
    const password = user.provider.find((provider) => provider === "password");
    !password && setNext(true);
    return () => {
      setNext(false);
    };
  }, [setNext, user.provider]);

  const handleCancel = () => {
    setVerification(false);
  };

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

        <span className={styles.error}>{errors.password?.message}</span>
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
        <p className={styles.head_ttl}>アカウントを削除</p>
        <p className={styles.head_desc}>
          アカウントを削除すると、これまでのデータはすべて削除されます
        </p>
      </div>

      <button
        type="button"
        onClick={() => setVerification(true)}
        className={`${root.setting_btn} ${root.setting_btn_delete}`}
      >
        　アカウント削除
      </button>

      <VerificationModal
        verification={verification}
        text="アカウント"
        cancel={handleCancel}
        submit="submit"
      />
    </div>
  );
};
