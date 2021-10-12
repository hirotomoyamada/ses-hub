import styles from "./Asct.module.scss";
import { Table } from "./components/Table";
import { Header } from "../../components/header/Header";

export const Asct = () => {
  return (
    <div className={styles.asct}>
      <Header ttl="特定商取引法に基づく表示" back />
      <div className={styles.asct_inner}>
        <Table />
      </div>
    </div>
  );
};
