import React from "react";
import { Option } from "./Option";
import { Plan } from "./Plan";

import { User } from "types/user";

import { Products, Price } from "types/pay";

import * as functions from "functions";

interface PropType {
  user: User;
  product: keyof Products;
  price: Price;
  priceId: string | undefined;
  setPriceId: React.Dispatch<React.SetStateAction<string | undefined>>;
  tax: number;
  setLoad: React.Dispatch<
    React.SetStateAction<{
      checkout?: boolean;
      portal?: boolean;
    }>
  >;
  type: keyof User["payment"]["option"];
  handlePortal: ({
    setLoad,
    demo,
  }: functions.pay.HandlePortal) => Promise<void>;
  demo: boolean;
  load?: boolean;
}

export const Item: React.FC<PropType> = ({
  user,
  product,
  price,
  priceId,
  setPriceId,
  tax,
  load,
  setLoad,
  type,
  handlePortal,
  demo,
}) => {
  return product === "plan" ? (
    <Plan
      user={user}
      price={price}
      type={type}
      tax={tax}
      load={load}
      setLoad={setLoad}
      priceId={priceId}
      setPriceId={setPriceId}
      handlePortal={handlePortal}
      demo={demo}
    />
  ) : product === "option" ? (
    <Option
      user={user}
      price={price}
      tax={tax}
      load={load}
      setLoad={setLoad}
      type={type}
      priceId={priceId}
      setPriceId={setPriceId}
      handlePortal={handlePortal}
      demo={demo}
    />
  ) : (
    <></>
  );
};
