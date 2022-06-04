import React from "react";
import { functions, db, converter } from "libs/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { httpsCallable, HttpsCallable } from "firebase/functions";

import { OwnDispatch } from "@reduxjs/toolkit";
import { User } from "types/user";

import * as rootSlice from "features/root/rootSlice";
import { CheckoutSession } from "types/pay";

export type HandleCheckout = {
  setLoad: React.Dispatch<
    React.SetStateAction<{
      checkout?: boolean;
      portal?: boolean;
    }>
  >;
  user: User;
  dispatch: OwnDispatch;
  demo: boolean;
  productId?: string;
  priceId?: string;
};

export type CreateCheckOut = {
  req: {
    productId: string;
    priceId: string;
    url: {
      success: string;
      cancel: string;
    };
  };

  data: string;
};

export const handleCheckout = async ({
  setLoad,
  productId,
  priceId,
  user,
  dispatch,
  demo,
}: HandleCheckout): Promise<void> => {
  if (demo) {
    return;
  }

  if (productId && priceId) {
    const createCheckout: HttpsCallable<
      CreateCheckOut["req"],
      CreateCheckOut["data"]
    > = httpsCallable(functions, "sh-createCheckout");

    setLoad({ checkout: true });

    await createCheckout({
      productId: productId,
      priceId: priceId,
      url: {
        success: `${window.location.origin}/success`,
        cancel: window.location.href,
      },
    }).then(({ data }) => {
      const ref = doc(
        db,
        "customers",
        user.uid,
        "checkout_sessions",
        data
      ).withConverter(converter<CheckoutSession>());
      onSnapshot(ref, (doc) => {
        const url = doc.data()?.url;
        const error = doc.data()?.error;

        if (error) {
          dispatch(
            rootSlice.handleAnnounce({
              error: "アクセスに失敗しました 再度ページを更新してください",
            })
          );
          setLoad({ checkout: false });
        }

        if (url) {
          window.location.assign(url);
        }
      });
    });
  }
};

export type HandlePortal = {
  setLoad: React.Dispatch<React.SetStateAction<boolean>>;
  demo: boolean;
};

export const handlePortal = async ({
  setLoad,
  demo,
}: HandlePortal): Promise<void> => {
  if (demo) {
    return;
  }

  const createPortal: HttpsCallable<{ returnUrl: string }, { url: string }> =
    httpsCallable(
      functions,
      "ext-firestore-stripe-subscriptions-createPortalLink"
    );

  setLoad(true);

  await createPortal({ returnUrl: window.location.href }).then(({ data }) => {
    window.location.assign(data.url);
  });
};
