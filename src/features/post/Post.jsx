import styles from "./Post.module.scss";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { showPost } from "./actions/showPost";
import * as rootSlice from "../root/rootSlice";
import * as postSlice from "./postSlice";
import * as userSlice from "../user/userSlice";

import { Menu } from "../../components/menu/Menu";

import { Meta } from "./Meta";
import { Main } from "./layouts/main/Main";
import { Side } from "./layouts/side/Side";

export const Post = ({ index, objectID }) => {
  const dispatch = useDispatch();
  const history = useHistory();
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
    dispatch(rootSlice.handleIndex(index));
  }, [dispatch, index]);

  useEffect(() => {
    dispatch(showPost({ index: index, objectID: objectID }));
  }, [dispatch, index, objectID, user.uid]);

  useEffect(() => {
    setEntry(
      user.entries?.[index]?.indexOf(post?.objectID) >= 0 ? true : false
    );
  }, [index, post?.objectID, user.entries]);

  useEffect(() => {
    !post && user?.payment?.status === "canceled" && history.push("/plan");
  }, [history, post, user?.payment?.status]);

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

      {Object.keys(post).length && <Menu user={user} back />}
    </div>
  );
};
