import React from "react";
import styles from "../Contact.module.scss";

interface PropType {
  company: string;
  person: string;
  position: string;
  email: string;
  body: string;
  onBack: () => void;
}

export const Verification: React.FC<PropType> = ({
  company,
  person,
  position,
  email,
  body,
  onBack,
}) => {
  const items: { tag: string; verification: string }[] = [
    { tag: "会社名", verification: company },
    { tag: "お名前", verification: person },
    { tag: "役職", verification: position },
    { tag: "メールアドレス", verification: email },
    { tag: "内容", verification: body },
  ];

  const container: JSX.Element[] = (() => {
    const el = items.map((item) => (
      <div className={styles.contact_form_item}>
        <span
          className={`${styles.contact_form_tag} ${styles.contact_form_tag_verification}`}
        >
          {item.tag}
        </span>
        
        <p
          className={`
            ${styles.contact_form_verification}
            ${item.tag === "内容" && styles.contact_form_verification_textarea}
          `}
        >
          {item.verification}
        </p>
      </div>
    ));

    return el;
  })();

  return (
    <div className={styles.contact_form_inner}>
      {container}

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
