import React from "react";
import { useDispatch } from "react-redux";
import root from "../Section.module.scss";
import styles from "./Option.module.scss";
import * as rootSlice from "features/root/rootSlice";

export const Analytics: React.FC = () => {
  // ver 2.2.X
  // const tax = 1.1;
  const dispatch = useDispatch();

  return (
    <div>
      <div
        className={`${styles.option_inner} ${styles.option_analytics} ${root.article_inner}`}
      >
        <div className={styles.option_container}>
          <div className={styles.option_ttl}>
            <span className={styles.option_ttl_pop}>オプション</span>
            <h1 className={`${styles.option_ttl_visual} ${root.article_ttl}`}>
              アナリティクス <span>データ解析で差をつける！</span>
            </h1>
          </div>

          <p className={styles.option_desc}>
            あらゆる数値を可視化し、
            <span>外部へデータを持ち出すことができる。</span>
            <span>パワフルな機能がご利用いただけます。</span>
          </p>
        </div>

        <div className={styles.option_container}>
          <div className={styles.option_wrap}>
            {/* ver 2.2.X */}
            {/* <span className={styles.option_type}>3ヶ月</span>

            <span className={styles.option_price}>
              {Math.round(45000 * tax).toLocaleString()}円
            </span> */}

            {/* 削除予定 */}
            <span className={styles.option_type}>近日公開</span>
          </div>

          <button
            type="button"
            className={`${styles.option_btn} ${styles.option_btn_analytics}`}
            onClick={() =>
              dispatch(
                rootSlice.handleModal({
                  type: "analytics",
                  meta: { type: "demo" },
                })
              )
            }
          >
            デモを見る
          </button>
        </div>

        <img
          src={`${process.env.PUBLIC_URL}/img/app/analytics.svg`}
          alt=""
          className={styles.option_analytics_bg}
        />

        <img
          src={`${process.env.PUBLIC_URL}/img/app/barchart.svg`}
          alt=""
          className={styles.option_analytics_bar}
        />
      </div>

      <span className={styles.option_announce}>
        ※ オプションのみではSES_HUBをご利用いただけません。
      </span>
      <br />
      <span className={styles.option_announce}>
        ※ 有料プランと合わせてご利用ください。
      </span>
    </div>
  );
};
