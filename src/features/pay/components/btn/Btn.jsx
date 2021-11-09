import styles from "./Btn.module.scss";
import Loader from "react-loader-spinner";

export const Btn = ({
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
      className={`${styles.btn} ${load.checkout && styles.btn_load} ${
        !priceId && styles.btn_disable
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
          className={styles.btn_icon}
        />
      )}
    </button>
  );
};
