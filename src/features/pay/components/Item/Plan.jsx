import styles from "./Item.module.scss";

import Loader from "react-loader-spinner";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

export const Plan = ({
  user,
  price,
  type,
  tax,
  load,
  setLoad,
  priceId,
  setPriceId,
  handlePortal,
  demo,
}) => {
  return (
    <button
      type="button"
      onClick={() =>
        price?.id !== user?.payment?.price
          ? setPriceId(price?.id)
          : handlePortal({ setLoad, demo })
      }
      key={price?.id}
      className={`${styles.item} ${
        (priceId === price?.id || price?.id === user?.payment?.price) &&
        styles.item_select
      } ${
        user?.payment?.price &&
        price?.id !== user?.payment?.price &&
        styles.item_other
      }
      }`}
    >
      <div className={styles.item_container}>
        <div className={styles.item_wrap}>
          <h2 className={styles.item_ttl}>{price?.name}</h2>
          <p className={styles.item_amount}>
            {(price?.unit_amount * tax).toLocaleString()}円
            <span
              className={`${styles.item_amount_tax} ${
                (priceId === price?.id || user?.payment?.price) &&
                styles.item_amount_tax_select
              }`}
            >
              (税込){type === "parent" && "/3ヶ月〜"}
            </span>
          </p>
        </div>
        {priceId !== price?.id &&
          !user?.payment?.price &&
          (price?.interval_count !== 1 || price?.interval !== "month") && (
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
      {price?.id === user?.payment?.price ? (
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
