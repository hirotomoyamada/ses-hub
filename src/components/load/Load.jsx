import styles from "./Load.module.scss";

import Loader from "react-loader-spinner";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import * as rootSlice from "../../features/root/rootSlice";
import * as userSlice from "../../features/user/userSlice";

export const Root = () => {
  const load = useSelector(rootSlice.load).root;

  const [none, setNone] = useState(true);

  useEffect(() => {
    !none && setNone(load);
  }, [load, none]);

  useEffect(() => {
    !load && setTimeout(() => setNone(false), 700);
  }, [load]);

  return (
    <div
      className={`${styles.load} 
      ${!load && styles.load_opacity} 
      ${!none && styles.load_none}
      `}
    >
      <Loader type="Oval" color="#49b757" height={56} width={56} />
    </div>
  );
};

export const Fetch = () => {
  const load = useSelector(rootSlice.load).fetch;
  const page = useSelector(rootSlice.page);
  const user = useSelector(userSlice.user).uid;

  const [none, setNone] = useState(true);

  useEffect(() => {
    !none && setNone(load);
  }, [load, none]);

  useEffect(() => {
    !load && setTimeout(() => setNone(false), 700);
  }, [load]);

  return (
    <div
      className={`${styles.load} ${styles.load_fetch} ${
        !user && styles.load_fetch_auth
      } ${page === "user" && styles.load_user} ${
        (page === "likes" || page === "outputs" || page === "entries") &&
        styles.load_list
      }
      ${!load && styles.load_opacity} 
      ${!none && styles.load_none}
      `}
    >
      <Loader type="Oval" color="#49b757" height={56} width={56} />
    </div>
  );
};
