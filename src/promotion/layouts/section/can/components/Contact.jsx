import styles from "../Can.module.scss";

export const Contact = () => {
  return (
    <div className={styles.can_container}>
      <div className={styles.can_cnt}>
        <h2 className={styles.can_cnt_ttl}>
          データベースで案件元と人材元が
          <br />
          ダイレクトマッチング
        </h2>

        <p className={styles.can_cnt_desc}>
          情報起点でのマッチングだからその後も話が早い!
          <br />
          協業する際の相性もわかるので流れはとてもスムーズです。
          <br />
          <br />
          案件・人材への問い合わせもとてもカンタン。
          <br />
          メンバープロフにあるメールやSNSへダイレクト。
          <br />
          <br />
          こんなにもカンタンな問い合わせ機能なら、
          <br />
          興味があるメンバーに即リーチできてしまいます。
        </p>
      </div>

      <figure className={`${styles.can_visual} ${styles.can_contact}`}>
        <img
          src={`${process.env.PUBLIC_URL}/img/promotion/can_contact.svg`}
          alt=""
          className={styles.can_visual_img}
        />
      </figure>
    </div>
  );
};
