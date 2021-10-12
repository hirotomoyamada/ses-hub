import styles from "../Side.module.scss";
import { useDispatch } from "react-redux";
import * as rootSlice from "../../../../root/rootSlice";

export const Header = ({ index, user, uid, main, side }) => {
  const dispatch = useDispatch();

  const handleIndex = (index) => {
    if (window.innerWidth > 959) {
      side.current && side.current.scrollTo(0, 0);
    } else {
      window.scrollTo(0, main?.current?.clientHeight);
    }

    dispatch(rootSlice.handleIndex(index));
  };

  return (
    <div
      className={`${styles.side_header} ${
        user?.uid === uid &&
        user?.payment?.status !== "canceled" &&
        styles.side_header_user
      }`}
    >
      <button
        onClick={() => handleIndex("matters")}
        className={`${styles.side_header_btn} ${
          index === "matters" && styles.side_header_btn_active
        }`}
      >
        案件
      </button>

      <button
        onClick={() => handleIndex("resources")}
        className={`${styles.side_header_btn} ${
          index === "resources" && styles.side_header_btn_active
        }`}
      >
        人材
      </button>

      {user?.uid === uid && user?.payment?.status !== "canceled" && (
        <button
          onClick={() => handleIndex("companys")}
          className={`${styles.side_header_btn} ${
            index === "companys" && styles.side_header_btn_active
          }`}
        >
          フォロー中
        </button>
      )}
    </div>
  );
};
