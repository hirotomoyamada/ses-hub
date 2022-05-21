import React from "react";
import styles from "./Footer.module.scss";
import { ThreeDots } from "react-loader-spinner";

interface PropType {
  load: boolean;
}

export const Footer: React.FC<PropType> = ({ load }) => {
  return (
    <div className={styles.footer}>
      <button type="submit" className={styles.footer_btn}>
        {load ? (
          <ThreeDots color="#FFF" height={32} width={32} />
        ) : (
          "ダウンロード"
        )}
      </button>
    </div>
  );
};
