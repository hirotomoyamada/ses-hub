import React from "react";
import styles from "./Header.module.scss";

import { Products } from "types/pay";

interface PropType {
  products: Products;
  type: string;
  hidden?: boolean;
}

export const Header: React.FC<PropType> = ({ products, type, hidden }) => {
  return (
    <div className={styles.header}>
      {!hidden && <h1 className={styles.header_ttl}>{products[type].name}</h1>}

      <p>{products[type].desc}</p>
    </div>
  );
};
