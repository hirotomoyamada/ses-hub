import styles from "../Entry.module.scss";
import { CopyToClipboard } from "react-copy-to-clipboard";

export const Body = ({
  value,
  setValue,
  copy,
  handleCopy,
  handleEntry,
  user,
}) => {
  return (
    <>
      <div className={styles.entry_body}>
        <p className={styles.entry_body_head}>問い合わせをする内容</p>
        <div className={styles.entry_body_inner}>
          <textarea
            className={styles.entry_body_value}
            defaultValue={value}
            onChange={(e) => setValue(e.target.value)}
          ></textarea>

          <CopyToClipboard text={value} onCopy={!copy && handleCopy}>
            <button className={styles.entry_body_btn}>
              問い合わせする内容をクリップボードに保存する
            </button>
          </CopyToClipboard>
          {copy && <div className={styles.entry_body_pop}>コピーしました</div>}
        </div>
      </div>

      <div className={styles.entry_email}>
        <button onClick={handleEntry} className={styles.entry_email_btn}>
          <a
            href={`mailto:${user.profile.email}`}
            className={styles.user_main_profile_link}
          >
            メールで問い合わせをする
          </a>
        </button>

        <span className={styles.entry_email_desc}>
          ※メールアプリが起動します
        </span>
      </div>
    </>
  );
};
