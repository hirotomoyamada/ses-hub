import styles from "./HowTo.module.scss";

import { useState } from "react";
import { useHistory } from "react-router";

import { Header } from "./components/header/Header";
import { Main } from "./components/Main/Main";

export const HowTo = () => {
  const history = useHistory();
  const [page, setPage] = useState("home");

  return (
    <div className={styles.howto}>
      <div className={styles.howto_inner}>
        <button
          type="button"
          onClick={() => history.goBack()}
          className={styles.howto_btn}
        >
          もどる
        </button>
        <Header page={page} setPage={setPage} />
        <Main page={page} />
      </div>
    </div>
  );
};
