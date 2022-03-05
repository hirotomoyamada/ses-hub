import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/store";

import * as rootSlice from "../features/root/rootSlice";
import * as postSlice from "../features/post/postSlice";

import { Matter, Resource } from "types/post";
import { Company, Person } from "types/post";

interface PropTypes {
  index: "matters" | "resources" | "companys" | "persons";
  page:
    | "home"
    | "search"
    | "likes"
    | "outputs"
    | "entries"
    | "user"
    | "selectUser"
    | "bests";
}

export const usePosts = ({
  index,
  page,
}: PropTypes): [
  posts: Matter[] | Resource[] | Company[] | Person[] | undefined,
  hit:
    | {
        posts: number;
        pages: number;
        currentPage: number;
      }
    | undefined,
  control: boolean
] => {
  const dispatch = useDispatch();

  const posts = useSelector((state: RootState) =>
    postSlice.posts({
      state: state,
      page: page,
      index:
        page === "search"
          ? index
          : index === "matters" || index === "resources"
          ? index
          : "matters",
    })
  );

  const hit = useSelector((state: RootState) =>
    postSlice.hit({
      state: state,
      page: page,
      index:
        page === "search"
          ? index
          : index === "matters" || index === "resources"
          ? index
          : "matters",
    })
  );

  const control = useSelector((state: RootState) =>
    postSlice.control({
      state: state,
      index: index === "matters" || index === "resources" ? index : "matters",
    })
  );

  useEffect(() => {
    page === "home" &&
      (index === "companys" || index === "persons") &&
      dispatch(rootSlice.handleIndex("matters"));
  }, [dispatch, index, page]);

  useEffect(() => {
    dispatch(rootSlice.handlePage(page));
  }, [dispatch, page]);

  return [posts, hit, control];
};
