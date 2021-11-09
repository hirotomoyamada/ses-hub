import styles from "./Header.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";

import * as rootSlice from "../../features/root/rootSlice";

import { Icon } from "../icon/Icon";
import { Search } from "./components/search/Search";
import { Menu } from "./components/menu/Menu";
import { Information } from "./components/information/Information";

export const Header = ({
  index,
  uid,
  user,
  outputs,
  main,
  side,
  back,
  email,
  password,
  create,
  remove,
  handleCancel,
  ttl,
  setting,
  goSetting,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const page = useSelector(rootSlice.page);

  const handleIndex = (i) => {
    if (i === index) {
      return;
    }
    if (uid) {
      if (window.innerWidth > 959) {
        side.current && side.current.scrollTo(0, 0);
      } else {
        window.scrollTo(0, main?.current?.clientHeight);
      }

      dispatch(rootSlice.handleIndex(i));
    } else {
      window.scrollTo(0, 0);
      dispatch(rootSlice.handleIndex(i));
    }
  };

  const handleBack = () => {
    !setting && !goSetting
      ? history.goBack()
      : setting
      ? history.push(`/companys/${user.uid}`)
      : goSetting && history.push("/setting");
  };

  return !back ? (
    <div className={styles.header}>
      <div
        className={`${styles.header_container} ${
          page !== "home" && page !== "search" && styles.header_container_none
        }`}
      >
        <Link to={`/companys/${user?.uid}`}>
          <div className={styles.header_icon}>
            {user?.icon && <Icon src={user.icon} />}
          </div>
        </Link>
        {page === "search" ? <Search index={index} /> : <Information />}
      </div>

      <Menu
        index={index}
        uid={uid}
        user={user}
        page={page}
        handleIndex={handleIndex}
        outputs={outputs}
      />
    </div>
  ) : (
    <div
      className={`${styles.header} ${styles.header_back} ${
        !ttl && styles.header_none
      } ${goSetting && styles.header_back_setting}`}
    >
      <button
        type="button"
        className={styles.header_back_cancel}
        onClick={
          !email && !password && !create && !remove ? handleBack : handleCancel
        }
      >
        {!goSetting ? "もどる" : "アカウント情報 へもどる"}
      </button>
      <span className={styles.header_back_ttl}>
        {!email && !password && !create && !remove ? ttl : ""}
      </span>
    </div>
  );
};
