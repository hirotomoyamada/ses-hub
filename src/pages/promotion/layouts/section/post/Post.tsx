import React, { useEffect } from "react";
import root from "../Section.module.scss";
import styles from "./Post.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/store";

import { promotionPosts } from "features/post/actions";
import * as rootSlice from "features/root/rootSlice";
import * as postSlice from "features/post/postSlice";

import { Index } from "./components/index/Index";
import { Posts } from "./components/Posts";
import { NotFound } from "./components/NotFound";
import { Btn } from "../../../components/btn/Btn";

import { Matter, Resource } from "types/post";

interface PropType {
  handleOpen: () => void;
}

export const Post: React.FC<PropType> = ({ handleOpen }) => {
  const dispatch = useDispatch();
  const index = useSelector(rootSlice.index);
  const load = useSelector(rootSlice.load).list;
  const status = useSelector(rootSlice.verified).status;

  const posts = useSelector((state: RootState) =>
    postSlice.posts({ state: state, page: "search", index: index })
  );

  useEffect(() => {
    status === "promo" &&
      dispatch(promotionPosts(index as "matters" | "resources"));
  }, [dispatch, index, status]);

  return (
    <section className={`${styles.post} ${root.section}`}>
      <div className={`${root.section_inner} ${root.section_inner_content}`}>
        <h1 className={`${styles.post_ttl} ${root.section_ttl}`}>みつけよう</h1>

        <Index index={index as "matters" | "resources"} />

        {posts?.length ? (
          <Posts
            index={index as "matters" | "resources"}
            posts={posts as Matter[] | Resource[]}
            handleOpen={handleOpen}
          />
        ) : (
          <NotFound index={index as "matters" | "resources"} load={load} />
        )}

        <div className={styles.post_more}>
          <Btn txt="もっとみる" func={handleOpen} />
        </div>
      </div>
    </section>
  );
};
