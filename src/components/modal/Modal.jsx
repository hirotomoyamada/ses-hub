import styles from "./Modal.module.scss";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as rootSlice from "../../features/root/rootSlice";
import * as userSlice from "../../features/user/userSlice";
import * as postSlice from "../../features/post/postSlice";

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

export const Modal = () => {
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
        return <Request user={user} handleClose={handleClose} />;
      case "entry":
        return (
          <Entry
            index={index}
            user={user}
            post={post}
            handleClose={handleClose}
          />
        );
      case "profile":
        return <Profile user={user} handleClose={handleClose} />;
      case "account":
        return (
          <Account
            uid={{ user: user.uid, selectUser: modal.meta.uid }}
            email={{
              user: user.profile.email,
              selectUser: modal.meta.email,
            }}
            type={modal.meta.type}
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
        return <Form handleClose={handleClose} edit />;
      case "new":
        return <Form handleClose={handleClose} />;
      default:
        return <></>;
    }
  };

  const handleClose = () => {
    dispatch(rootSlice.handleModal());
    modal.type === "advertise" && dispatch(userSlice.updatePayment("notice"));
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
          styles.modal_sp
        }`}
      >
        <Inner />
      </div>
    </div>
  );
};
