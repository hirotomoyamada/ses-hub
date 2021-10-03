import styles from "./Side.module.scss";
import Loader from "react-loader-spinner";

import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import * as postSlice from "../../postSlice";

import { Item } from "../../item/Item";
import { Advertise } from "./components/Advertise";

export const Side = ({ index, post, posts, user }) => {
  const load = useSelector(postSlice.load);

  return (
    <div className={styles.side}>
      <span className={styles.side_tag}>投稿したユーザー</span>

      {post?.user?.uid ? (
        <Item user={user} post={post?.user} companys />
      ) : (
        <div className={styles.side_load}>
          <Loader type="Oval" color="#49b757" height={32} width={32} />
        </div>
      )}

      {user?.uid !== post?.user?.uid && (
        <Link to={`/user/companys/${post?.user?.uid}`}>
          <span className={styles.side_desc}>このユーザーの他の投稿を見る</span>
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
        posts?.length ? (
          posts.map(
            (post) =>
              post && (
                <Item
                  key={post?.objectID}
                  index={index}
                  post={post}
                  user={user}
                />
              )
          )
        ) : load ? (
          <div className={styles.side_load}>
            <Loader type="Oval" color="#49b757" height={32} width={32} />
          </div>
        ) : (
          <span className={styles.side_desc}>
            似ている案件が見つかりませんでした
          </span>
        )
      ) : (
        <Advertise user={user} />
      )}
    </div>
  );
};
