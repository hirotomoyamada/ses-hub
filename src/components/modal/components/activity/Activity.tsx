import React, { useEffect } from "react";
import styles from "./Activity.module.scss";

import { useDispatch, useSelector } from "react-redux";

import * as postSlice from "features/post/postSlice";
import * as rootSlice from "features/root/rootSlice";

import { fetchActivity } from "features/post/actions";

import { Audio } from "react-loader-spinner";
import { Command } from "./components/command/Command";
import { Detail } from "./components/detail/Detail";
import { History } from "./components/history/History";
import { Today } from "./components/today/Today";
import { Log } from "./components/log/Log";

import { Matter, Resource } from "types/post";

import { Header } from "./components/header/Header";

interface PropType {
  index: "matters" | "resources" | "companys" | "persons";
  post: Matter | Resource;
  handleClose: () => void;
}

export type Span = "total" | "day" | "week" | "month";

export type Sort = {
  self: boolean;
  others: boolean;
};

export const Activity: React.FC<PropType> = ({ index, post, handleClose }) => {
  const dispatch = useDispatch();
  const activity = useSelector(postSlice.activity);
  const fetch = useSelector(rootSlice.load).fetch;

  useEffect(() => {
    if (post.objectID && (index === "matters" || index === "resources"))
      dispatch(fetchActivity({ index: index, post: post }));
  }, [dispatch, index, post]);

  return (
    <div className={`${styles.activity}`}>
      <Header handleClose={handleClose} />

      {!fetch ? (
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
      )}
    </div>
  );
};
