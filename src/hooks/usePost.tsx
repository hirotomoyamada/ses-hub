import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { fetchPost } from "features/post/actions";
import * as rootSlice from "features/root/rootSlice";
import * as postSlice from "features/post/postSlice";
import * as userSlice from "features/user/userSlice";

import { Matter, Resource } from "types/post";
import { User } from "types/user";

export const usePost = (
  index: "matters" | "resources",
  objectID?: string
): [post: Matter | Resource, bests: Matter[] | Resource[], user: User] => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const post = useSelector(postSlice.post) as Matter | Resource;
  const bests = useSelector(postSlice.bests) as Matter[] | Resource[];
  const user = useSelector(userSlice.user);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(rootSlice.handlePage("post"));
  }, [dispatch, index, pathname]);

  useEffect(() => {
    objectID && dispatch(fetchPost({ index: index, objectID: objectID }));
  }, [dispatch, index, objectID, user.uid]);

  return [post, bests, user];
};
