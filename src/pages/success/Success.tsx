import React, { useEffect, useState } from "react";
import styles from "./Success.module.scss";

import { converter, db } from "libs/firebase";
import { doc, onSnapshot } from "firebase/firestore";

import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useScrollController } from "../../hooks/useScrollController";

import * as userSlice from "../../features/user/userSlice";

import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { Footer } from "./components/Footer";
import { Company } from "types/post";
import { User } from "types/user";

export const Success: React.FC = () => {
  useScrollController();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(userSlice.user);
  const [load, setLoad] = useState<boolean | undefined>(true);

  useEffect(() => {
    const ref = doc(db, "companys", user.uid).withConverter(
      converter<Company>()
    );
    onSnapshot(ref, (doc) => {
      const { payment } = doc.data() as User;

      if (!payment.load) {
        setLoad(payment?.load);
        dispatch(userSlice.updateNotice());
      }
    });
  }, [dispatch, user.uid]);

  const handleRedirect = (page: string): void => {
    navigate(page, { replace: true });
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
