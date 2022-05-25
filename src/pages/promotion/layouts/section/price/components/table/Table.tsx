import React from "react";
import { PriceType } from "../../Price";
import styles from "./Table.module.scss";

interface PropType {
  index: "individual" | "corporate";
  price: PriceType;
  tax: number;
  totalPrice: (n: number, p: number) => string;
}

export const Table: React.FC<PropType> = ({
  index,
  price,
  tax,
  totalPrice,
}) => {
  const tr = [];

  for (const i of Object.keys(price)) {
    tr.push(
      <tr key={i}>
        <td>
          {index !== "individual" && "〜"}
          {price[i].n}
          {index === "individual" ? "ヶ月" : "人"}プラン
        </td>

        <td>
          <span
            className={`${styles.table_price} ${
              index !== "individual" && styles.table_price_corporate
            }`}
          >
            {Math.round(price[i].p * tax).toLocaleString()}円
          </span>

          {index === "individual" && price[i].n > 1 && (
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
          <th>{index === "individual" ? "期間" : "人数"}</th>

          <th>料金</th>
        </tr>
      </thead>

      <tbody>{tr}</tbody>
    </table>
  );
};
