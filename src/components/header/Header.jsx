import styles from "./Header.module.scss";

import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import * as postSlice from "../../features/post/postSlice";

import { Icon } from "../icon/Icon";
import { Search } from "./components/search/Search";
import { Menu } from "./components/menu/Menu";
import { Information } from "./components/information/Information";

export const Header = ({ index, user, posts, search, info }) => {
  const dispatch = useDispatch();

  const handleIndex = (i) => {
    if (i === index) {
      return;
    }
    window.scrollTo(0, 0);
    dispatch(postSlice.selectIndex(i));
  };

  return (
    <div className={styles.header}>
      <div className={styles.header_container}>
        <Link to={`/companys/${user.uid}`}>
          <div className={styles.header_icon}>
            {user?.icon && <Icon src={user.icon} />}
          </div>
        </Link>
        {search ? (
          <Search index={index} posts={posts} />
        ) : (
          <Information info={info} />
        )}
      </div>

      <Menu index={index} search={search} handleIndex={handleIndex} />
    </div>
  );
};
