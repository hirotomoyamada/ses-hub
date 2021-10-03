import styles from "../../HowTo.module.scss";
import { Tag } from "../tag/Tag";

export const Posts = () => {
  return (
    <div className={styles.howto_main}>
      <h1 className={styles.howto_ttl}>投稿</h1>
      <p className={styles.howto_desc}>案件・人材別に投稿することが可能です</p>
      <div className={styles.howto_container}>
        <Tag tag="投稿する" free paid />
        <p>
          SES_HUB独自のフォーマットですべてのメンバーが統一された情報を入力、管理することが可能です。人による記入の違いがなくなり、見やすい投稿ができます。
        </p>
      </div>
      <div className={styles.howto_container}>
        <Tag tag="公開する(デフォルト)" free paid />
        <p>
          デフォルトで投稿作成時に「公開」が選択されています。公開された投稿は、リミテッド会員・レギュラー会員ともにすべてのメンバーに公開されます。
          <span className={styles.howto_container_acnt}>
            また、レギュラー会員はリミテッド会員の公開された投稿を見ることができますので、リミテッド会員にたいして問い合わせることが可能です。
          </span>
        </p>
      </div>
      <div className={styles.howto_container}>
        <Tag tag="非公開する" free paid />
        <p>
          非公開にした投稿は、ホームや検索に表示されず、自分のメンバーページやいいね・出力リストだけ確認することが可能です。投稿後も、いつでも公開・非公開の設定が可能です。
          ※検索やホームには反映されません。また、全体に反映されるまで5分ほど処理がかかる場合があります。
        </p>
      </div>
      <div className={styles.howto_container}>
        <Tag tag="ステータスで管理する" free paid />
        <p>
          一つ一つの投稿へステータスを付与できます。ステータスには、「新規」「提案」「面談」「保留」「フォロー」「成約」などを設定できます。設定したステータスは自分のメンバーページで確認できます。
          <span className={styles.howto_container_acnt}>
            また、他のメンバーにステータスは表示されません。
          </span>
        </p>
      </div>
    </div>
  );
};
