import styles from "./Post.module.scss";
import root from "../Section.module.scss";

import Loader from "react-loader-spinner";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { promotionPosts } from "../../../../features/post/functions/promotionPosts";
import * as rootSlice from "../../../../features/root/rootSlice";
import * as postSlice from "../../../../features/post/postSlice";

import { Item } from "./components/Item";
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
    status !== "enable" && dispatch(promotionPosts({ index: index }));
  }, [dispatch, index, status]);

  return (
    <section className={`${styles.post} ${root.section}`}>
      <div className={`${root.section_inner} ${root.section_inner_content}`}>
        <h1 className={`${styles.post_ttl} ${root.section_ttl}`}>みつけよう</h1>

        <div className={styles.post_index}>
          <button
            type="button"
            className={`${styles.post_index_btn} ${
              index === "matters" && styles.post_index_btn_current
            }`}
            onClick={() => dispatch(rootSlice.handleIndex("matters"))}
          >
            案件情報
          </button>
          <button
            type="button"
            className={`${styles.post_index_btn} ${
              index === "resources" && styles.post_index_btn_current
            }`}
            onClick={() => dispatch(rootSlice.handleIndex("resources"))}
          >
            人材情報
          </button>
        </div>

        {posts[0] ? (
          <div className={styles.post_list}>
            {posts.map((post) => (
              <button
                type="button"
                key={post.objectID}
                onClick={() => handleOpen()}
              >
                <Item index={index} post={post} />
              </button>
            ))}
          </div>
        ) : (
          <div className={styles.post_list_none}>
            {load ? (
              <Loader type="Oval" color="#ff9900" height={56} width={56} />
            ) : (
              <span className={styles.post_list_none_message}>
                {index === "matters"
                  ? "案件情報がありません"
                  : index === "resources" && "人材情報がありません"}
              </span>
            )}
          </div>
        )}

        <div className={styles.post_more}>
          <Btn txt="もっとみる" func={handleOpen} />
        </div>
      </div>
    </section>
  );
};
