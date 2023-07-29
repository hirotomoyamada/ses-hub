import React, { createRef } from 'react';
import styles from './Container.module.scss';

import { Header } from '../header/Header';
import { List } from '../list/List';
import { Footer } from '../footer/Footer';

import { User } from 'types/user';

import { Products } from 'types/pay';

import * as functions from 'functions';

interface PropType {
  products: Products;
  user: User;
  tax: number;
  priceId: string | undefined;
  setPriceId: React.Dispatch<React.SetStateAction<string | undefined>>;
  handlePortal: ({
    setLoad,
    demo,
  }: functions.pay.HandlePortal) => Promise<void>;
  demo: boolean;
}

export const Container = React.forwardRef<
  React.RefObject<HTMLDivElement>[],
  PropType
>(({ products, user, tax, priceId, setPriceId, handlePortal, demo }, ref) => {
  return products ? (
    <>
      {Object.keys(products).map((type, i) => {
        if (!products[type].prices.length)
          return <React.Fragment key={i}></React.Fragment>;

        const option = Object.keys(products).filter(
          (type) => type !== 'individual' && type !== 'parent',
        );

        if (ref && 'current' in ref && ref.current)
          ref.current[i] = createRef<HTMLDivElement>();

        return (
          <div
            key={i}
            id={type}
            className={styles.container}
            ref={
              ref && 'current' in ref && ref.current
                ? ref.current[i]
                : undefined
            }>
            <Header
              products={products}
              type={type}
              hidden={
                type !== 'individual' &&
                type !== 'parent' &&
                option.findIndex((optionType) => type === optionType) !== 0
              }
            />

            <List
              products={products}
              type={type}
              user={user}
              tax={tax}
              priceId={priceId}
              setPriceId={setPriceId}
              handlePortal={handlePortal}
              demo={demo}
            />

            {(type === 'individual' ||
              type === 'parent' ||
              option.findIndex((optionType) => type === optionType) ===
                option.length - 1) && <Footer type={type} user={user} />}
          </div>
        );
      })}
    </>
  ) : (
    <></>
  );
});
