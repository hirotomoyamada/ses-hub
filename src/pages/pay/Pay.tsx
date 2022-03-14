import styles from "./Pay.module.scss";

import Loader from "react-loader-spinner";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useResize } from "hooks/useResize";

import { fetchProducts } from "features/pay/actions";
import * as rootSlice from "features/root/rootSlice";
import * as userSlice from "features/user/userSlice";
import * as paySlice from "features/pay/paySlice";

import { Header } from "components/header/Header";

import { FreeTrial } from "./components/freetrial/FreeTrial";
import { Container } from "./components/container/Container";
import { Btn } from "./components/btn/Btn";

import * as functions from "functions";

import { Products } from "types/pay";

export const Pay: React.FC = () => {
  const dispatch = useDispatch();

  const user = useSelector(userSlice.user);
  const demo = useSelector(rootSlice.verified).demo;

  const products = useSelector(paySlice.products);
  const tax = useSelector(paySlice.tax);

  const [priceId, setPriceId] = useState<string | undefined>();
  const [productId, setProductId] = useState<string | undefined>();
  const [load, setLoad] = useState<{ checkout?: boolean; portal?: boolean }>({
    checkout: false,
    portal: false,
  });
  const [resize, inner] = useResize(products);

  useEffect(() => {
    user?.type !== "child" && dispatch(fetchProducts(user));
  }, [dispatch, user]);

  useEffect(() => {
    Object.keys(products)?.forEach((product) => {
      const price = products?.[product as keyof Products]?.prices?.find(
        (price) => price.id === priceId
      );

      if (price) {
        setProductId(products?.[product as keyof Products]?.id);
      }
    });
  }, [priceId, products]);

  useEffect(() => {
    setPriceId(
      user?.payment?.price
        ? undefined
        : products?.plan?.type === "individual" ||
          !user?.payment?.children?.length
        ? products?.plan?.prices?.[0]?.id
        : products?.plan?.prices?.find(
            (price) =>
              user?.payment?.children?.length &&
              price?.account &&
              user?.payment?.children?.length < price.account
          )?.id
    );
  }, [products, user]);

  return (
    <div className={`${styles.pay} ${resize && styles.pay_resize}`}>
      {Object.keys(products).length ? (
        <>
          <Header back goSetting />

          <div className={styles.pay_inner} ref={inner}>
            <FreeTrial user={user} />

            <Container
              products={products}
              user={user}
              tax={tax}
              load={load}
              setLoad={setLoad}
              priceId={priceId}
              setPriceId={setPriceId}
              handlePortal={functions.pay.handlePortal}
              demo={demo}
            />

            <Btn
              user={user}
              priceId={priceId}
              productId={productId}
              load={load}
              setLoad={setLoad}
              dispatch={dispatch}
              handleCheckout={functions.pay.handleCheckout}
              demo={demo}
            />
          </div>
        </>
      ) : user?.type === "child" ? (
        <>
          <Header back goSetting />

          <div className={`${styles.pay_inner} ${styles.pay_inner_disable}`}>
            <span>プラン未加入のため、アプリをご利用いただけません</span>
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