import React from "react";
import styles from "./Main.module.scss";
import root from "../../Setting.module.scss";

import { Link } from "react-router-dom";
import { History } from "history";

import { useSelector } from "react-redux";
import * as rootSlice from "features/root/rootSlice";

import { Uid } from "./components/Uid";
import { Type } from "./components/Type";
import { Email } from "./components/Email";
import { Password } from "./components/Password";
import { Plan } from "./components/Plan";
import { Option } from "./components/Option";
import { Account } from "./components/Account";
import { At } from "./components/At";
import { Provider } from "./components/provider/Provider";

import { User } from "types/user";

interface PropType {
  user: User;
  email: boolean;
  setEmail: React.Dispatch<React.SetStateAction<boolean>>;
  password: boolean;
  setPassword: React.Dispatch<React.SetStateAction<boolean>>;
  setCreate: React.Dispatch<React.SetStateAction<boolean>>;
  setRemove: React.Dispatch<React.SetStateAction<boolean>>;
  handleProvider: (provider: "google" | "twitter" | "github") => void;
  handleLogout: () => void;
  history: History;
}

export const Main: React.FC<PropType> = ({
  user,
  email,
  setEmail,
  password,
  setPassword,
  setCreate,
  setRemove,
  handleProvider,
  handleLogout,
  history,
}) => {
  const ver = useSelector(rootSlice.ver);

  return (
    <div className={`${root.setting_inner} ${styles.main}`}>
      <Uid user={user} />

      <Type user={user} />

      <Email user={user} email={email} setEmail={setEmail} />

      <Password user={user} password={password} setPassword={setPassword} />

      <Plan user={user} history={history} />

      <Option user={user} />

      <Account user={user} history={history} />

      <At user={user} />

      <Provider
        user={user}
        setCreate={setCreate}
        handleProvider={handleProvider}
      />

      <Provider
        social
        user={user}
        setCreate={setCreate}
        handleProvider={handleProvider}
      />

      <div className={`${styles.main_col} ${styles.main_col_center}`}>
        <Link to={"/howto"} className={styles.main_link}>
          How to App
        </Link>

        <Link to={"/terms"} className={styles.main_link}>
          利用規約
        </Link>

        <Link to={"/asct"} className={styles.main_link}>
          特定商取引法に基づく表示
        </Link>

        {user?.type !== "child" && (
          <button
            type="button"
            onClick={() => setRemove(true)}
            className={styles.main_btn_delete}
          >
            アカウント削除
          </button>
        )}
      </div>

      <div className={`${styles.main_col} ${styles.main_col_center}`}>
        <span className={styles.main_link}>ver&nbsp;{ver}</span>
      </div>

      <button
        onClick={handleLogout}
        type="button"
        className={`${root.setting_btn} ${root.setting_btn_logout}`}
      >
        ログアウト
      </button>
    </div>
  );
};
