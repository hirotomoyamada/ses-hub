import styles from "./Pay.module.scss";

import Loader from "react-loader-spinner";

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./actions/fetchProducts";
import * as rootSlice from "../root/rootSlice";
import * as userSlice from "../user/userSlice";
import * as paySlice from "./paySlice";

import { FreeTrial } from "./components/freetrial/FreeTrial";
import { Container } from "./components/container/Container";
import { Btn } from "./components/btn/Btn";

import { handleCheckout } from "./functions/handleCheckout";
import { handlePortal } from "./functions/handlePortal";
import { Header } from "../../components/header/Header";

export const Pay = () => {
  const dispatch = useDispatch();

  const user = useSelector(userSlice.user);
  const demo = useSelector(rootSlice.verified).demo;

  const products = useSelector(paySlice.products);
  const tax = useSelector(paySlice.tax);

  const [priceId, setPriceId] = useState("");
  const [productId, setProductId] = useState("");
  const [load, setLoad] = useState({
    checkout: false,
    portal: false,
  });

  useEffect(() => {
    dispatch(fetchProducts(""));
  }, [dispatch]);

  useEffect(() => {
    Object.keys(products)?.forEach((product) => {
      const price = products?.[product]?.prices?.find(
        (price) => price.id === priceId
      );
      if (price) {
        setProductId(products?.[product]?.id);
      }
    });
  }, [priceId, products]);

  useEffect(() => {
    setPriceId(
      user?.payment?.price
        ? ""
        : products?.plan?.type === "individual" ||
          !user?.payment?.children?.length
        ? products?.plan?.prices?.[0]?.id
        : products?.plan?.prices?.find(
            (price) => user?.payment?.children?.length < price.account
          )?.id
    );
  }, [products, user]);

  return (
    <div className={styles.pay}>
      {Object.keys(products).length ? (
        <>
          <Header back goSetting />
          <div className={styles.pay_inner}>
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
            <Btn
              user={user}
              priceId={priceId}
              productId={productId}
              load={load}
              setLoad={setLoad}
              dispatch={dispatch}
              handleCheckout={handleCheckout}
              demo={demo}
            />
          </div>
        </>
      ) : (
        <div className={`${styles.pay_inner} ${styles.pay_inner_load}`}>
          <Loader type="Oval" color="#49b757" height={56} width={56} />
        </div>
      )}
    </div>
  );
};
