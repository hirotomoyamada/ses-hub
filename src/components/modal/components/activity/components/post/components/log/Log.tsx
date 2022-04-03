import React from "react";
import styles from "./Log.module.scss";

import { Icon } from "components/icon/Icon";

import * as functions from "functions";
import { Link } from "react-router-dom";

interface PropType {
  log: Record<string, string | number>[];
}

export const Log: React.FC<PropType> = ({ log }) => {
  return (
    <div className={styles.log}>
      {log.map((user, i) => (
        <Link
          to={`/${user.index}/${user.uid}`}
          target="_blank"
          key={i}
          className={styles.log_container}
        >
          <Icon src={user.icon as string} />

          <div className={styles.log_wrap}>
            <p className={styles.log_message}>
              <span className={styles.log_message_display}>
                {user.display}さん&nbsp;
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
              {functions.root.timestamp(user.createAt as number)}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};
