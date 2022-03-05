import React from "react";
import styles from "./Item.module.scss";

import Loader from "react-loader-spinner";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import { User } from "types/user";
import { Price } from "types/pay";

import * as functions from "functions";

interface PropType {
  user: User;
  price: Price;
  priceId: string | undefined;
  setPriceId: React.Dispatch<React.SetStateAction<string | undefined>>;
  setLoad: React.Dispatch<
    React.SetStateAction<{
      checkout?: boolean;
      portal?: boolean;
    }>
  >;
  tax: number;
  type: keyof User["payment"]["option"];
  handlePortal: ({
    setLoad,
    demo,
  }: functions.pay.HandlePortal) => Promise<void>;
  demo: boolean;
  load?: boolean;
}

export const Option: React.FC<PropType> = ({
  user,
  price,
  priceId,
  setPriceId,
  load,
  setLoad,
  tax,
  type,
  handlePortal,
  demo,
}) => {
  return (
    <button
      type="button"
      onClick={() =>
        !user?.payment?.option?.[type]
          ? setPriceId(priceId === price?.id ? "" : price?.id)
          : handlePortal({ setLoad, demo })
      }
      key={price?.id}
      className={`${styles.item}
      ${!user?.payment?.price && styles.item_disable} ${
        (user?.payment?.option?.[type] || priceId === price?.id) &&
        styles.item_select
      } 
      }`}
    >
      <div className={styles.item_container}>
        <div className={styles.item_wrap}>
          {price?.name && <h2 className={styles.item_ttl}>{price?.name}</h2>}
          <p className={styles.item_amount}>
            {(price?.unit_amount * tax).toLocaleString()}円
            <span
              className={`${styles.item_amount_tax} ${
                (priceId === price?.id || user?.payment?.option?.[type]) &&
                styles.item_amount_tax_select
              } ${!user?.payment?.price && styles.item_amount_tax_disable}`}
            >
              (税込)/3ヶ月〜
            </span>
          </p>
        </div>

        {priceId !== price?.id &&
          user?.payment?.price &&
          !user?.payment?.option?.freelanceDirect && (
            <p className={styles.item_desc}>
              1ヶ月あたり
              <span className={styles.item_desc_acnt}>
                {(
                  (price?.unit_amount * tax) /
                  (price?.interval === "month" ? price?.interval_count : 12)
                ).toLocaleString()}
                円&nbsp;
                <span className={styles.item_desc_acnt_tax}>(税込)</span>
              </span>
            </p>
          )}
      </div>

      {!user?.payment?.price ? (
        <span className={styles.item_disable_desc}>
          選択することができません
        </span>
      ) : user?.payment?.option?.[type] ? (
        !load ? (
          <div className={styles.item_btn}>更新する</div>
        ) : (
          <Loader type="Oval" color="#FFF" height={32} width={32} />
        )
      ) : (
        priceId === price?.id && (
          <CheckCircleIcon className={styles.item_icon} />
        )
      )}
    </button>
  );
};
