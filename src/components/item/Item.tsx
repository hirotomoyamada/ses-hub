import React from "react";
import styles from "./Item.module.scss";

import { Post } from "./components/post/Post";
import { User } from "./components/user/User";
import { Outputs } from "./components/Outputs";

import { Command } from "components/command/Command";
import { Follow } from "components/follow/Follow";

import { Matter, Resource, Company, Person } from "types/post";
import { User as UserType } from "types/user";

interface PropType {
  post:
    | Matter
    | Resource
    | Company
    | Person
    | Matter["user"]
    | Resource["user"];
  user: UserType;
  index?: "matters" | "resources" | "companys" | "persons";
  status?: boolean;
  display?: boolean;
  outputs?: Matter[] | Resource[];
  handleSelect?: (post: Matter | Resource) => void;
  handleCancel?: (objectID: string) => void;
  select?: string[];
  selectUser?: (uid: string) => void;
}

export const Item: React.FC<PropType> = ({
  index,
  post,
  user,
  status,
  display,
  outputs,
  handleSelect,
  handleCancel,
  select,
  selectUser,
}) => {
  return !outputs?.length ? (
    <div className={styles.item_outer}>
      {index !== "companys" && !select && post ? (
        <Command
          index={index}
          post={post as Matter | Resource | Person}
          user={user}
          item
        />
      ) : (
        post?.uid !== user.uid && (
          <Follow
            user={user}
            post={post as Company}
            select={select}
            selectUser={selectUser}
          />
        )
      )}

      {index === "matters" || index === "resources" ? (
        <Post
          index={index}
          post={post as Matter | Resource}
          user={user}
          status={status}
          display={display}
          outputs={outputs}
        />
      ) : (
        <User index={index} post={post as Company | Person} select={select} />
      )}
    </div>
  ) : (
    <Outputs
      index={index as "matters" | "resources"}
      user={user}
      post={post as Matter | Resource}
      outputs={outputs}
      handleSelect={handleSelect}
      handleCancel={handleCancel}
    />
  );
};
