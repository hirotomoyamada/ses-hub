import styles from "./Menu.module.scss";

import EditIcon from "@material-ui/icons/Edit";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import LaunchIcon from "@material-ui/icons/Launch";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import SettingsIcon from "@material-ui/icons/Settings";

import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as rootSlice from "../../features/root/rootSlice";
import * as postSlice from "../../features/post/postSlice";

export const Menu = ({ user }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation().pathname.replace("/", "");

  const modal = useSelector(rootSlice.modal);
  const index = useSelector(rootSlice.index);
  const status = useSelector(rootSlice.verified).status;
  const notFound = useSelector(rootSlice.notFound);
  const limit = useSelector(rootSlice.limit);
  const page = useSelector(rootSlice.page);
  const open = modal.open;

  const handleOpen = () => {
    dispatch(postSlice.resetPost());
    if (index === "companys" || index === "persons") {
      dispatch(rootSlice.handleIndex("matters"));
    }
    dispatch(rootSlice.handleModal({ type: "new" }));
  };

  const handleSetting = () => {
    dispatch(rootSlice.handleModal({ type: "home" }));
  };

  const handleClose = () => {
    window.close();
  };

  const handlePage = (page) => {
    window.scrollTo(0, 0);
    history.push(page);

    notFound && dispatch(rootSlice.handleNotFound(false));
    limit && dispatch(rootSlice.handleLimit(false));
  };

  const Btn = () => {
    if (
      !limit &&
      !notFound &&
      index !== "companys" &&
      index !== "persons" &&
      (page === "search" ||
        page === "home" ||
        (page === "user" &&
          user.uid ===
            location.substring(location.indexOf("/") + 1, location.length)))
    ) {
      return (
        <button className={styles.menu_main} onClick={handleOpen}>
          <EditIcon className={styles.menu_main_icon} />
        </button>
      );
    } else if (
      (page === "user" &&
        user.uid !==
          location.substring(location.indexOf("/") + 1, location.length)) ||
      page === "post"
    ) {
      return (
        <button className={styles.menu_main} onClick={handleClose}>
          <ArrowBackIosIcon
            className={`${styles.menu_main_icon} ${styles.menu_main_icon_back}`}
          />
        </button>
      );
    } else {
      return (
        <button className={styles.menu_main} onClick={() => history.goBack()}>
          <ArrowBackIosIcon
            className={`${styles.menu_main_icon} ${styles.menu_main_icon_back}`}
          />
        </button>
      );
    }
  };

  return (
    !open &&
    status === "enable" &&
    location !== "setting" &&
    location !== "account" &&
    location !== "plan" &&
    location !== "howto" &&
    location !== "success" &&
    location !== "terms" &&
    location !== "asct" && (
      <div className={styles.menu}>
        <div className={styles.menu_list}>
          <button
            onClick={() => handlePage("/home")}
            type="button"
            className={`${styles.menu_list_btn} ${styles.menu_list_btn_home}`}
          >
            <HomeIcon
              className={`${styles.menu_list_icon} ${
                !limit &&
                !notFound &&
                page === "home" &&
                styles.menu_list_icon_search
              }`}
            />
          </button>

          <button
            onClick={() => handlePage("/search")}
            type="button"
            className={`${styles.menu_list_btn} ${styles.menu_list_btn_seach}`}
          >
            <SearchIcon
              className={`${styles.menu_list_icon} ${
                page === "search" && styles.menu_list_icon_search
              }`}
            />
          </button>

          <button
            onClick={() => handlePage("/likes")}
            type="button"
            className={`${styles.menu_list_btn} ${styles.menu_list_btn_likes}`}
          >
            <FavoriteBorderIcon
              className={`${styles.menu_list_icon} ${
                page === "likes" && styles.menu_list_icon_likes
              }`}
            />
          </button>

          <button
            onClick={() => handlePage("/outputs")}
            type="button"
            className={`${styles.menu_list_btn} ${styles.menu_list_btn_outputs}`}
          >
            <LaunchIcon
              className={`${styles.menu_list_icon} ${
                page === "outputs" && styles.menu_list_icon_outputs
              }`}
            />
          </button>

          <button
            onClick={() => handlePage("/entries")}
            type="button"
            className={`${styles.menu_list_btn} ${styles.menu_list_btn_entries}`}
          >
            <CheckCircleOutlineIcon
              className={`${styles.menu_list_icon} ${
                page === "entries" && styles.menu_list_icon_entries
              }`}
            />
          </button>
        </div>

        {!limit &&
          !notFound &&
          page === "home" &&
          user?.payment?.status !== "canceled" && (
            <button
              onClick={handleSetting}
              type="button"
              className={styles.menu_setting}
            >
              <SettingsIcon className={styles.menu_setting_icon} />
            </button>
          )}

        <Btn />
      </div>
    )
  );
};
