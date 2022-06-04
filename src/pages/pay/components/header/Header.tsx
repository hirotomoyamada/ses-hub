import React from "react";
import styles from "./Header.module.scss";

import { Products } from "types/pay";

interface PropType {
  products: Products;
  type: string;
  i: number;
}

export const Header: React.FC<PropType> = ({ products, type, i }) => {
  return (
    <div className={styles.header}>
      {i + 1 < Object.keys(products).length && (
        <h1 className={styles.header_ttl}>{products[type].name}</h1>
      )}

      <p>{products[type].desc}</p>
    </div>
  );
};
