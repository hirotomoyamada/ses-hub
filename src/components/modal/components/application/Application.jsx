import styles from "./Application.module.scss";

import { useDispatch } from "react-redux";
import * as userSlice from "../../../../features/user/userSlice";

import { Header } from "../account/components/header/Header";
import { Main } from "./components/main/Main";

export const Application = ({ user, handleClose }) => {
  const dispatch = useDispatch();

  const handleApplication = () => {
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
