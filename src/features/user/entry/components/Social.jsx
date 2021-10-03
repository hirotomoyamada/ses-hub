import styles from "../Entry.module.scss";
import { Btn } from "./Btn";

export const Social = ({ handleEntry, user }) => {
  return (
    <div className={styles.entry_sns}>
      <div className={styles.entry_sns_wrap}>
        <Btn handleEntry={handleEntry} user={user} type="line" />
        <Btn handleEntry={handleEntry} user={user} type="twitter" />
        <Btn handleEntry={handleEntry} user={user} type="instagram" />
        <Btn handleEntry={handleEntry} user={user} type="linkedIn" />
      </div>

      <span className={styles.entry_email_desc}>
        こちらのユーザーが登録しているSNS
      </span>
    </div>
  );
};
