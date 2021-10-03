import styles from "../Side.module.scss";

import NavigateNextIcon from "@material-ui/icons/NavigateNext";

export const Toggle = ({ setOpen, open }) => {
  return (
    <button onClick={() => setOpen(!open)} className={styles.side_toggle}>
      <NavigateNextIcon
        className={`${styles.side_toggle_icon} ${
          !open && styles.side_toggle_icon_open
        }`}
      />
    </button>
  );
};
