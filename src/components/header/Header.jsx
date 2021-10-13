import styles from "./Header.module.scss";

import { useDispatch } from "react-redux";
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
  posts,
  home,
  search,
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
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

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
    !setting ? history.goBack() : history.push(`/companys/${user.uid}`);
  };

  return !back ? (
    <div className={styles.header}>
      <div
        className={`${styles.header_container} ${
          !home && !search && styles.header_container_none
        }`}
      >
        <Link to={`/companys/${user?.uid}`}>
          <div className={styles.header_icon}>
            {user?.icon && <Icon src={user.icon} />}
          </div>
        </Link>
        {search ? <Search index={index} posts={posts} /> : <Information />}
      </div>

      <Menu
        index={index}
        uid={uid}
        user={user}
        search={search}
        handleIndex={handleIndex}
        outputs={outputs}
      />
    </div>
  ) : (
    <div
      className={`${styles.header} ${styles.header_back} ${
        !ttl && styles.header_none
      }`}
    >
      <button
        type="button"
        className={styles.header_back_cancel}
        onClick={
          !email && !password && !create && !remove ? handleBack : handleCancel
        }
      >
        もどる
      </button>
      <span className={styles.header_back_ttl}>
        {!email && !password && !create && !remove ? ttl : ""}
      </span>
    </div>
  );
};
