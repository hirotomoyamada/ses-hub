import styles from "./Account.module.scss";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import * as rootSlice from "../../../../../../features/root/rootSlice";

import { Btn } from "../btn/Btn";

import * as functions from "../../../../../../features/user/functions/functions";

export const Account = ({ user, current }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handlePlan = () => {
    history.push("/plan");
  };

  const handleCreate = () => {
    dispatch(
      rootSlice.handleModal({
        type: "account",
        meta: { type: "create", target: user?.profile?.email },
      })
    );
  };

  const handleDelete = () => {
    dispatch(
      rootSlice.handleModal({
        type: "account",
        meta: { type: "delete", target: user?.profile?.email },
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

  return (
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
  );
};
