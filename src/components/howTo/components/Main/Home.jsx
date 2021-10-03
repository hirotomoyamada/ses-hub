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
          ホームでは、案件や人材の表示を切り替えることができ、自分の投稿が案件・人材別に表示されます。
        </p>
      </div>
      <div className={styles.howto_container}>
        <Tag tag="フォローしているメンバーの投稿" paid />
        <p>
          レギュラー会員では、自分の投稿とフォローしているメンバーの投稿もタイムライン上に表示されます。
        </p>
      </div>
    </div>
  );
};
