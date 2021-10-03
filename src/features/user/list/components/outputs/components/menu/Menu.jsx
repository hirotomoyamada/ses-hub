import styles from "./Menu.module.scss";

import { CopyToClipboard } from "react-copy-to-clipboard";

import PrintIcon from "@material-ui/icons/Print";
import AssignmentIcon from "@material-ui/icons/Assignment";

export const Menu = ({
  outputs,
  open,
  setOpen,
  copy,
  handleCopy,
  handlePrint,
}) => {
  return (
    <div className={styles.menu}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={styles.menu_btn_close}
      >
        もどる
      </button>
      <button
        type="button"
        className={styles.menu_btn}
        onClick={handlePrint}
      >
        <PrintIcon className={styles.menu_btn_icon} />
        <span>プリント</span>
      </button>

      <CopyToClipboard text={outputs.join("")} onCopy={!copy && handleCopy}>
        <button className={styles.menu_btn}>
          <AssignmentIcon className={styles.menu_btn_icon} />
          <span>クリップボード</span>
        </button>
      </CopyToClipboard>
    </div>
  );
};
