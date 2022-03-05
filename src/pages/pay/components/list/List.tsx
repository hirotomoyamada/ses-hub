import React from "react";
import styles from "./List.module.scss";

import { Item } from "../Item/Item";

import { User } from "types/user";
import { Products } from "types/pay";

import * as functions from "functions";

interface PropType {
  products: Products;
  product: keyof Products;
  user: User;
  priceId: string | undefined;
  setPriceId: React.Dispatch<React.SetStateAction<string | undefined>>;
  load: {
    checkout?: boolean;
    portal?: boolean;
  };
  setLoad: React.Dispatch<
    React.SetStateAction<{
      checkout?: boolean;
      portal?: boolean;
    }>
  >;
  tax: number;
  handlePortal: ({
    setLoad,
    demo,
  }: functions.pay.HandlePortal) => Promise<void>;
  demo: boolean;
}

export const List: React.FC<PropType> = ({
  products,
  product,
  user,
  priceId,
  setPriceId,
  load,
  setLoad,
  tax,
  handlePortal,
  demo,
}) => {
  return (
    <div className={styles.list}>
      {products?.[product]?.prices.map(
        (price) =>
          price && (
            <Item
              key={price.id}
              user={user}
              product={product}
              price={price}
              type={
                products?.[product]?.type as keyof User["payment"]["option"]
              }
              tax={tax}
              load={load.portal}
              setLoad={setLoad}
              priceId={priceId}
              setPriceId={setPriceId}
              handlePortal={handlePortal}
              demo={demo}
            />
          )
      )}
    </div>
  );
};
