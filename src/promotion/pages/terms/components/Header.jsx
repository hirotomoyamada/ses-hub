import styles from "../Terms.module.scss";
import { ttl, body } from "../data/header";
import { useHistory } from "react-router";

export const Header = ({ setTerms }) => {
  const history = useHistory();

  return (
    <div className={styles.terms_header}>
      <button
        onClick={() => (setTerms ? setTerms(false) : history.goBack())}
        className={styles.terms_header_btn}
      >
        もどる
      </button>
      <h1 className={styles.terms_header_ttl}>{ttl}</h1>
      <p className={styles.terms_header_body}>{body}</p>
    </div>
  );
};
