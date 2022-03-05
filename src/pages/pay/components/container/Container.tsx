import React from "react";
import styles from "./Container.module.scss";

import { Header } from "../header/Header";
import { List } from "../list/List";
import { Footer } from "../footer/Footer";

import { User } from "types/user";

import { Products } from "types/pay";

import * as functions from "functions";

interface PropType {
  products: Products;
  user: User;
  tax: number;
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
  priceId: string | undefined;
  setPriceId: React.Dispatch<React.SetStateAction<string | undefined>>;
  handlePortal: ({
    setLoad,
    demo,
  }: functions.pay.HandlePortal) => Promise<void>;
  demo: boolean;
}

export const Container: React.FC<PropType> = ({
  products,
  user,
  tax,
  load,
  setLoad,
  priceId,
  setPriceId,
  handlePortal,
  demo,
}) => {
  return products ? (
    <>
      {Object.keys(products).map(
        (product) =>
          // ver 2.X.X
          // 削除予定
          product !== "option" &&
          products?.[product as keyof Products]?.prices?.length && (
            <div key={product} className={styles.container}>
              <Header products={products} product={product as keyof Products} />

              <List
                products={products}
                product={product as keyof Products}
                user={user}
                tax={tax}
                load={load}
                setLoad={setLoad}
                priceId={priceId}
                setPriceId={setPriceId}
                handlePortal={handlePortal}
                demo={demo}
              />

              <Footer
                products={products}
                product={product as keyof Products}
                user={user}
              />
            </div>
          )
      )}
    </>
  ) : (
    <></>
  );
};
