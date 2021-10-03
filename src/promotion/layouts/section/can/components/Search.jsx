import styles from "../Can.module.scss";

export const Search = () => {
  return (
    <div className={styles.can_container}>
      <div className={styles.can_cnt}>
        <h2 className={styles.can_cnt_ttl}>
          SES営業から「探す」「待つ」を
          <br />
          とにかく減らす
        </h2>

        <p className={styles.can_cnt_desc}>
          CRMとしての機能は直感的なシンプルUIで
          <span>使いやすさを大切にしています。</span>
          <br />
          <br />
          よくあるカテゴリーで選択して検索なんて、時代遅れです。
          <br />
          全文検索のたった「一つ」の検索バーだけで<span>「すべて」取得できます。</span>
          <br />
          <br />
          適切な情報管理で<span>大幅な営業リソースの削減を実現していけます。</span>
          <br />
        </p>
      </div>

      <figure className={`${styles.can_visual} ${styles.can_search}`}>
        <img
          src={`${process.env.PUBLIC_URL}/img/promotion/can_search.svg`}
          alt=""
          className={styles.can_visual_img}
        />
      </figure>
    </div>
  );
};
