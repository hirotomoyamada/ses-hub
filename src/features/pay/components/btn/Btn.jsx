import styles from "./Btn.module.scss";
import Loader from "react-loader-spinner";

export const Back = ({ history }) => {
  return (
    <button
      className={styles.back}
      type="button"
      onClick={() => history.push("/setting")}
    >
      アカウント設定 へもどる
    </button>
  );
};

export const Checkout = ({
  user,
  priceId,
  load,
  setLoad,
  dispatch,
  handleCheckout,
  demo,
}) => {
  return (
    <button
      className={`${styles.checkout} ${load.checkout && styles.checkout_load} ${
        !priceId && styles.checkout_disable
      }`}
      type="button"
      onClick={() =>
        handleCheckout({
          setLoad,
          priceId,
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
        <Loader
          type="Oval"
          color="#FFF"
          height={32}
          width={32}
          className={styles.checkout_icon}
        />
      )}
    </button>
  );
};
