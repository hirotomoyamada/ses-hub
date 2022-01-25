import styles from "./Page.module.scss";
import root from "../Setting.module.scss";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { useScrollController } from "../../../hook/useScrollController";

import * as rootSlice from "../../../features/root/rootSlice.js";

export const Delete = ({ next, user, setReset, setNext }) => {
  useScrollController();

  const dispatch = useDispatch();
  const history = useHistory();

  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const password = watch("password");

  const handleVerification = () => {
    dispatch(
      rootSlice.handleModal({
        type: "delete",
        text: "アカウント",
      })
    );
  };

  useEffect(() => {
    const password = user.provider.find((provider) => provider === "password");
    !password && setNext(true);
    return () => {
      setNext(false);
    };
  }, [setNext, user.provider]);

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
        <p
          className={`${styles.head_ttl} ${
            user?.payment?.children?.length && styles.head_ttl_disable
          }`}
        >
          {!user?.payment?.children?.length
            ? "アカウントを削除"
            : "アカウントを削除できません"}
        </p>
        <p className={styles.head_desc}>
          {!user?.payment?.children?.length
            ? "アカウントを削除すると、これまでのデータはすべて削除されます"
            : "このアカウントを削除するには、グループアカウントをすべて削除する必要があります"}
        </p>
      </div>

      <button
        type="button"
        onClick={
          !user?.payment?.children?.length
            ? handleVerification
            : () =>
                history.push({
                  pathname: "/account",
                  state: { password: password },
                })
        }
        className={`${root.setting_btn} ${
          !user?.payment?.children?.length && root.setting_btn_delete
        }`}
      >
        {!user?.payment?.children?.length
          ? "アカウントを削除"
          : "グループアカウントへ移動する"}
      </button>
    </div>
  );
};
