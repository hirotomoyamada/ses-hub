import styles from "./Item.module.scss";

import { useHistory } from "react-router";
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
  const history = useHistory();

  return (
    <button
      type="button"
      onClick={() =>
        type === "parent" &&
        user?.payment?.children?.length + 1 > price?.account
          ? history.push("/account")
          : price?.id !== user?.payment?.price
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
      ${
        type === "parent" &&
        user?.payment?.children?.length + 1 > price?.account &&
        styles.item_none
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
                (priceId === price?.id ||
                  user?.payment?.price ||
                  user?.payment?.children?.length + 1 > price?.account) &&
                styles.item_amount_tax_select
              }`}
            >
              (税込){type === "parent" && "/3ヶ月〜"}
            </span>
          </p>
        </div>

        {type !== "parent" ||
        !user?.payment?.children ||
        user?.payment?.children?.length < price?.account ? (
          priceId !== price?.id &&
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
          )
        ) : (
          <p className={styles.item_desc_error}>
            ※&nbsp;保有しているアカウントが、
            <span>プランの上限より多いため購入することができません。</span>
          </p>
        )}
        {type === "parent" &&
          (priceId === price?.id || user?.payment?.price === price?.id) && (
            <span>
              ※&nbsp;{price?.account}アカウント&nbsp;までご利用いただけます
            </span>
          )}
      </div>

      {type === "parent" &&
      user?.payment?.children?.length + 1 > price?.account ? (
        <div className={`${styles.item_btn} ${styles.item_btn_account}`}>
          管理
        </div>
      ) : price?.id === user?.payment?.price ? (
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
