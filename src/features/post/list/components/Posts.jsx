import styles from "../List.module.scss";

import { useSelector } from "react-redux";
import * as userSlice from "../../../user/userSlice";

import { Item } from "../../item/Item";

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

  return (
    <div
      className={`
      ${styles.list} 
      ${side && styles.list_side} 
      ${open && styles.list_side_open} 
      ${select && styles.list_select}
      ${disable && !side && styles.list_disable} 
      ${disable && side && styles.list_disable_side}
      `}
      ref={list}
    >
      {posts.map(
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
      )}
    </div>
  );
};
