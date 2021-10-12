import styles from "./Line.module.scss";

export const Line = () => {
  return (
    <div className={styles.line}>
      <div className={styles.line_container}>
        <p className={styles.line_tag}>1. ホームから友だち招待へ</p>
        <img
          src={`${process.env.PUBLIC_URL}/img/line/home.png`}
          alt=""
          className={styles.line_img}
        />
      </div>
      <div className={styles.line_container}>
        <p className={styles.line_tag}>2. 友だち追加から招待へ</p>
        <img
          src={`${process.env.PUBLIC_URL}/img/line/friends.png`}
          alt=""
          className={styles.line_img}
        />
      </div>
      <div className={styles.line_container}>
        <p className={styles.line_tag}>3. SMS か メールアドレス を選択する</p>
        <img
          src={`${process.env.PUBLIC_URL}/img/line/select.png`}
          alt=""
          className={`${styles.line_img} ${styles.line_img_small}`}
        />
        <span className={styles.line_desc}>
          どちらでも、いずれかを選択してください
        </span>
      </div>
      <div className={styles.line_container}>
        <p className={styles.line_tag}>4. メールを送る相手を選択する</p>
        <img
          src={`${process.env.PUBLIC_URL}/img/line/inv.png`}
          alt=""
          className={styles.line_img}
        />
        <span className={styles.line_desc}>
          実際に送るわけではないので、どなたでも構いません
        </span>
      </div>
      <div className={styles.line_container}>
        <p className={`${styles.line_tag} ${styles.line_tag_bottom}`}>
          5. メール内容からURLを確認する
        </p>
        <img
          src={`${process.env.PUBLIC_URL}/img/line/mail.png`}
          alt=""
          className={styles.line_img}
        />
        <span className={`${styles.line_desc} ${styles.line_desc_acnt}`}>
          表示されているURLが、あなたのLINEのURLになります
        </span>
      </div>
    </div>
  );
};
