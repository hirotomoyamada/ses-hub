import styles from "../Contact.module.scss";

export const Verification = ({
  company,
  person,
  position,
  email,
  body,
  onBack,
}) => {
  return (
    <div className={styles.contact_form_inner}>
      <div className={styles.contact_form_item}>
        <span
          className={`${styles.contact_form_tag} ${styles.contact_form_tag_verification}`}
        >
          会社名
        </span>
        <p className={styles.contact_form_verification}>{company}</p>
      </div>

      <div className={styles.contact_form_item}>
        <span
          className={`${styles.contact_form_tag} ${styles.contact_form_tag_verification}`}
        >
          お名前
        </span>
        <p className={styles.contact_form_verification}>{person}</p>
        <></>
      </div>

      <div className={styles.contact_form_item}>
        <span
          className={`${styles.contact_form_tag} ${styles.contact_form_tag_verification}`}
        >
          役職
        </span>
        <p className={styles.contact_form_verification}>{position}</p>
      </div>

      <div className={styles.contact_form_item}>
        <span
          className={`${styles.contact_form_tag} ${styles.contact_form_tag_verification}`}
        >
          メールアドレス
        </span>
        <p className={styles.contact_form_verification}>{email}</p>
      </div>

      <div className={styles.contact_form_item}>
        <span
          className={`${styles.contact_form_tag} ${styles.contact_form_tag_verification}`}
        >
          内容
        </span>
        <p
          className={`${styles.contact_form_verification} ${styles.contact_form_verification_textarea}`}
        >
          {body}
        </p>
      </div>

      <div className={styles.contact_form_submit}>
        <button
          type="button"
          className={`${styles.contact_form_btn} ${styles.contact_form_btn_back}`}
          onClick={onBack}
        >
          入力画面に戻る
        </button>
        <button className={styles.contact_form_btn}>送信</button>
      </div>
    </div>
  );
};
