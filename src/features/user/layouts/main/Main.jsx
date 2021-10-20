import styles from "./Main.module.scss";

import Loader from "react-loader-spinner";

import { Header } from "./components/Header";
import { Editor } from "./components/Editor";
import { Profile } from "./components/profile/Profile";
import { Follow } from "../../../../components/follow/Follow";
import { Request } from "../../../../components/request/Request";

export const Main = ({ uid, user, currentUser, index, main }) => {
  return (
    <div className={styles.main} ref={main}>
      {user.uid ? (
        <>
          <Header user={user} uid={uid} />

          <div className={styles.main_inner}>
            {currentUser.uid === uid ? (
              <Editor />
            ) : index === "companys" ? (
              <Follow user={currentUser} post={user} profile />
            ) : (
              index === "persons" && <Request user={currentUser} post={user} />
            )}

            <Profile index={index} user={user} />
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
