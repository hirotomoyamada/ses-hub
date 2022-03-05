import React from "react";

import styles from "./Header.module.scss";

import { Company as SelectUser } from "types/post";
import { User } from "types/user";

interface PropType {
  user: User | SelectUser;
  handleClose: () => void;
  handleBack: () => void;
  cover: boolean;
  icon: boolean;
  line: boolean;
}

export const Header: React.FC<PropType> = ({
  user,
  handleClose,
  handleBack,
  cover,
  icon,
  line,
}) => {
  return (
    <div className={styles.header}>
      <button
        type="button"
        className={`${styles.header_cancel} ${
          (!user?.profile?.person || user?.profile?.person === "名無しさん") &&
          !cover &&
          !icon &&
          !line &&
          styles.header_cancel_disable
        }`}
        onClick={!cover && !icon && !line ? handleClose : handleBack}
      >
        {cover || icon ? "保存" : line ? "もどる" : "キャンセル"}
      </button>
      {!cover && !icon && !line && (
        <button className={styles.header_submit} type="submit">
          保存
        </button>
      )}
    </div>
  );
};
