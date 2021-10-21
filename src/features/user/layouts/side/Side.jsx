import styles from "./Side.module.scss";

import { useRef } from "react";

import { Header } from "../../../../components/header/Header";
import { Toggle } from "./components/Toggle";
import { Sort } from "./components/Sort";
import { List } from "../../../post/list/List";
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
          sort={sort}
          open={open}
          bests={index === "persons" && true}
          companys
        />

        <Fetch user />
      </div>
    </div>
  );
};
