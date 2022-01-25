import styles from "../../HowTo.module.scss";
import { Tag } from "../tag/Tag";

export const Posts = () => {
  return (
    <div className={styles.howto_main}>
      <h1 className={styles.howto_ttl}>投稿</h1>
      <p className={styles.howto_desc}>案件・人材別に投稿する</p>
      <div className={styles.howto_container}>
        <Tag tag="投稿する" free paid />
        <p>
          SES_HUB独自のフォーマットですべてのメンバーが統一された情報を入力、管理することが可能です。
          <br />
          <br />
          人による記入の違いがなくなり、見やすい投稿ができます。
        </p>
      </div>
      <div className={styles.howto_container}>
        <Tag tag="公開する(デフォルト)" free paid />
        <p>
          デフォルトで投稿作成時に
          <span className={styles.howto_container_tag}>公開</span>
          が選択されています。公開された投稿は、
          <span className={styles.howto_container_tag}>リミテッド会員</span>
          <span className={styles.howto_container_tag}>レギュラー会員</span>
          ともにすべてのメンバーに公開されます。
          <br />
          <br />
          <span className={styles.howto_container_acnt}>
            ※&nbsp;レギュラー会員はリミテッド会員の公開された投稿を見ることができますので、リミテッド会員にたいして問い合わせることが可能です。
          </span>
        </p>
      </div>
      <div className={styles.howto_container}>
        <Tag tag="非公開する" free paid />
        <p>
          非公開にした投稿は、ホームや検索
          <span className={styles.howto_container_tag}>ホーム</span>
          <span className={styles.howto_container_tag}>検索</span>
          に表示されず、自分の
          <span className={styles.howto_container_tag}>メンバーページ</span>
          <span className={styles.howto_container_tag}>いいね</span>
          <span className={styles.howto_container_tag}>出力</span>
          リストだけ確認することが可能です。
          <br />
          <br />
          投稿後も、いつでも
          <span className={styles.howto_container_tag}>公開</span>
          <span className={styles.howto_container_tag}>非公開</span>
          の設定が可能です。
          <br />
          <br />
          ※&nbsp;全体に反映されるまで5分ほど処理がかかる場合があります。
        </p>
      </div>
      <div className={styles.howto_container}>
        <Tag tag="ステータスで管理する" free paid />
        <p>
          一つ一つの投稿へステータスを付与できます。ステータスには、
          <span className={styles.howto_container_tag}>新規</span>
          <span className={styles.howto_container_tag}>提案</span>
          <span className={styles.howto_container_tag}>面談</span>
          <span className={styles.howto_container_tag}>保留</span>
          <span className={styles.howto_container_tag}>フォロー</span>
          <span className={styles.howto_container_tag}>成約</span>
          などを設定できます。設定したステータスは自分のメンバーページで確認できます。
          <br />
          <br />
          <span className={styles.howto_container_acnt}>
            ※&nbsp;他のメンバーにステータスは表示されません。
          </span>
        </p>
      </div>
    </div>
  );
};
