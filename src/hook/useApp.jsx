import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { auth } from "../firebase";

import { login } from "../features/user/actions/login";
import * as rootSlice from "../features/root/rootSlice";
import * as userSlice from "../features/user/userSlice";

export const useApp = () => {
  const dispatch = useDispatch();

  const user = useSelector(userSlice.user);
  const access = useSelector(rootSlice.verified).access;
  const notFound = useSelector(rootSlice.notFound);

  const [browser, setBrowser] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(login(user));
      } else {
        auth.signOut();
        dispatch(userSlice.logout());
      }
    });
  }, [dispatch]);

  useEffect(() => {
    const agent = window.navigator.userAgent.toLowerCase();
    if (agent.indexOf("msie") !== -1 || agent.indexOf("trident") !== -1) {
      setBrowser(false);
    }
  }, []);

  useEffect(() => {
    const setFillHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    const resize = (t) => {
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

  return [user, access, notFound, browser];
};
