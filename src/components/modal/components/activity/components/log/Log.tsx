import React from "react";
import styles from "./Log.module.scss";

import { Link } from "react-router-dom";
import { Icon } from "components/icon/Icon";

import * as functions from "functions";

import { Activity } from "features/post/initialState";
import { User } from "types/user";

interface PropType {
  log?: Activity["log"];
  user: User;
}

export const Log: React.FC<PropType> = ({ log, user }) => {
  const canceled = user.payment.status === "canceled";

  switch (true) {
    case Boolean(log?.length):
      return (
        <div className={styles.log}>
          {log?.map((user, i) => (
            <Link
              to={`/${user.index}/${user.uid}`}
              target="_blank"
              key={i}
              className={styles.log_container}
            >
              <Icon src={user.icon} />

              <div className={styles.log_wrap}>
                <p className={styles.log_message}>
                  <span className={styles.log_message_display}>
                    {user.display}
                    {user.display !== "自分" ? "さん" : ""}&nbsp;
                  </span>

                  <span>
                    {user.type === "likes"
                      ? "がいいねしました"
                      : user.type === "outputs"
                      ? "が出力しました"
                      : user.type === "entries"
                      ? "が問い合わせしました"
                      : ""}
                  </span>
                </p>

                <span className={styles.log_time}>
                  {functions.root.timestamp(user.createAt)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      );

    case canceled:
      return (
        <div className={`${styles.log} ${styles.log_none}`}>
          <span className={styles.log_none_question}>???</span>
        </div>
      );

    default:
      return (
        <div className={`${styles.log} ${styles.log_none}`}>
          <span>データがありません</span>
        </div>
      );
  }
};
