import styles from "./Table.module.scss";

export const Table = ({ index, price, totalPrice }) => {
  const individual = index === "individual" ? true : false;

  const tr = [];

  for (const i of Object.keys(price)) {
    tr.push(
      <tr key={i}>
        <td>
          {price[i].n}
          {individual ? "ヶ月" : "人"}プラン
        </td>

        <td>
          <span
            className={`${styles.table_price} ${
              !individual && styles.table_price_corporate
            }`}
          >
            {price[i].p.toLocaleString()}円
          </span>

          {individual && price[i].n > 1 && (
            <span className={styles.table_total}>
              (一括&nbsp;{totalPrice(price[i].p, price[i].n)}円〜)
            </span>
          )}
        </td>
      </tr>
    );
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>{individual ? "期間" : "人数"}</th>

          <th>料金</th>
        </tr>
      </thead>

      <tbody>{tr}</tbody>
    </table>
  );
};
