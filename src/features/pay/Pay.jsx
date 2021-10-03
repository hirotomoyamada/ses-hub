import styles from "./Pay.module.scss";

import Loader from "react-loader-spinner";

import { useEffect, useState } from "react";
import { useHistory } from "react-router";

import { useDispatch, useSelector } from "react-redux";
import * as userSlice from "../user/userSlice";
import * as paySlice from "./paySlice";

import { Back, Checkout } from "./components/btn/Btn";
import { FreeTrial } from "./components/freetrial/FreeTrial";
import { Container } from "./components/container/Container";

import { handleCheckout } from "./functions/handleCheckout";
import { handlePortal } from "./functions/handlePortal";

export const Pay = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector(userSlice.user);
  const demo = useSelector(userSlice.verified).demo;

  const products = useSelector(paySlice.products);
  const tax = useSelector(paySlice.tax);

  const [priceId, setPriceId] = useState("");
  const [load, setLoad] = useState({
    checkout: false,
    portal: false,
  });

  useEffect(() => {
    dispatch(paySlice.fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    setPriceId(user?.payment?.price ? "" : products?.plan?.prices?.[0]?.id);
  }, [products?.plan?.prices, user?.payment?.price]);

  return (
    <div className={styles.pay}>
      {Object.keys(products).length ? (
        <div className={styles.pay_inner}>
          <Back history={history} />
          <FreeTrial user={user} />
          <Container
            products={products}
            user={user}
            tax={tax}
            load={load}
            setLoad={setLoad}
            priceId={priceId}
            setPriceId={setPriceId}
            handlePortal={handlePortal}
            demo={demo}
          />
          <Checkout
            user={user}
            priceId={priceId}
            load={load}
            setLoad={setLoad}
            dispatch={dispatch}
            handleCheckout={handleCheckout}
            demo={demo}
          />
        </div>
      ) : (
        <div className={`${styles.pay_inner} ${styles.pay_inner_load}`}>
          <Loader type="Oval" color="#49b757" height={56} width={56} />
        </div>
      )}
    </div>
  );
};
