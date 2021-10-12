import styles from "./Provider.module.scss";
import root from "../../Main.module.scss";
import { Btn } from "./components/Btn";

export const Provider = ({ user, setCreate, handleProvider, social }) => {
  return !social ? (
    <div className={styles.provider}>
      <span className={root.main_tag}>メールログイン</span>

      <Btn user={user} provider="password" setCreate={setCreate} />
    </div>
  ) : (
    <div className={styles.provider}>
      <span className={root.main_tag}>ソーシャルログイン</span>

      <Btn user={user} provider="google" handleProvider={handleProvider} />

      <Btn user={user} provider="twitter" handleProvider={handleProvider} />

      <Btn user={user} provider="github" handleProvider={handleProvider} />
    </div>
  );
};
