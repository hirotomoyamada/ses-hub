import styles from "./Asct.module.scss";
import { Table } from "./components/Table";
import { useHistory } from "react-router";

export const Asct = () => {
  const history = useHistory();

  return (
    <div className={styles.asct}>
      <div className={styles.asct_inner}>
        <button
          onClick={() => history.goBack()}
          className={styles.asct_btn}
        >
          もどる
        </button>
        <h1 className={styles.asct_ttl}>特定商取引法に基づく表示</h1>
        <Table />
      </div>
    </div>
  );
};
