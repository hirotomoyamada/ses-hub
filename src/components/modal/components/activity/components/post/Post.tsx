import React, { useEffect } from "react";
import styles from "../../Activity.module.scss";

import { useDispatch, useSelector } from "react-redux";

import { Audio } from "react-loader-spinner";
import { Command } from "./components/command/Command";
import { Detail } from "./components/detail/Detail";
import { History } from "./components/history/History";
import { Today } from "./components/today/Today";
import { Log } from "./components/log/Log";

import * as postSlice from "features/post/postSlice";
import * as rootSlice from "features/root/rootSlice";

import { Matter, Resource } from "types/post";
import { fetchActivity } from "features/post/actions";

interface PropType {
  index: "matters" | "resources" | "companys" | "persons";
  post: Matter | Resource;
}

export const Post: React.FC<PropType> = ({ index, post }) => {
  const dispatch = useDispatch();
  const activity = useSelector(postSlice.activity);
  const fetch = useSelector(rootSlice.load).fetch;

  useEffect(() => {
    if (post.objectID && (index === "matters" || index === "resources"))
      dispatch(fetchActivity({ index: index, post: post }));

    return () => {
      dispatch(postSlice.resetPost());
    };
  }, [dispatch, index, post]);

  return !fetch ? (
    <div className={styles.activity_inner}>
      <Detail index={index} post={post} />
      <Command total={activity?.total} />
      <History total={activity?.total} />
      <Today today={activity?.today} />
      <Log log={activity?.log} />
    </div>
  ) : (
    <div className={`${styles.activity_inner} ${styles.activity_fetch}`}>
      <Audio color="#49b757" height={48} width={48} />
    </div>
  );
};
