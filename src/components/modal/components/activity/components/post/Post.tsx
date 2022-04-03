import React from "react";
import styles from "../../Activity.module.scss";

import { Command } from "./components/command/Command";
import { Detail } from "./components/detail/Detail";
import { View } from "./components/view/View";
import { Today } from "./components/today/Today";
import { Log } from "./components/log/Log";

import { Matter, Resource } from "types/post";

interface PropType {
  index: "matters" | "resources" | "companys" | "persons";
  post: Matter | Resource;
  activity: {
    total: Record<string, number>;
    today: Record<string, number>;
    log: Record<string, string | number>[];
  };
}

export const Post: React.FC<PropType> = ({ index, post, activity }) => {
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
