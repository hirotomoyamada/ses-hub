import styles from "../List.module.scss";

import { Item } from "../../item/Item";

export const Posts = ({
  index,
  posts,
  user,
  list,
  select,
  selectUser,
  open,
  companys,
  outputs,
  handleSelect,
  handleCancel,
}) => {
  return (
    <div
      className={`${styles.list} ${companys && styles.list_companys} ${
        open && styles.list_companys_open
      } ${select && styles.list_select}`}
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
            />
          )
      )}
    </div>
  );
};
