import React from "react";
import styles from "./Application.module.scss";

import { useDispatch } from "react-redux";
import * as userSlice from "features/user/userSlice";

import { Header } from "../account/components/header/Header";
import { Main } from "./components/main/Main";
import { User } from "types/user";

interface PropType {
  user: User;
  handleClose: () => void;
}

export const Application: React.FC<PropType> = ({ user, handleClose }) => {
  const dispatch = useDispatch();

  const handleApplication = (): void => {
    dispatch(userSlice.applicationType());
    handleClose();
  };

  return (
    <div className={styles.application}>
      <Header handleClose={handleClose} />
      <Main user={user} handleApplication={handleApplication} />
    </div>
  );
};
