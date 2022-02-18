import styles from "./Posts.module.scss";

import { useSelector } from "react-redux";
import * as userSlice from "../../../../features/user/userSlice";

import { Item } from "../../../../components/item/Item";
import { Advertise } from "../advertise/Advertise";

export const Posts = ({
  index,
  posts,
  list,
  select,
  selectUser,
  open,
  side,
  outputs,
  disable,
  handleSelect,
  handleCancel,
}) => {
  const user = useSelector(userSlice.user);

  const createPosts = (() => {
    const array = posts?.map(
      (post) =>
        post && (
          <Item
            key={post.objectID ? post.objectID : post.uid}
            index={index}
            post={post}
            user={user}
            select={select}
            selectUser={selectUser}
            outputs={outputs}
            handleSelect={handleSelect}
            handleCancel={handleCancel}
            status={side}
            display={side}
          />
        )
    );

    if (
      user?.payment?.status === "canceled" &&
      index !== "companys" &&
      !select
    ) {
      for (let i = 0; i < Math.floor(array?.length / 10) + 1; i++) {
        array.splice(i * 11, 0, <Advertise user={user} key={i * 11} />);
      }
    }

    return array;
  })();

  return (
    <div
      className={`
      ${styles.posts} 
      ${side && styles.posts_side} 
      ${open && styles.posts_side_open} 
      ${select && styles.posts_select}
      ${disable && !side && styles.posts_disable} 
      ${disable && side && styles.posts_disable_side}
      `}
      ref={list}
    >
      {createPosts}
    </div>
  );
};
