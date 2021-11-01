import { useHistory } from "react-router";
import root from "../Section.module.scss";
import styles from "./Option.module.scss";

export const Option = () => {
  const history = useHistory();
  const tax = 1.1;

  return (
    <article className={`${styles.option} ${root.article}`}>
      <div
        className={`${styles.option_inner} ${root.article_inner}`}
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/img/promotion/freelanceDirect.png)`,
        }}
      >
        <div className={styles.option_container}>
          <div className={styles.option_ttl}>
            <span className={styles.option_ttl_pop}>オプション</span>
            <h1 className={`${styles.option_ttl_visual} ${root.article_ttl}`}>
              フリーランスダイレクトと連携！
            </h1>
          </div>

          <p className={styles.option_desc}>
            フリーランスエンジニアを検索やアプローチ、
            <span>プロフィールやスキルシートの閲覧</span>
            <span>などの機能がご利用いただけます。</span>
          </p>
        </div>

        <div className={styles.option_container}>
          <div className={styles.option_wrap}>
            <span className={styles.option_type}>個人</span>

            <span className={styles.option_price}>
              {Math.round(15000 * tax).toLocaleString()}円
            </span>
          </div>

          <div className={styles.option_wrap}>
            <span className={styles.option_type}>法人</span>

            <span className={styles.option_price}>
              {Math.round(75000 * tax).toLocaleString()}円
            </span>
          </div>

          <button
            type="button"
            onClick={() => history.push("/option/freelance-direct")}
            className={styles.option_btn}
          >
            詳しく見る
          </button>
        </div>
      </div>

      <span className={styles.option_announce}>
        ※ オプションのみではSES_HUBをご利用いただけません。
      </span>
      <br />
      <span className={styles.option_announce}>
        ※ 有料プランと合わせてご利用ください。
      </span>
    </article>
  );
};
