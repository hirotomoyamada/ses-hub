import styles from "./Side.module.scss";
import Loader from "react-loader-spinner";

import { Link } from "react-router-dom";

import { Item } from "../../../../components/item/Item";
import { List } from "../../../../components/list/List";

export const Side = ({ index, post, posts, user }) => {
  return (
    <div className={styles.side}>
      <span className={styles.side_tag}>投稿したユーザー</span>

      {post?.user?.uid ? (
        <Item index={"companys"} user={user} post={post?.user} />
      ) : (
        <div className={styles.side_load}>
          <Loader type="Oval" color="#49b757" height={56} width={56} />
        </div>
      )}

      {user?.uid !== post?.user?.uid && (
        <Link to={`/companys/${post?.user?.uid}`} className={styles.side_desc}>
          このユーザーの他の投稿を見る
        </Link>
      )}

      {user?.type !== "child" && (
        <>
          <span className={styles.side_tag}>
            {index === "matters"
              ? "こんな案件もオススメ"
              : index === "resources" && "こんな人材もオススメ"}
          </span>

          <List index={index} user={user} posts={posts} disable={true} />
        </>
      )}
    </div>
  );
};
