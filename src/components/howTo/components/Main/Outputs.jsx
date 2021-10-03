import styles from "../../HowTo.module.scss";
import { Tag } from "../tag/Tag";

export const Outputs = () => {
  return (
    <div className={styles.howto_main}>
      <h1 className={styles.howto_ttl}>出力</h1>
      <p className={styles.howto_desc}>
        自分が外部に持ち出したい投稿をまとめて出力することができます
      </p>
      <div className={styles.howto_container}>
        <Tag tag="出力する" free paid />
        <p>
          外部へ持ち出したい投稿を「出力」リストに格納します。リストから出力したい投稿を選択すると、テキスト上に一覧が表示されます。「クリップボードにコピー」「印刷」など、自分が出力したい形式で外部へ持ち出せます。
        </p>
      </div>
      <div className={styles.howto_container}>
        <Tag tag="まとめて出力する" free paid />
        <p>
          外部へ出力したい投稿をまとめて出力することができます。リストから「すべて選択」をおこなうと、表示されているすべての投稿を選択できます。
        </p>
      </div>
      <div className={styles.howto_container}>
        <Tag tag="他のメンバーの投稿を出力する" paid />
        <p>
          レギュラー会員では、他のメンバーの投稿も「出力」リストに格納することが可能です。上記のやり方で、どんな投稿も出力できます。
        </p>
      </div>
    </div>
  );
};
