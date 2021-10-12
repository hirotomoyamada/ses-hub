import styles from "./Header.module.scss";
import { useFormContext } from "react-hook-form";

import { Cover } from "../../../../../../../cover/Cover";
import { Icon } from "../../../../../../../icon/Icon";

export const Header = ({ cover, icon, setCover, setIcon }) => {
  const { watch } = useFormContext();
  return (
    <div className={styles.header}>
      <button onClick={() => setCover(!cover)} className={styles.header_cover}>
        <Cover src={watch("cover")} />
      </button>
      <button onClick={() => setIcon(!icon)} className={styles.header_icon}>
        <Icon src={watch("icon")} />
      </button>
    </div>
  );
};
