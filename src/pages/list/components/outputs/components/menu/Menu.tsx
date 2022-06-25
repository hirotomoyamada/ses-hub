import React from "react";
import styles from "./Menu.module.scss";

import { CopyToClipboard } from "react-copy-to-clipboard";

import PrintIcon from "@material-ui/icons/Print";
import AssignmentIcon from "@material-ui/icons/Assignment";

interface PropType {
  outputs: string[] | undefined;
  copy: boolean;
  handleBack: () => void;
  handleCopy: () => void;
  handlePrint: () => void;
}

export const Menu: React.FC<PropType> = ({
  outputs,
  copy,
  handleBack,
  handleCopy,
  handlePrint,
}) => {
  return (
    <div className={styles.menu}>
      <button
        type="button"
        onClick={handleBack}
        className={styles.menu_btn_close}
      >
        もどる
      </button>
      <button type="button" className={styles.menu_btn} onClick={handlePrint}>
        <PrintIcon className={styles.menu_btn_icon} />
        <span>プリント</span>
      </button>

      <CopyToClipboard
        text={outputs ? outputs.join("") : ""}
        onCopy={() => !copy && handleCopy()}
      >
        <button className={styles.menu_btn}>
          <AssignmentIcon className={styles.menu_btn_icon} />
          <span>クリップボード</span>
        </button>
      </CopyToClipboard>
    </div>
  );
};
