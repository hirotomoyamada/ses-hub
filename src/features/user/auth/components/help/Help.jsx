import styles from "./Help.module.scss";

import CancelIcon from "@material-ui/icons/Cancel";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import HelpIcon from "@material-ui/icons/Help";

export const Help = ({ help, email, profile, create, setHelp }) => {
  return (
    <div className={help ? styles.open : styles.close}>
      <div className={styles.overlay} onClick={() => setHelp(!help)}></div>

      <div className={styles.help}>
        <span className={styles.auth_ttl}>スタートガイド</span>

        <div className={styles.help_container}>
          <div className={styles.help_wrap}>
            {create ? (
              <CheckBoxIcon className={styles.help_icon} />
            ) : (
              <CheckBoxOutlineBlankIcon
                className={`${styles.help_icon} ${styles.help_icon_none}`}
              />
            )}

            <span className={styles.help_text}>アカウント作成</span>
          </div>
          <div className={styles.help_wrap}>
            {create && !email ? (
              <CheckBoxIcon className={styles.help_icon} />
            ) : (
              <CheckBoxOutlineBlankIcon
                className={`${styles.help_icon} ${styles.help_icon_none}`}
              />
            )}
            <span className={styles.help_text}>メールアドレス確認</span>
          </div>
          <div className={styles.help_wrap}>
            {create && !email && !profile ? (
              <CheckBoxIcon className={styles.help_icon} />
            ) : (
              <CheckBoxOutlineBlankIcon
                className={`${styles.help_icon} ${styles.help_icon_none}`}
              />
            )}
            <span className={styles.help_text}>プロフィール入力</span>
          </div>
          <div className={styles.help_wrap}>
            <CheckBoxOutlineBlankIcon
              className={`${styles.help_icon} ${styles.help_icon_none}`}
            />

            <span className={styles.help_text}>承認待ち</span>
          </div>
          <div className={styles.help_wrap}>
            <CheckBoxOutlineBlankIcon
              className={`${styles.help_icon} ${styles.help_icon_none}`}
            />

            <span className={styles.help_text}>サービス利用開始</span>
          </div>
        </div>

        <button
          type="button"
          className={styles.help_close}
          onClick={() => setHelp(!help)}
        >
          <CancelIcon className={styles.help_close_icon} />
        </button>
      </div>
    </div>
  );
};

export const StartGuide = ({ help, setHelp }) => {
  return (
    <div className={styles.help_open}>
      <button
        type="button"
        className={styles.help_open_inner}
        onClick={() => setHelp(!help)}
      >
        <HelpIcon className={styles.help_open_icon} />
        <span>スタートガイドはこちら</span>
      </button>
    </div>
  );
};
