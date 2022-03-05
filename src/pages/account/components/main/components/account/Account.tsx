import React, { useState } from "react";
import styles from "./Account.module.scss";

import Loader from "react-loader-spinner";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import * as rootSlice from "features/root/rootSlice";

import { Btn } from "../btn/Btn";

import * as functions from "functions";

import { Company } from "types/post";
import { User } from "types/user";

interface PropType {
  user: User | Company;
  status?: boolean;
  current?: boolean;
  load?: boolean;
}

export const Account: React.FC<PropType> = ({
  user,
  status,
  current,
  load,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState(true);
  const [copy, setCopy] = useState(false);

  const handleCopy = (): void => {
    setCopy(true);
    setTimeout(() => setCopy(false), 2000);
  };

  const handlePlan = (): void => {
    history.push("/plan");
  };

  const handleCreate = (): void => {
    dispatch(
      rootSlice.handleModal({
        type: "account",
        meta: { type: "create" },
      })
    );
  };

  const handleDelete = (): void => {
    dispatch(
      rootSlice.handleModal({
        type: "account",
        meta: { type: "delete", email: user?.profile?.email as string },
      })
    );
  };

  const handleProfile = (): void => {
    dispatch(
      rootSlice.handleModal({
        type: "profile",
        meta: { type: "selectUser", selectUser: user },
      })
    );
  };

  const handleEmail = (): void => {
    dispatch(
      rootSlice.handleModal({
        type: "account",
        meta: {
          type: "email",
          uid: user?.uid,
          email: user?.profile?.email as string,
        },
      })
    );
  };

  const handleReset = async (): Promise<void> => {
    const email = user?.profile?.email;

    if (email) {
      await functions.account.handleReset({
        dispatch,
        email,
      });
    }
  };

  const handleAnnounce = (): void => {
    dispatch(
      rootSlice.handleAnnounce({ error: "変更するにはプランの加入が必要です" })
    );
  };

  return !load ? (
    <div className={`${styles.account} ${current && styles.account_current}`}>
      {current && (
        <span className={styles.account_txt}>あなたのアカウント</span>
      )}

      <div className={styles.account_container}>
        <CopyToClipboard
          text={email && user?.profile?.email ? user.profile.email : user?.uid}
          onCopy={handleCopy}
        >
          <button
            type="button"
            className={`
              ${styles.account_txt_email} 
              ${!email && styles.account_txt_uid} 
              ${copy && styles.account_txt_copy} 
              ${
                (!user?.profile?.email || current) && styles.account_txt_disable
              }
              ${!user?.profile?.email && styles.account_txt_disable_none}
            `}
          >
            {user?.profile?.email
              ? email
                ? user?.profile?.email
                : user?.uid
              : "作成されていません"}
          </button>
        </CopyToClipboard>

        {current && <Btn type="plan" txt="プランの変更" func={handlePlan} />}

        {!current && (
          <div className={styles.account_btn}>
            {!user?.profile?.email && status && (
              <Btn type="create" txt="作成" func={handleCreate} />
            )}

            {user?.profile?.email && status && (
              <Btn
                type="link"
                txt="ユーザーページ"
                src={`/companys/${user?.uid}`}
              />
            )}

            {user?.profile?.email && (
              <Btn
                type="setting"
                txt="設定"
                command={[
                  email ? "ユーザーID確認" : "メールアドレス確認",
                  "プロフィール変更",
                  "メールアドレス変更",
                  "パスワード再設定",
                ]}
                func={[
                  () => setEmail(!email),
                  status ? handleProfile : handleAnnounce,
                  status ? handleEmail : handleAnnounce,
                  handleReset,
                ]}
              />
            )}

            {user?.profile?.email && (
              <Btn type="delete" txt="削除" func={handleDelete} />
            )}
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className={`${styles.account} ${styles.account_load}`}>
      <Loader
        className={styles.load_ttl_icon}
        type="Oval"
        color="#49b757"
        height={32}
        width={32}
      />
    </div>
  );
};
