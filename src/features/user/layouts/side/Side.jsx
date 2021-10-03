import styles from "./Side.module.scss";

import { useRef } from "react";

import { Header } from "./components/Header";
import { Toggle } from "./components/Toggle";
import { Sort } from "./components/Sort";
import { List } from "./components/List";
import { Fetch } from "../../../../components/load/Load";

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
      <Header
        index={index}
        uid={uid}
        user={currentUser}
        side={side}
        main={main}
      />

      <div className={`${styles.side} ${!open && styles.side_open}`} ref={side}>
        <Toggle setOpen={setOpen} open={open} />

        <Sort uid={uid} user={currentUser} sort={sort} index={index} />

        <List
          index={index}
          user={user}
          currentUser={currentUser}
          posts={posts}
          hit={hit}
          sort={sort}
          open={open}
        />

        <Fetch user />
      </div>
    </div>
  );
};
