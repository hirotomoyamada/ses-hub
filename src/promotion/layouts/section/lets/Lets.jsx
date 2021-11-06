import root from "../Section.module.scss";
import styles from "./Lets.module.scss";

import { LinkBtn } from "../../../components/btn/Btn";

export const Lets = () => {
  return (
    <section className={`${styles.lets} ${root.section}`}>
      <div
        className={`${root.section_inner} ${root.section_inner_content} ${styles.lets_inner}`}
      >
        <p className={styles.lets_desc}>
          \&nbsp;&nbsp;今なら1ヶ月無料&nbsp;&nbsp;/
        </p>
        <h1 className={styles.lets_ttl}>さぁ、はじめよう</h1>
        <div className={styles.lets_btn}>
          <LinkBtn txt="フリートライアル" src="signup" acnt />
        </div>

        <img
          src={`${process.env.PUBLIC_URL}/img/promotion/lets.svg`}
          alt=""
          className={styles.lets_bg}
        />
      </div>
    </section>
  );
};
