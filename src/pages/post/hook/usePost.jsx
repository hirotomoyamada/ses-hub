import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { fetchPost } from "../../../features/post/actions/fetchPost";
import * as rootSlice from "../../../features/root/rootSlice";
import * as postSlice from "../../../features/post/postSlice";
import * as userSlice from "../../../features/user/userSlice";

export const usePost = (index, objectID) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const post = useSelector(postSlice.post);
  const bests = useSelector(postSlice.bests);
  const user = useSelector(userSlice.user);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(rootSlice.handlePage("post"));
  }, [dispatch, index, pathname]);

  useEffect(() => {
    dispatch(fetchPost({ index: index, objectID: objectID }));
  }, [dispatch, index, objectID, user.uid]);

  return [post, bests, user];
};
