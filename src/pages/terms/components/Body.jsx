import styles from "../Terms.module.scss";
import { body } from "../data/body";

export const Body = ({ setTerms }) => {
  return (
    <p className={styles.terms_body}>
      {body}
    </p>
  );
};
