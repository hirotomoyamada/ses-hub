import root from "../../Account.module.scss";
import styles from "./Restrict.module.scss";

export const Restrict = () => {
  return (
    <div className={`${root.account_inner} ${styles.restrict}`}>
      <span>このデバイスでは操作できません</span>
      <span>スマートフォン・タブレット以外をご利用ください</span>
    </div>
  );
};
