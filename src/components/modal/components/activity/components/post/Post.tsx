import React, { useEffect } from "react";
import styles from "../../Activity.module.scss";

import { useDispatch, useSelector } from "react-redux";

import { Command } from "./components/command/Command";
import { Detail } from "./components/detail/Detail";
import { History } from "./components/history/History";
import { Today } from "./components/today/Today";
import { Log } from "./components/log/Log";

import * as postSlice from "features/post/postSlice";

import { Matter, Resource } from "types/post";
import { fetchActivity } from "features/post/actions";

interface PropType {
  index: "matters" | "resources" | "companys" | "persons";
  post: Matter | Resource;
}

export const Post: React.FC<PropType> = ({ index, post }) => {
  const dispatch = useDispatch();
  const activity = useSelector(postSlice.activity);

  useEffect(() => {
    if (post.objectID && (index === "matters" || index === "resources"))
      dispatch(fetchActivity({ index: index, objectId: post.objectID }));

    return () => {
      dispatch(postSlice.resetPost());
    };
  }, [dispatch, index, post]);

  return (
    <div className={styles.activity_inner}>
      <Detail index={index} post={post} />
      <Command total={activity.total} />
      <History total={activity.total} />
      <Today today={activity.today} />
      <Log log={activity.log} />
    </div>
  );
};
