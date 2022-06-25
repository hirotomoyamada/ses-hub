import React, { useRef } from "react";
import styles from "./Side.module.scss";

import { Header } from "components/header/Header";
import { List } from "components/list/List";

import { Toggle } from "./components/Toggle";
import { Sort } from "./components/Sort";

import { User } from "types/user";
import { Matter, Resource, Company, Person } from "types/post";
import { Sort as SortType } from "features/root/initialState";

interface PropType {
  index: "matters" | "resources" | "companys" | "persons";
  main: React.RefObject<HTMLDivElement>;
  uid: string;
  user: User;
  posts:
    | (Matter | undefined)[]
    | (Resource | undefined)[]
    | (Company | undefined)[]
    | (Person | undefined)[]
    | undefined;
  hit:
    | {
        posts: number;
        pages: number;
        currentPage: number;
      }
    | undefined;
  sort: SortType;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Side: React.FC<PropType> = ({
  index,
  main,
  uid,
  user,
  posts,
  hit,
  sort,
  open,
  setOpen,
}) => {
  const side = useRef<HTMLDivElement>(null);

  return (
    <div>
      {index !== "persons" && (
        <Header index={index} uid={uid} user={user} side={side} main={main} />
      )}

      <div
        className={`${styles.side} ${open && styles.side_open} ${
          index === "persons" && styles.side_bests
        }`}
        ref={side}
      >
        <Toggle setOpen={setOpen} open={open} />

        <Sort index={index} uid={uid} user={user} sort={sort} />

        <List
          index={index}
          user={user}
          posts={posts}
          hit={hit}
          sort={
            user?.uid === uid && index !== "companys" && index !== "persons"
              ? sort
              : undefined
          }
          open={open}
          disable={index === "persons"}
          side
        />
      </div>
    </div>
  );
};
