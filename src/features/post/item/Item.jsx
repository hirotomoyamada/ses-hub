import styles from "./Item.module.scss";

// import { useDispatch } from "react-redux";
import {
  // useHistory,
  Link,
} from "react-router-dom";

// import * as rootSlice from "../../root/rootSlice";

import { Post } from "./components/post/Post";
import { User } from "./components/user/User";
import { Menu } from "../menu/Menu";

import { Follow } from "../../../components/follow/Follow";
import { Outputs } from "./components/Outputs";

export const Item = ({
  index,
  post,
  user,
  status,
  display,
  outputs,
  handleSelect,
  handleCancel,
  select,
  selectUser,
}) => {
  // const dispatch = useDispatch();
  // const history = useHistory();

  // const handleOpen = () => {
  //   dispatch(rootSlice.handleSearch({ control: true }));
  //   history.push(
  //     `/${index}/${
  //       index === "matters" || index === "resources" ? post.objectID : post.uid
  //     }`
  //   );
  // };

  return !outputs?.length ? (
    <div className={styles.item_outer}>
      {index !== "companys" && !select ? (
        <Menu index={index} post={post} user={user} postItem />
      ) : (
        post.uid !== user.uid && (
          <Follow
            user={user}
            post={post}
            select={select}
            selectUser={selectUser}
          />
        )
      )}

      {index === "matters" || index === "resources" ? (
        <Link
          to={`/${index}/${post.objectID}`}
          target="_blank"
          className={styles.item_btn}
        >
          <article className={styles.item}>
            <Post
              index={index}
              post={post}
              user={user}
              status={status}
              display={display}
            />
          </article>
        </Link>
      ) : (
        <Link
          to={`/${index}/${post.uid}`}
          target="_blank"
          className={`${styles.item_btn} ${select && styles.item_btn_disable}`}
        >
          <article className={`${styles.item} ${select && styles.item_select}`}>
            <User index={index} post={post} />
          </article>
        </Link>
      )}
    </div>
  ) : (
    <Outputs
      index={index}
      post={post}
      user={user}
      outputs={outputs}
      handleSelect={handleSelect}
      handleCancel={handleCancel}
    />
  );
};
