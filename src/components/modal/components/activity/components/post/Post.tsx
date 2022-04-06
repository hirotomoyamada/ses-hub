import React from "react";
import styles from "../../Activity.module.scss";

import { useSelector } from "react-redux";

import { Command } from "./components/command/Command";
import { Detail } from "./components/detail/Detail";
import { View } from "./components/view/View";
import { Today } from "./components/today/Today";
import { Log } from "./components/log/Log";

import * as postSlice from "features/post/postSlice";

import { Matter, Resource } from "types/post";

interface PropType {
  index: "matters" | "resources" | "companys" | "persons";
  post: Matter | Resource;
}

export const Post: React.FC<PropType> = ({ index, post }) => {
  const activity = useSelector(postSlice.activity);

  return (
    <div className={styles.activity_inner}>
      <Detail index={index} post={post} />
      <Command total={activity.total} />
      <View total={activity.total} />
      <Today today={activity.today} />
      <Log log={activity.log} />
    </div>
  );
};
