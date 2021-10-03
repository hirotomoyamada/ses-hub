import styles from "./../Plan.module.scss";
import root from "../../Section.module.scss";

export const Price = ({ price, totalPrice }) => {
  return (
    <div className={styles.plan_price}>
      <h1 className={`${styles.plan_ttl_sub} ${root.section_ttl_sub}`}>料金</h1>
      <h1 className={`${styles.plan_desc} ${root.section_desc}`}>
        期間に応じて、お得な料金システム
      </h1>
      <table className={styles.plan_table}>
        <thead>
          <tr>
            <th>期間</th>

            <th>料金</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1ヶ月プラン</td>

            <td>
              <span className={styles.plan_table_price}>
                {price.month.toLocaleString()}円
              </span>
            </td>
          </tr>

          <tr>
            <td>3ヶ月プラン</td>

            <td>
              <span className={styles.plan_table_price}>
                {price.monthsThree.toLocaleString()}円
              </span>

              <span className={styles.plan_table_price_total}>
                (一括&nbsp;{totalPrice(price.monthsThree, 3)}円〜)
              </span>
            </td>
          </tr>

          <tr>
            <td>6ヶ月プラン</td>

            <td>
              <span className={styles.plan_table_price}>
                {price.monthsSix.toLocaleString()}円
              </span>

              <span className={styles.plan_table_price_total}>
                (一括&nbsp;{totalPrice(price.monthsSix, 6)}円〜)
              </span>
            </td>
          </tr>

          <tr>
            <td>12ヶ月プラン</td>

            <td>
              <span className={styles.plan_table_price}>
                {price.year.toLocaleString()}円
              </span>

              <span className={styles.plan_table_price_total}>
                (一括&nbsp;{totalPrice(price.year, 12)}円〜)
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      <span className={styles.plan_announce}>
        ※ 決済方法やプランは変更になる場合がございます。
      </span>
    </div>
  );
};
