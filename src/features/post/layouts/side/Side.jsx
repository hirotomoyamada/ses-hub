import styles from "./Side.module.scss";
import Loader from "react-loader-spinner";

import { Link } from "react-router-dom";

import { Item } from "../../item/Item";
import { Advertise } from "./components/Advertise";
import { List } from "../../list/List";

export const Side = ({ index, post, posts, user }) => {
  return (
    <div className={styles.side}>
      <span className={styles.side_tag}>
        投稿した{post?.user?.type !== "corporate" ? "ユーザー" : "企業"}
      </span>

      {post?.user?.uid ? (
        <Item index={"companys"} user={user} post={post?.user} />
      ) : (
        <div className={styles.side_load}>
          <Loader type="Oval" color="#49b757" height={56} width={56} />
        </div>
      )}

      {user?.uid !== post?.user?.uid && (
        <Link to={`/companys/${post?.user?.uid}`} className={styles.side_desc}>
          この{post?.user?.type !== "corporate" ? "ユーザー" : "企業"}
          の他の投稿を見る
        </Link>
      )}

      <span className={styles.side_tag}>
        {index === "matters"
          ? user?.payment?.status !== "canceled"
            ? "こんな案件もオススメ"
            : "もっと案件をご覧になりますか？"
          : index === "resources" && user?.payment?.status !== "canceled"
          ? "こんな人材もオススメ"
          : "もっと人材をご覧になりますか？"}
      </span>

      {user?.payment?.status !== "canceled" ? (
        <List index={index} user={user} posts={posts} bests={true} />
      ) : (
        <Advertise user={user} />
      )}
    </div>
  );
};
