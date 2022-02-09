import styles from "../List.module.scss";

import { useSelector } from "react-redux";
import * as userSlice from "../../../features/user/userSlice";

import { Item } from "../../item/Item";
import { Advertise } from "./advertise/Advertise";

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

  const createPosts = () => {
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

    if (user?.payment?.status === "canceled" && index !== "companys") {
      for (let i = 0; i < Math.floor(array?.length / 10) + 1; i++) {
        array.splice(i * 11, 0, <Advertise user={user} key={i * 11} />);
      }
    }

    return array;
  };

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
      {createPosts()}
    </div>
  );
};
