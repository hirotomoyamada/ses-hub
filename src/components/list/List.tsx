import React from "react";
import styles from "./List.module.scss";

import { useScrollFetch } from "hooks/useScrollFetch";

import { Posts } from "./components/posts/Posts";
import { NotFound } from "./components/notFound/NotFound";
import { Load } from "./components/load/Load";

import { Matter, Resource, Company, Person } from "types/post";
import { User } from "types/user";
import { Search, Sort } from "features/root/initialState";

interface PropType {
  user: User;
  index?: "matters" | "resources" | "companys" | "persons";
  posts?:
    | (Matter | undefined)[]
    | (Resource | undefined)[]
    | (Company | undefined)[]
    | (Person | undefined)[];
  hit?: {
    posts: number;
    pages: number;
    currentPage: number;
  };
  type?: "likes" | "outputs" | "entries";
  search?: Search;
  sort?: Sort;
  home?: boolean;
  side?: boolean;
  open?: boolean;
  disable?: boolean;
  select?: string[];
  selectUser?: (uid: string) => void;
  outputs?: Matter[] | Resource[];
  handleSelect?: (post: Matter | Resource) => void;
  handleCancel?: (objectID: string) => void;
}

export const List: React.FC<PropType> = ({
  index,
  posts,
  hit,
  user,
  selectUser,
  home,
  search,
  side,
  sort,
  type,
  outputs,
  select,
  disable,
  open,
  handleSelect,
  handleCancel,
}) => {
  const [list, load, page] = useScrollFetch({
    index,
    hit,
    user,
    home,
    search,
    side,
    sort,
    type,
    select,
    disable,
  });

  return (
    <div className={select && styles.list}>
      {side && index === "persons" && (
        <span className={styles.list_tag}>こんなフリーランスもオススメ</span>
      )}

      {posts?.length ? (
        <Posts
          index={index}
          posts={posts}
          list={list}
          select={select}
          selectUser={selectUser}
          open={open}
          side={side}
          outputs={outputs}
          disable={disable}
          handleSelect={handleSelect}
          handleCancel={handleCancel}
        />
      ) : (
        <NotFound
          index={index}
          user={user}
          list={list}
          type={type}
          sort={sort}
          select={select}
          disable={disable}
          home={home}
          side={side}
        />
      )}

      {hit?.pages && hit?.pages !== 1 && page < hit?.pages ? (
        <Load load={load} page={page} hit={hit} disable={disable} />
      ) : (
        <></>
      )}
    </div>
  );
};
