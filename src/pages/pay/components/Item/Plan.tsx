import React, { useState } from "react";
import styles from "./Item.module.scss";

import { useNavigate } from "react-router";
import { Oval } from "react-loader-spinner";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import { User } from "types/user";
import { Price } from "types/pay";

import * as functions from "functions";

interface PropType {
  user: User;
  type: string;
  price: Price;
  priceId: string | undefined;
  setPriceId: React.Dispatch<React.SetStateAction<string | undefined>>;
  tax: number;
  handlePortal: ({
    setLoad,
    demo,
  }: functions.pay.HandlePortal) => Promise<void>;
  demo: boolean;
}

export const Plan: React.FC<PropType> = ({
  user,
  type,
  price,
  tax,
  priceId,
  setPriceId,
  handlePortal,
  demo,
}) => {
  const [load, setLoad] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <button
      key={price.id}
      type="button"
      onClick={() => {
        if (type === "parent" && user.payment.children && price?.account)
          if (user.payment.children.length + 1 > price.account) {
            navigate("/account");

            return;
          }

        if (price.id !== user.payment.price) {
          setPriceId(price?.id);
        } else {
          void handlePortal({ setLoad, demo });
        }
      }}
      className={`
        ${styles.item} 
        ${
          (priceId === price?.id || price?.id === user?.payment?.price) &&
          styles.item_select
        } 
        ${
          user?.payment?.price &&
          price?.id !== user?.payment?.price &&
          styles.item_other
        }
        ${
          type === "parent" &&
          user?.payment?.children?.length &&
          price?.account &&
          user.payment.children.length + 1 > price.account &&
          styles.item_none
        }
      `}
    >
      <div className={styles.item_container}>
        <div className={styles.item_wrap}>
          <h2 className={styles.item_ttl}>{price.name}</h2>

          <p className={styles.item_amount}>
            {(price?.unit_amount * tax).toLocaleString()}円
            <span
              className={`
                ${styles.item_amount_tax} 
                ${
                  (priceId === price.id ||
                    user.payment.price ||
                    (user.payment.children?.length &&
                      price.account &&
                      user.payment.children.length + 1 > price.account)) &&
                  styles.item_amount_tax_select
                }
              `}
            >
              (税込){type === "parent" && "/3ヶ月〜"}
            </span>
          </p>
        </div>

        {type !== "parent" ||
        !user.payment.children?.length ||
        (user.payment.children?.length &&
          price.account &&
          user.payment.children.length + 1 <= price.account) ? (
          priceId !== price.id &&
          !user.payment.price &&
          (price.interval_count !== 1 || price.interval !== "month") && (
            <p className={styles.item_desc}>
              1ヶ月あたり
              <span className={styles.item_desc_acnt}>
                {(
                  (price.unit_amount * tax) /
                  (price.interval === "month" ? price.interval_count : 12)
                ).toLocaleString()}
                円&nbsp;
                <span className={styles.item_desc_acnt_tax}>(税込)</span>
              </span>
            </p>
          )
        ) : (
          <p className={styles.item_desc_error}>
            ※&nbsp;保有しているアカウントが、
            <span>プランの上限より多いため購入することができません。</span>
          </p>
        )}

        {user.payment.children?.length &&
        price.account &&
        user.payment.children?.length + 1 < price.account &&
        type === "parent" &&
        (priceId === price.id || user.payment.price === price.id) ? (
          <span>
            ※&nbsp;{price?.account}アカウント&nbsp;までご利用いただけます
          </span>
        ) : (
          <></>
        )}
      </div>

      {(() => {
        switch (true) {
          case type === "parent" &&
            user?.payment?.children?.length &&
            price?.account &&
            user.payment.children.length + 1 > price.account:
            return (
              <div className={`${styles.item_btn} ${styles.item_btn_account}`}>
                管理
              </div>
            );

          case price.id === user.payment.price:
            if (!load) {
              return <div className={styles.item_btn}>更新する</div>;
            } else {
              return <Oval color="#FFF" height={32} width={32} />;
            }

          case priceId === price.id:
            return <CheckCircleIcon className={styles.item_icon} />;

          default:
            return <></>;
        }
      })()}
    </button>
  );
};
