import styles from "./Request.module.scss";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as userSlice from "../../features/user/userSlice";

export const Request = ({ user, post }) => {
  const dispatch = useDispatch();

  const [requses, setRequest] = useState(false);

  const handleRequest = () => {};
  
  return (
    <button className={styles.request}>
      {!requses ? "リクエストする" : "リクエスト済み"}
    </button>
  );
};
