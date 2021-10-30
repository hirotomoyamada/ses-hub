import root from "../Section.module.scss";
import styles from "./Post.module.scss";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { promotionPosts } from "../../../../features/post/actions/promotionPosts";
import * as rootSlice from "../../../../features/root/rootSlice";
import * as postSlice from "../../../../features/post/postSlice";

import { Index } from "./components/index/Index";
import { Posts } from "./components/Posts";
import { NotFound } from "./components/NotFound";
import { Btn } from "../../../components/btn/Btn";

export const Post = ({ handleOpen }) => {
  const dispatch = useDispatch();
  const index = useSelector(rootSlice.index);
  const load = useSelector(rootSlice.load);
  const status = useSelector(rootSlice.verified).status;

  const posts = useSelector((state) =>
    postSlice.posts({ state: state, page: "search", index: index })
  );

  useEffect(() => {
    status === "promo" && dispatch(promotionPosts({ index: index }));
  }, [dispatch, index, status]);

  return (
    <section className={`${styles.post} ${root.section}`}>
      <div className={`${root.section_inner} ${root.section_inner_content}`}>
        <h1 className={`${styles.post_ttl} ${root.section_ttl}`}>みつけよう</h1>

        <Index index={index} />

        {posts.length ? (
          <Posts index={index} posts={posts} handleOpen={handleOpen} />
        ) : (
          <NotFound index={index} load={load} />
        )}

        <div className={styles.post_more}>
          <Btn txt="もっとみる" func={handleOpen} />
        </div>
      </div>
    </section>
  );
};
