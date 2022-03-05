import React, { useEffect, useState } from "react";
import styles from "./Entry.module.scss";

import { useDispatch } from "react-redux";
import * as userSlice from "features/user/userSlice";

import * as functions from "functions";

import { Body } from "./components/Body";
import { Social } from "./components/Social";

import { User } from "types/user";
import { Matter, Resource } from "types/post";

interface PropType {
  index: "matters" | "resources";
  user: User;
  post: Matter | Resource;
  handleClose: () => void;
}

export const Entry: React.FC<PropType> = ({
  index,
  user,
  post,
  handleClose,
}) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<string | undefined>();
  const [copy, setCopy] = useState(false);

  useEffect(() => {
    setValue(
      index === "matters"
        ? functions.entry.matters(post as Matter)
        : index === "resources"
        ? functions.entry.resources(post as Resource)
        : undefined
    );
  }, [index, post]);

  const handleCopy = (): void => {
    setCopy(true);
    setTimeout(() => setCopy(false), 3000);
  };

  const handleEntry = (): void => {
    if (index === "matters") {
      const entries = user.entries.matters ? user.entries.matters : [];

      if (entries.indexOf(post.objectID) < 0) {
        dispatch(userSlice.addEntry({ index: index, post: post }));
      }
    }

    if (index === "resources") {
      const entries = user.entries.resources ? user.entries.resources : [];

      if (entries.indexOf(post.objectID) < 0) {
        dispatch(userSlice.addEntry({ index: index, post: post }));
      }
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
          user={post.user}
          value={value}
          copy={copy}
          setValue={setValue}
          handleCopy={handleCopy}
          handleEntry={handleEntry}
        />

        <Social user={post.user} handleEntry={handleEntry} />
      </div>
    </div>
  );
};
