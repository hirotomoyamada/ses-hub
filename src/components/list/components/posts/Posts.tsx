import styles from "./Posts.module.scss";

import { useSelector } from "react-redux";
import * as userSlice from "features/user/userSlice";

import { Item } from "components/item/Item";
import { Advertise } from "../advertise/Advertise";

import { Matter, Resource } from "types/post";
import { Company, Person } from "types/post";

interface PropType {
  posts: Matter[] | Resource[] | Company[] | Person[];
  list: React.RefObject<HTMLDivElement>;
  index?: "matters" | "resources" | "companys" | "persons";
  select?: string[];
  selectUser?: (uid: string) => void;
  open?: boolean;
  side?: boolean;
  outputs?: Matter[] | Resource[];
  disable?: boolean;
  handleSelect?: (post: Matter | Resource) => void;
  handleCancel?: (objectID: string) => void;
}

export const Posts: React.FC<PropType> = ({
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
            key={
              (post as Matter | Resource).objectID
                ? (post as Matter | Resource).objectID
                : post.uid
            }
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
      user?.payment?.status &&
      user.payment.status === "canceled" &&
      index !== "companys"
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
