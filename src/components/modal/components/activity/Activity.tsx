import React, { useState } from "react";
import styles from "./Activity.module.scss";

import { Matter, Resource } from "types/post";

import { Header } from "./components/header/Header";
import { Post } from "./components/post/Post";
import { User } from "./components/user/User";
import { User as UserType } from "types/user";

interface PropType {
  index: "matters" | "resources" | "companys" | "persons";
  user: UserType;
  post: Matter | Resource;
  type?: "user" | "post";
  handleClose: () => void;
}

export type Span = "total" | "day" | "week" | "month";

export type Sort = {
  self: boolean;
  others: boolean;
};

export const Activity: React.FC<PropType> = ({
  index,
  user,
  post,
  type,
  handleClose,
}) => {
  const [span, setSpan] = useState<Span>("total");
  const [sort, setSort] = useState<Sort>({ self: true, others: true });
  const [setting, setSetting] = useState<boolean>(false);
  const [verification, setVerification] = useState<boolean>(false);

  return (
    <div
      className={`${styles.activity} ${
        type === "user" && styles.activity_user
      }`}
    >
      <Header
        type={type}
        span={span}
        sort={sort}
        verification={verification}
        setting={setting}
        setSpan={setSpan}
        setSort={setSort}
        setSetting={setSetting}
        handleClose={handleClose}
      />

      {type === "user" ? (
        <User
          user={user}
          span={span}
          sort={sort}
          setting={setting}
          setSetting={setSetting}
          setVerification={setVerification}
        />
      ) : (
        <Post index={index} post={post} />
      )}
    </div>
  );
};
