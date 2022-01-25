import styles from "./Side.module.scss";

import { useRef } from "react";

import { Header } from "../../../../components/header/Header";
import { Toggle } from "./components/Toggle";
import { Sort } from "./components/Sort";
import { List } from "../../../post/list/List";

export const Side = ({
  index,
  main,
  uid,
  currentUser,
  user,
  posts,
  hit,
  sort,
  open,
  setOpen,
}) => {
  const side = useRef();

  return (
    <div>
      {index !== "persons" && (
        <Header
          index={index}
          uid={uid}
          user={currentUser}
          side={side}
          main={main}
        />
      )}

      <div
        className={`${styles.side} ${open && styles.side_open} ${
          index === "persons" && styles.side_bests
        }`}
        ref={side}
      >
        <Toggle setOpen={setOpen} open={open} />

        <Sort uid={uid} user={currentUser} sort={sort} index={index} />

        <List
          index={index}
          user={user}
          posts={posts}
          hit={hit}
          sort={
            currentUser?.uid === uid &&
            index !== "companys" &&
            index !== "persons" &&
            sort
          }
          open={open}
          disable={index === "persons"}
          side
        />
      </div>
    </div>
  );
};
