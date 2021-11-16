import styles from "../../HowTo.module.scss";
import { Tag } from "../tag/Tag";

export const Home = () => {
  return (
    <div className={styles.howto_main}>
      <h1 className={styles.howto_ttl}>ホーム</h1>
      <p className={styles.howto_desc}>
        自分やフォローしているメンバーの投稿がタイムライン上に表示されます
      </p>
      <div className={styles.howto_container}>
        <Tag tag="自分の投稿" free paid />
        <p>
          <span className={styles.howto_container_tag}>ホーム</span>
          では、<span className={styles.howto_container_tag}>案件</span>
          <span className={styles.howto_container_tag}>人材</span>
          の表示を切り替えることができ、自分の投稿が
          <span className={styles.howto_container_tag}>案件</span>
          <span className={styles.howto_container_tag}>人材</span>
          別に表示されます。
        </p>
      </div>
      <div className={styles.howto_container}>
        <Tag tag="フォローしているメンバーの投稿" paid />
        <p>
          <span className={styles.howto_container_tag}>レギュラー会員</span>
          では、
          <span className={styles.howto_container_tag}>自分の投稿</span>や
          <span className={styles.howto_container_tag}>
            フォローしているメンバーの投稿
          </span>
          もタイムライン上に表示されます。
          <br />
          <br />
          <span className={styles.howto_container_acnt}>
            ※ 最大15名まで、フォローしているメンバーの投稿が反映されます。
          </span>
          <br />
          <span className={styles.howto_container_acnt}>
            ※
            フォローを15名以上している場合、ホームの設定から表示したいメンバーをいつでも設定・変更できます。
          </span>
        </p>
      </div>
    </div>
  );
};
