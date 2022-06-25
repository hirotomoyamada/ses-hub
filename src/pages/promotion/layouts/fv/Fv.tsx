import React from "react";
import { LinkBtn, Btn } from "../../components/btn/Btn";
import styles from "./Fv.module.scss";

interface PropType {
  handleOpen: () => void;
  fv: React.RefObject<HTMLDivElement>;
}

export const Fv: React.FC<PropType> = ({ handleOpen, fv }) => {
  return (
    <div className={styles.fv} ref={fv}>
      <div className={styles.fv_inner}>
        <div className={styles.fv_head}>
          <div className={styles.fv_head_ttl}>
            <span className={styles.fv_head_copy}>
              Sales app for enterprises
            </span>
            <h1 className={styles.fv_head_main}>Fun like the best</h1>
          </div>

          <p className={styles.fv_head_txt}>
            SES営業マンのためのコミュニケーションプラットフォーム
            <br />
          </p>

          <div className={styles.fv_head_btn}>
            <LinkBtn txt={"お問い合わせ"} src={"contact"} acnt square />
            <Btn txt={"スタートアップ"} func={handleOpen} square />
          </div>
        </div>

        <div className={styles.fv_footer}>
          <img
            src={`${process.env.PUBLIC_URL}/img/promotion/top.png`}
            alt=""
            className={styles.fv_footer_img}
          />
        </div>
      </div>

      <img
        src={`${process.env.PUBLIC_URL}/img/promotion/bg.svg`}
        alt=""
        className={styles.fv_bg}
      />
    </div>
  );
};
