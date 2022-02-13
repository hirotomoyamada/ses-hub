import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as rootSlice from "../features/root/rootSlice";
import * as postSlice from "../features/post/postSlice";

export const usePosts = ({ index, page }) => {
  const dispatch = useDispatch();

  const posts = useSelector((state) =>
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

  const hit = useSelector((state) =>
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

  const control = useSelector((state) =>
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

  return { posts, hit, control };
};
