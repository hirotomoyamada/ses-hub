import React from "react";
import styles from "./Provider.module.scss";
import root from "../../Main.module.scss";

import { Btn } from "./components/Btn";

import { User } from "types/user";

interface PropType {
  user: User;
  setCreate?: React.Dispatch<React.SetStateAction<boolean>>;
  handleProvider?: (provider: "google" | "twitter" | "github") => void;
  social?: boolean;
}

export const Provider: React.FC<PropType> = ({
  user,
  setCreate,
  handleProvider,
  social,
}) => {
  return !social ? (
    <div className={styles.provider}>
      <span className={root.main_tag}>メールログイン</span>

      <Btn user={user} provider="password" setCreate={setCreate} />

      {user?.type === "child" && (
        <span className={root.main_desc}>
          このアカウントでは認証することはできません
        </span>
      )}
    </div>
  ) : (
    <div className={styles.provider}>
      <span className={root.main_tag}>ソーシャルログイン</span>

      <Btn user={user} provider="google" handleProvider={handleProvider} />

      <Btn user={user} provider="twitter" handleProvider={handleProvider} />

      <Btn user={user} provider="github" handleProvider={handleProvider} />

      {user?.type === "child" && (
        <span className={root.main_desc}>
          このアカウントでは認証することはできません
        </span>
      )}
    </div>
  );
};
