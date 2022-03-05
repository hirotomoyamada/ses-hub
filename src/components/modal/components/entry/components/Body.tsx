import React from "react";
import styles from "../Entry.module.scss";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { Matter, Resource } from "types/post";

interface PropType {
  user: Matter["user"] | Resource["user"];
  value: string | undefined;
  copy: boolean;
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
  handleCopy: () => void;
  handleEntry: () => void;
}

export const Body: React.FC<PropType> = ({
  user,
  value,
  copy,
  setValue,
  handleCopy,
  handleEntry,
}) => {
  return (
    <>
      <div className={styles.entry_body}>
        <textarea
          className={styles.entry_body_value}
          defaultValue={value}
          onChange={(e) => setValue(e.target.value)}
        ></textarea>

        <CopyToClipboard
          text={value as string}
          onCopy={() => !copy && handleCopy()}
        >
          <button
            className={`${styles.entry_body_btn} ${
              !value && styles.entry_body_btn_disable
            }`}
          >
            問い合わせする内容をクリップボードに保存する
          </button>
        </CopyToClipboard>
        {copy && <div className={styles.entry_body_pop}>コピーしました</div>}
      </div>

      <div className={styles.entry_email}>
        <button onClick={handleEntry} className={styles.entry_email_btn}>
          <a
            href={`mailto:${user?.profile?.email}`}
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
