import styles from "../Contact.module.scss";
import { LinkBtn } from "../../../promotion/components/btn/Btn";

export const Complete = () => {
  return (
    <div className={styles.contact_form_inner}>
      <div className={styles.contact_form_desc}>
        <p>
          ご記入いただきましたメールアドレスへ、<span>自動返信の確認メールをお送りしています。</span>
          <br />
          確認メールが届かない場合、<span>メールアドレスに誤りがあった可能性がございます。</span>
          <br />
          ご確認の上、<span>もう一度お問い合わせいただきますようお願い申し上げます。</span>
          <br />
        </p>
      </div>
      <div className={styles.contact_form_btn_link}>
        <LinkBtn txt="トップページへ" src="" square />
      </div>
    </div>
  );
};
