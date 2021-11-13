import styles from "./Account.module.scss";

import Loader from "react-loader-spinner";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import * as rootSlice from "../../../../../../features/root/rootSlice";

import { Btn } from "../btn/Btn";

import * as functions from "../../../../../../features/user/functions/functions";

export const Account = ({ user, current, load }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handlePlan = () => {
    history.push("/plan");
  };

  const handleCreate = () => {
    dispatch(
      rootSlice.handleModal({
        type: "account",
        meta: { type: "create", email: user?.profile?.email },
      })
    );
  };

  const handleDelete = () => {
    dispatch(
      rootSlice.handleModal({
        type: "account",
        meta: { type: "delete", email: user?.profile?.email },
      })
    );
  };

  const handleReset = () => {
    const email = user?.profile?.email;

    functions.account.handleReset({
      dispatch,
      email,
    });
  };

  return !load ? (
    <div className={`${styles.account} ${current && styles.account_current}`}>
      {current && (
        <span className={styles.account_txt}>あなたのアカウント</span>
      )}

      <div className={styles.account_container}>
        <span className={`${!user?.profile?.email && styles.account_txt_none}`}>
          {user?.profile?.email ? user?.profile?.email : "作成されていません"}
        </span>

        {current && <Btn type="plan" txt="プランの変更" func={handlePlan} />}

        {!current && (
          <div className={styles.account_btn}>
            {!user?.profile?.email && (
              <Btn type="create" txt="作成" func={handleCreate} />
            )}

            {user?.profile?.email && (
              <Btn type="reset" txt="パスワード再設定" func={handleReset} />
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
