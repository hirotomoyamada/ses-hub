import styles from "./Main.module.scss";

import Loader from "react-loader-spinner";

import { Header } from "./components/Header";
import { Editor } from "./components/Editor";
import { Profile } from "./components/profile/Profile";
import { Follow } from "../../../../components/follow/Follow";

export const Main = ({ uid, user, currentUser, type, main }) => {
  return (
    <div className={styles.main} ref={main}>
      {user.uid ? (
        <>
          <Header user={user} uid={uid} />

          <div className={styles.main_inner}>
            {currentUser.uid === uid ? (
              <Editor />
            ) : (
              user.uid && <Follow user={currentUser} post={user} profile />
            )}

            <Profile type={type} user={user} />
          </div>
        </>
      ) : (
        <div className={styles.main_load}>
          <Loader type="Oval" color="#49b757" height={56} width={56} />
        </div>
      )}
    </div>
  );
};
