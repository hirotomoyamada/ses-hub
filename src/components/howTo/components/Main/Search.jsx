import styles from "../../HowTo.module.scss";
import { Tag } from "../tag/Tag";

export const Search = () => {
  return (
    <div className={styles.howto_main}>
      <h1 className={styles.howto_ttl}>検索</h1>
      <p className={styles.howto_desc}>
        レギュラー会員であれば、他のメンバーの投稿を検索することができます
      </p>
      <div className={styles.howto_container}>
        <Tag tag="検索する" paid />
        <p>
          強力な検索エンジンで、投稿のすべてを全文検索かけることができます。案件名や言語・ツールなど、あなたが検索したい投稿を探します。
        </p>
      </div>
      <div className={styles.howto_container}>
        <Tag tag="タブを切り替える" paid />
        <p>検索では、案件・人材・メンバーにタブを切り替えることができます。</p>
      </div>
      <div className={styles.howto_container}>
        <Tag tag="フィルターをかける" paid />
        <p>
          検索には必須のフィルター機能。新着順から更新順まで幅広いフィルターで検索をサポートします。
        </p>
      </div>
    </div>
  );
};
