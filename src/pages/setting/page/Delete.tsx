import React, { useEffect } from "react";
import styles from "./Page.module.scss";
import root from "../Setting.module.scss";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { useScrollController } from "hooks/useScrollController";

import * as rootSlice from "features/root/rootSlice";

import { User } from "types/user";
import { Data } from "../Setting";

interface PropType {
  user: User;
  next: boolean;
  setNext: React.Dispatch<React.SetStateAction<boolean>>;
  setReset: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Delete: React.FC<PropType> = ({
  user,
  next,
  setReset,
  setNext,
}) => {
  useScrollController();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<Data>();

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
        onClick={() => {
          if (!user?.payment?.children?.length) {
            handleVerification();
          } else {
            navigate("/account", { state: { password: password } });
          }
        }}
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
