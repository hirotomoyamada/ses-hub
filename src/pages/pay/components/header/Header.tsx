import React from "react";
import styles from "./Header.module.scss";

import { Products } from "types/pay";

interface PropType {
  products: Products;
  product: keyof Products;
}

export const Header: React.FC<PropType> = ({ products, product }) => {
  return (
    <div className={styles.header}>
      <h1 className={styles.header_ttl}>{products?.[product]?.name}</h1>
      <p>{products?.[product]?.desc}</p>
    </div>
  );
};
