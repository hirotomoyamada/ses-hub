import styles from "../List.module.scss";

import Loader from "react-loader-spinner";

export const Load = ({ load, page, hit, bests }) => {
  return (
    <div
      ref={load}
      className={`${styles.list_load} ${
        (page === hit?.pages || bests) && styles.list_load_none
      }`}
    >
      {page < hit?.pages && (
        <Loader type="Oval" color="#49b757" height={32} width={32} />
      )}
    </div>
  );
};
