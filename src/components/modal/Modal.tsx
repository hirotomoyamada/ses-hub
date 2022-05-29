import React, { useEffect } from "react";
import styles from "./Modal.module.scss";

import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as rootSlice from "features/root/rootSlice";
import * as userSlice from "features/user/userSlice";
import * as postSlice from "features/post/postSlice";

import { Form } from "./components/form/Form";
import { Profile } from "./components/profile/Profile";
import { Entry } from "./components/entry/Entry";
import { Home } from "./components/home/Home";
import { Information } from "./components/information/Information";
import { Demo } from "./components/demo/Demo";
import { Agree } from "./components/agree/Agree";
import { Delete } from "./components/delete/Delete";
import { Advertise } from "./components/advertise/Advertise";
import { Request } from "./components/request/Request";
import { Account } from "./components/account/Account";
import { Application } from "./components/application/Application";
import { Activity } from "./components/activity/Activity";

import { Company } from "types/post";
import { User } from "types/user";
import { Analytics } from "./components/analytics/Analytics";

export const Modal: React.FC = () => {
  const dispatch = useDispatch();
  const index = useSelector(rootSlice.index);
  const user = useSelector(userSlice.user);
  const post = useSelector(postSlice.post);
  const modal = useSelector(rootSlice.modal);

  const location = useLocation();

  useEffect(() => {
    location?.pathname === "/asct" || location?.pathname === "/terms"
      ? document.body.classList.remove("lock")
      : modal.open
      ? document.body.classList.add("lock")
      : document.body.classList.remove("lock");
  }, [location, modal.open]);

  const Inner = () => {
    switch (modal.type) {
      case "agree":
        return <Agree user={user} />;

      case "advertise":
        return (
          <Advertise
            user={user}
            text={modal.text}
            type={modal.meta?.type}
            close={modal.close}
            handleClose={handleClose}
          />
        );

      case "demo":
        return <Demo handleClose={handleClose} />;

      case "info":
        return <Information handleClose={handleClose} />;

      case "home":
        return <Home user={user} handleClose={handleClose} />;

      case "request":
        return <Request handleClose={handleClose} />;

      case "entry":
        return (
          <Entry
            index={index as "matters" | "resources"}
            user={user}
            post={post}
            handleClose={handleClose}
          />
        );

      case "profile":
        return (
          <Profile
            user={
              modal?.meta?.type !== "selectUser"
                ? user
                : (modal?.meta?.selectUser as User | Company)
            }
            handleClose={handleClose}
          />
        );

      case "activity":
        return (
          <Activity
            index={index}
            user={user}
            post={post}
            handleClose={handleClose}
          />
        );

      case "analytics":
        return (
          <Analytics
            user={user}
            demo={modal.meta?.type === "demo"}
            handleClose={handleClose}
          />
        );

      case "application":
        return <Application user={user} handleClose={handleClose} />;

      case "account":
        return (
          <Account
            uid={{ user: user.uid, selectUser: modal.meta?.uid as string }}
            email={{
              user: user.profile.email,
              selectUser: modal.meta?.email as string,
            }}
            type={modal.meta?.type as string}
            handleClose={handleClose}
          />
        );

      case "delete":
        return (
          <Delete
            text={modal.text}
            close={modal.close}
            handleClose={handleClose}
            handleDelete={modal.delete}
          />
        );

      case "edit":
        return (
          <Form
            index={index}
            user={user}
            post={post}
            handleClose={handleClose}
            edit
          />
        );

      case "new":
        return (
          <Form
            index={index}
            user={user}
            post={post}
            handleClose={handleClose}
          />
        );

      default:
        return <></>;
    }
  };

  const handleClose = (): void => {
    dispatch(rootSlice.handleModal());
    modal.type === "advertise" && dispatch(userSlice.updateNotice());
  };

  return (
    <div
      className={
        modal.open &&
        location?.pathname !== "/asct" &&
        location?.pathname !== "/terms"
          ? styles.open
          : styles.close
      }
    >
      <div className={styles.overlay}></div>
      <div
        className={`${styles.modal} ${
          modal.type !== "home" &&
          modal.type !== "delete" &&
          modal.type !== "account" &&
          modal.type !== "advertise" &&
          styles.modal_sp
        }`}
      >
        <Inner />
      </div>
    </div>
  );
};
