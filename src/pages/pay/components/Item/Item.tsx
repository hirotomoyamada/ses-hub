import React from "react";
import { Option } from "./Option";
import { Plan } from "./Plan";

import { User } from "types/user";

import { Price } from "types/pay";

import * as functions from "functions";

interface PropType {
  user: User;
  type: string;
  price: Price;
  priceId: string | undefined;
  setPriceId: React.Dispatch<React.SetStateAction<string | undefined>>;
  tax: number;
  handlePortal: ({
    setLoad,
    demo,
  }: functions.pay.HandlePortal) => Promise<void>;
  demo: boolean;
}

export const Item: React.FC<PropType> = ({
  user,
  type,
  price,
  priceId,
  setPriceId,
  tax,
  handlePortal,
  demo,
}) => {
  switch (true) {
    case type === "individual" || type === "parent":
      return (
        <Plan
          user={user}
          type={type}
          price={price}
          tax={tax}
          priceId={priceId}
          setPriceId={setPriceId}
          handlePortal={handlePortal}
          demo={demo}
        />
      );

    default:
      return (
        <Option
          user={user}
          type={type}
          price={price}
          tax={tax}
          priceId={priceId}
          setPriceId={setPriceId}
          handlePortal={handlePortal}
          demo={demo}
        />
      );
  }
};
