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
  companys,
  outputs,
  bests,
  handleSelect,
  handleCancel,
}) => {
  const user = useSelector(userSlice.user);
  
  return (
    <div
      className={`${styles.list} ${companys && styles.list_companys} ${
        open && styles.list_companys_open
      } ${select && styles.list_select} ${
        bests && !companys && styles.list_bests
      } ${bests && companys && styles.list_bests_companys}`}
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
