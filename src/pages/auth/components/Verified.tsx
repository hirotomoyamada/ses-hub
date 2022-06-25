import styles from "../Auth.module.scss";

import { auth } from "libs/firebase";
import { sendEmailVerification } from "firebase/auth";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useScrollController } from "hooks/useScrollController";

import { State as Root } from "features/root/initialState";

interface PropType {
  inner: React.RefObject<HTMLDivElement>;
  email: boolean;
  verified: Root["verified"];
  handleLogout: () => void;
  handleBack: () => void;
  handleResend: () => void;
  resize: boolean;
}

export const Verified: React.FC<PropType> = ({
  inner,
  email,
  verified,
  handleLogout,
  handleBack,
  handleResend,
  resize,
}) => {
  const dispatch = useDispatch();
  useScrollController();

  useEffect(() => {
    const currentUser = auth.currentUser;
    email &&
      currentUser &&
      sendEmailVerification(currentUser, {
        url: `${process.env.REACT_APP_SES_HUB}/login`,
      }).catch(() => {
        return;
      });
  }, [dispatch, email]);

  return (
    <div
      className={`${styles.auth_inner} ${resize && styles.auth_inner_resize}`}
      ref={inner}
    >
      <span className={styles.auth_ttl}>
        {verified.error
          ? "プロフィールの作成に失敗しました"
          : verified.email
          ? "確認メールを送信しました"
          : verified.status === "disable"
          ? "このアカウントでは\nご利用いただけません"
          : verified.status === "hold" && "ただいま\n承認しております"}
      </span>

      <div className={`${styles.auth_wrap} ${styles.auth_wrap_center}`}>
        <button
          type="button"
          className={`${styles.auth_desc} ${styles.auth_desc_logout} ${styles.auth_desc_logout_verified}`}
          onClick={!verified.error ? handleLogout : handleBack}
        >
          {!verified.error ? "ログイン画面に戻る" : "プロフィール画面に戻る"}
        </button>

        {email && (
          <>
            <span className={styles.auth_desc}>|</span>

            <button
              type="button"
              className={`${styles.auth_desc} ${styles.auth_desc_center}`}
              onClick={handleResend}
            >
              確認メールが届きませんか？
            </button>
          </>
        )}
      </div>
    </div>
  );
};
