import styles from "./Header.module.scss";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import * as rootSlice from "../../features/root/rootSlice";

import { Icon } from "../icon/Icon";
import { Search } from "./components/search/Search";
import { Menu } from "./components/menu/Menu";
import { Information } from "./components/information/Information";
import { User } from "types/user";
import { Matter, Resource } from "types/post";

interface PropType {
  user?: User;
  index?: "matters" | "resources" | "companys" | "persons";
  handleCancel?: () => void;
  back?: boolean;
  uid?: string;
  main?: React.RefObject<HTMLDivElement>;
  side?: React.RefObject<HTMLDivElement>;
  outputs?: Matter[] | Resource[];
  email?: boolean;
  password?: boolean;
  create?: boolean;
  remove?: boolean;
  reset?: boolean;
  ttl?: string;
  setting?: boolean;
  goSetting?: boolean;
}

export const Header: React.FC<PropType> = ({
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
  reset,
  handleCancel,
  ttl,
  setting,
  goSetting,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const page = useSelector(rootSlice.page);

  const handleIndex = (i: "matters" | "resources" | "companys" | "persons") => {
    if (i === index) {
      return;
    }
    if (uid) {
      if (window.innerWidth > 959) {
        if (side?.current) {
          side.current.scrollTo(0, 0);
        }
      } else {
        if (main?.current) {
          window.scrollTo(0, main.current.clientHeight);
        }
      }

      dispatch(rootSlice.handleIndex(i));
    } else {
      window.scrollTo(0, 0);
      dispatch(rootSlice.handleIndex(i));
    }
  };

  const handleBack = () => {
    !setting && !goSetting
      ? navigate(-1)
      : setting
      ? navigate(`/companys/${user?.uid}`)
      : goSetting && navigate("/setting");
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
      className={`${styles.header} 
      ${styles.header_back} 
      ${
        setting &&
        user?.payment?.status === "canceled" &&
        user?.type !== "individual" &&
        styles.header_back_none
      } 
      ${!ttl && styles.header_none} ${goSetting && styles.header_back_setting}`}
    >
      {(!setting ||
        email ||
        password ||
        create ||
        remove ||
        reset ||
        user?.payment?.status !== "canceled" ||
        user?.type === "individual") && (
        <button
          type="button"
          className={styles.header_back_cancel}
          onClick={
            !email && !password && !create && !remove && !reset
              ? handleBack
              : handleCancel
          }
        >
          {!goSetting || reset ? "もどる" : "アカウント情報 へもどる"}
        </button>
      )}

      <span className={styles.header_back_ttl}>
        {!email && !password && !create && !remove && !reset ? ttl : ""}
      </span>
    </div>
  );
};
