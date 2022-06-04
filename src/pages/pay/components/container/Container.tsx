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
  priceId,
  setPriceId,
  handlePortal,
  demo,
}) => {
  return products ? (
    <>
      {Object.keys(products).map(
        (type, i) =>
          products[type].prices.length && (
            <div key={i} className={styles.container}>
              <Header products={products} type={type} i={i} />

              <List
                products={products}
                type={type}
                user={user}
                tax={tax}
                priceId={priceId}
                setPriceId={setPriceId}
                handlePortal={handlePortal}
                demo={demo}
              />

              {(products[type].type === "individual" ||
                products[type].type === "parent" ||
                i + 1 === Object.keys(products).length) && (
                <Footer type={type} user={user} />
              )}
            </div>
          )
      )}
    </>
  ) : (
    <></>
  );
};
