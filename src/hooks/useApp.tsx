import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { auth } from "libs/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { login } from "features/user/actions";
import * as rootSlice from "features/root/rootSlice";
import * as userSlice from "features/user/userSlice";

import { User } from "types/user";

export const useApp = (): [user: User, access: boolean, support: boolean] => {
  const dispatch = useDispatch();

  const user = useSelector(userSlice.user);
  const access = useSelector(rootSlice.verified).access;

  const [support, setSupport] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(login(user));
      } else {
        void signOut(auth);
        dispatch(userSlice.logout());
      }
    });
  }, [dispatch]);

  useEffect(() => {
    const agent: string = window.navigator.userAgent.toLowerCase();
    if (agent.indexOf("msie") !== -1 || agent.indexOf("trident") !== -1) {
      setSupport(false);
    }
  }, []);

  useEffect(() => {
    const setFillHeight = () => {
      const vh: number = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    const resize = (t: boolean): void => {
      if (
        navigator.userAgent.indexOf("iPhone") > 0 ||
        (navigator.userAgent.indexOf("Android") > 0 &&
          navigator.userAgent.indexOf("Mobile") > 0) ||
        navigator.userAgent.indexOf("iPad") > 0 ||
        navigator.userAgent.indexOf("Android") > 0
      ) {
        setFillHeight();
      } else {
        if (t) {
          window.addEventListener("resize", setFillHeight);
        } else {
          window.removeEventListener("resize", setFillHeight);
        }
      }
    };

    resize(true);
    return () => {
      resize(false);
    };
  }, []);

  return [user, access, support];
};
