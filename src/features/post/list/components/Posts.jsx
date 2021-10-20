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
  bests,
  handleSelect,
  handleCancel,
}) => {
  return (
    <div
      className={`${styles.list} ${companys && styles.list_companys} ${
        open && styles.list_companys_open
      } ${select && styles.list_select} ${
        bests && !companys && styles.list_bests
      }`}
      ref={list}
    >
      {companys && index === "persons" && (
        <span className={styles.list_tag}>こんなエンジニアもオススメ</span>
      )}

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
