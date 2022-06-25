import React, { useEffect, useState } from "react";
import styles from "./HowTo.module.scss";

import { useSelector } from "react-redux";

import * as userSlice from "../../features/user/userSlice";

import { Header } from "../../components/header/Header";
import { Menu } from "./components/menu/Menu";
import { Main } from "./components/Main/Main";

export const HowTo: React.FC = () => {
  const type = useSelector(userSlice.user).type;
  const [page, setPage] = useState("home");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.howto}>
      <Header back />

      <div className={styles.howto_inner}>
        <Menu page={page} setPage={setPage} type={type} />
        <Main page={page} type={type} />
      </div>
    </div>
  );
};
