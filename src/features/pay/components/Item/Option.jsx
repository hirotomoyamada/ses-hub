import styles from "./Item.module.scss";

import Loader from "react-loader-spinner";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

export const Option = ({
  user,
  price,
  tax,
  load,
  setLoad,
  type,
  priceId,
  setPriceId,
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

        {priceId !== price?.id && !user?.payment?.option?.freelanceDirect && (
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
