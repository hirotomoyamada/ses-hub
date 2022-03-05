import React from "react";
import styles from "../Side.module.scss";

import NavigateNextIcon from "@material-ui/icons/NavigateNext";

interface PropType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Toggle: React.FC<PropType> = ({ open, setOpen }) => {
  return (
    <button onClick={() => setOpen(!open)} className={styles.side_toggle}>
      <NavigateNextIcon
        className={`${styles.side_toggle_icon} ${
          open && styles.side_toggle_icon_open
        }`}
      />
    </button>
  );
};
