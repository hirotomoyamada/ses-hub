import React from "react";
import styles from "./List.module.scss";

import { Item } from "../Item/Item";

import { User } from "types/user";
import { Products } from "types/pay";

import * as functions from "functions";

interface PropType {
  products: Products;
  type: string;
  user: User;
  priceId: string | undefined;
  setPriceId: React.Dispatch<React.SetStateAction<string | undefined>>;
  tax: number;
  handlePortal: ({
    setLoad,
    demo,
  }: functions.pay.HandlePortal) => Promise<void>;
  demo: boolean;
}

export const List: React.FC<PropType> = ({
  products,
  type,
  user,
  priceId,
  setPriceId,
  tax,
  handlePortal,
  demo,
}) => {
  return (
    <div className={styles.list}>
      {products[type].prices.map((price) => (
        <Item
          key={price.id}
          user={user}
          type={type}
          price={price}
          tax={tax}
          priceId={priceId}
          setPriceId={setPriceId}
          handlePortal={handlePortal}
          demo={demo}
        />
      ))}
    </div>
  );
};
