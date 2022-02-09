import styles from "./Header.module.scss";

import { Display } from "./components/Display";
import { Position } from "./components/Position";
import { Status } from "./components/Status";
import { Handles } from "./components/Handles";

export const Header = ({ post, user, display, status }) => {
  return (
    <div className={styles.header}>
      <div className={styles.header_container}>
        {(display || status) && post.uid === user.uid && (
          <div className={styles.header_wrap}>
            <Display post={post} />
            <Status post={post} />
          </div>
        )}

        <Position post={post} />
      </div>

      <Handles post={post} />
    </div>
  );
};
