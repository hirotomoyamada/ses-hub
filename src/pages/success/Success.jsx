import styles from "./Success.module.scss";

import { db } from "../../firebase";

import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useScrollController } from "../../hooks/useScrollController";

import * as userSlice from "../../features/user/userSlice";

import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { Footer } from "./components/Footer";

export const Success = () => {
  useScrollController();

  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(userSlice.user);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    db.collection("companys")
      .doc(user.uid)
      .onSnapshot((snap) => {
        const { payment } = snap.data();

        if (!payment.load) {
          setLoad(payment.load);
          dispatch(userSlice.updatePayment(payment));
        }
      });
  }, [dispatch, user.uid]);

  const handleRedirect = (page) => {
    history.replace(page);
  };

  return (
    <div className={styles.success}>
      <div className={styles.success_inner}>
        <Header load={load} />
        <Main load={load} />
        <Footer load={load} handleRedirect={handleRedirect} />
      </div>
    </div>
  );
};
