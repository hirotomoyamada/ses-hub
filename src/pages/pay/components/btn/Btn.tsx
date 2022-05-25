import React from "react";
import styles from "./Btn.module.scss";
import { Oval } from "react-loader-spinner";

import { User } from "types/user";
import { OwnDispatch } from "@reduxjs/toolkit";

import * as functions from "functions";

interface PropType {
  user: User;
  priceId: string | undefined;
  productId: string | undefined;
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
  dispatch: OwnDispatch;
  handleCheckout: ({
    setLoad,
    productId,
    priceId,
    user,
    dispatch,
    demo,
  }: functions.pay.HandleCheckout) => Promise<void>;
  demo: boolean;
}

export const Btn: React.FC<PropType> = ({
  user,
  priceId,
  productId,
  load,
  setLoad,
  dispatch,
  handleCheckout,
  demo,
}) => {
  return (
    <button
      className={`${styles.btn} ${load.checkout && styles.btn_load} ${
        !priceId && styles.btn_disable
      }`}
      type="button"
      onClick={() =>
        handleCheckout({
          setLoad,
          priceId,
          productId,
          user,
          dispatch,
          demo,
        })
      }
    >
      {!priceId
        ? "購入するものがありません"
        : !load.checkout
        ? "購入"
        : "処理中..."}

      {load.checkout && (
        <div className={styles.btn_icon}>
          <Oval color="#FFF" secondaryColor="#FFF" height={32} width={32} />
        </div>
      )}
    </button>
  );
};
