import React from "react";
import styles from "../Entry.module.scss";

import { Btn } from "./Btn";
import { Company, Matter, Resource } from "types/post";

interface PropType {
  user: Matter["user"] | Resource["user"] | Company;
  handleEntry: () => void;
}

export const Social: React.FC<PropType> = ({ user, handleEntry }) => {
  return user?.profile?.social ? (
    <div className={styles.entry_sns}>
      <div className={styles.entry_sns_wrap}>
        <Btn user={user} type="line" handleEntry={handleEntry} />
        <Btn user={user} type="twitter" handleEntry={handleEntry} />
        <Btn user={user} type="instagram" handleEntry={handleEntry} />
        <Btn user={user} type="linkedIn" handleEntry={handleEntry} />
      </div>

      <span className={styles.entry_email_desc}>
        こちらのユーザーが登録しているSNS
      </span>
    </div>
  ) : (
    <></>
  );
};
