import styles from "./Post.module.scss";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { fetchPost } from "./actions/fetchPost";
import * as rootSlice from "../root/rootSlice";
import * as postSlice from "./postSlice";
import * as userSlice from "../user/userSlice";

import { Meta } from "./Meta";
import { Main } from "./layouts/main/Main";
import { Side } from "./layouts/side/Side";

export const Post = ({ index, objectID }) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const post = useSelector(postSlice.post);
  const posts = useSelector(postSlice.bests);
  const user = useSelector(userSlice.user);

  const [entry, setEntry] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    dispatch(rootSlice.handlePage("post"));
  }, [dispatch, index]);

  useEffect(() => {
    dispatch(fetchPost({ index: index, objectID: objectID }));
  }, [dispatch, index, objectID, user.uid]);

  useEffect(() => {
    setEntry(
      user.entries?.[index]?.indexOf(post?.objectID) >= 0 ? true : false
    );
  }, [index, post?.objectID, user.entries]);

  const handleEntry = () => {
    dispatch(rootSlice.handleModal({ type: "entry" }));
  };

  return (
    <div className={styles.post}>
      <Meta post={post} />

      <Main
        index={index}
        post={post}
        user={user}
        entry={entry}
        handleEntry={handleEntry}
      />

      <Side index={index} post={post} posts={posts} user={user} />
    </div>
  );
};
