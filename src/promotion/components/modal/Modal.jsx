import styles from "./Modal.module.scss";
import { LinkBtn } from "../btn/Btn";

export const Modal = ({ handleClose, open }) => {
  return (
    <div className={open ? styles.open : styles.close}>
      <div className={styles.overlay} onClick={handleClose}></div>
      
      <div className={styles.modal}>
        <div className={styles.modal_inner}>
          <span className={styles.modal_desc}>
            \&nbsp;&nbsp;今なら1ヶ月無料&nbsp;&nbsp;/
          </span>

          <h1 className={styles.modal_ttl}>
            新規登録して案件・人材を見つけよう
          </h1>

          <LinkBtn txt="フリートライアル" src="signup" />
          
          <img
            src={`${process.env.PUBLIC_URL}/img/promotion/modal.svg`}
            alt=""
            className={styles.modal_bg}
          />
        </div>
      </div>
    </div>
  );
};
