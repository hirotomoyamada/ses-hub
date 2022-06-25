import React from "react";
import { OwnDispatch } from "@reduxjs/toolkit";
import {
  fetchPosts,
  homePosts,
  userPosts,
  extractPosts,
} from "features/post/actions";

import { User } from "types/user";
import { Search, Sort } from "features/root/initialState";

export const createObserver = (
  list: React.RefObject<HTMLDivElement>,
  disable: boolean | undefined,
  hit:
    | {
        posts: number;
        pages: number;
        currentPage: number;
      }
    | undefined,
  page: number,
  setPage: React.Dispatch<React.SetStateAction<number>>,
  intersecting: boolean,
  setIntersecting: React.Dispatch<React.SetStateAction<boolean>>
): IntersectionObserver | undefined => {
  const listHeight = Number(
    JSON.stringify(list?.current?.getBoundingClientRect().height)
  );

  const innerHeight = window.innerHeight + 100;

  if (!disable && listHeight > innerHeight) {
    return new IntersectionObserver(
      ([results]) => {
        if (results.isIntersecting && !intersecting) {
          if (hit && page < hit.pages) {
            setIntersecting(true);
          }
          setPage((prevPage) => prevPage + 1);
        }
      },
      {
        rootMargin: `0px 0px ${innerHeight}px 0px`,
      }
    );
  }

  return;
};

export const fetchScroll = async (
  dispatch: OwnDispatch,
  index: "matters" | "resources" | "companys" | "persons" | undefined,
  user: User,
  home: boolean | undefined,
  search: Search | undefined,
  side: boolean | undefined,
  sort: Sort | undefined,
  type: "likes" | "outputs" | "entries" | undefined,
  select: string[] | undefined,
  page: number
): Promise<void> => {
  if (search && index) {
    await dispatch(
      fetchPosts({
        index: index,
        value: search.value,
        target: search.target,
        type: search.type,
        page: page,
      })
    );
  }

  if (home && (index === "matters" || index === "resources")) {
    await dispatch(
      homePosts({
        index: index,
        follows: [user.uid, ...user.home],
        page: page,
      })
    );
  }

  if (
    (side || select) &&
    (index === "matters" || index === "resources" || index === "companys")
  ) {
    await dispatch(
      userPosts({
        index: !select ? index : "companys",
        uid: user?.uid,
        uids: (index === "companys" || select) && user?.follows,
        status: !select && sort && sort.status ? sort.status : undefined,
        display: !select && sort && sort.display ? sort.display : undefined,
        page: page,
      })
    );
  }

  if (type && index && index !== "companys") {
    await dispatch(
      extractPosts({
        index: index,
        objectIDs:
          type === "likes"
            ? user.likes[index]
            : type === "outputs" && index !== "persons"
            ? user.outputs[index]
            : type === "entries"
            ? user.entries[index]
            : undefined,
        type: type,
        page: page,
      })
    );
  }
};
