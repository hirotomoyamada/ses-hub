import styles from "./Entry.module.scss";

import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import * as userSlice from "../../../../features/user/userSlice";

import { matters } from "./functions/matters";
import { resources } from "./functions/resources";
import { Body } from "./components/Body";
import { Social } from "./components/Social";

export const Entry = ({ index, user, post, handleClose }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState();
  const [copy, setCopy] = useState(false);

  useEffect(() => {
    setValue(
      index === "matters"
        ? matters({ post })
        : index === "resources" && resources({ post })
    );
  }, [index, post]);

  const handleCopy = () => {
    setCopy(true);
    setTimeout(() => setCopy(false), 3000);
  };

  const handleEntry = () => {
    if (user.entries[index].indexOf(post.objectID) < 0) {
      dispatch(userSlice.addEntry({ index: index, post: post }));
    }
  };

  return (
    <div className={styles.entry}>
      <div className={styles.entry_head}>
        <button onClick={handleClose} className={styles.entry_head_cancel}>
          もどる
        </button>
        <p className={styles.entry_head_ttl}>問い合わせをする内容</p>
      </div>

      <div className={styles.entry_inner}>
        <Body
          value={value}
          setValue={setValue}
          copy={copy}
          handleCopy={handleCopy}
          handleEntry={handleEntry}
          user={post.user}
        />

        <Social handleEntry={handleEntry} user={post.user} />
      </div>
    </div>
  );
};
