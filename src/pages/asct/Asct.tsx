import React, { useEffect } from "react";
import styles from "./Asct.module.scss";

import { Header } from "../../components/header/Header";
import { Table } from "./components/Table";

export const Asct: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.asct}>
      <Header ttl="特定商取引法に基づく表示" back />
      <div className={styles.asct_inner}>
        <Table />
      </div>
    </div>
  );
};
