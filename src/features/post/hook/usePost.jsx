import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";

import { fetchPost } from "../actions/fetchPost";
import * as rootSlice from "../../root/rootSlice";
import * as postSlice from "../postSlice";
import * as userSlice from "../../user/userSlice";

export const usePost = (index, objectID) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const history = useHistory();

  const post = useSelector(postSlice.post);
  const bests = useSelector(postSlice.bests);
  const user = useSelector(userSlice.user);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(rootSlice.handlePage("post"));
  }, [dispatch, index, pathname]);

  useEffect(() => {
    !user?.posts?.[index]?.includes(objectID) &&
      user.payment.status === "canceled" &&
      history.push("/plan");
  }, [history, index, objectID, user]);

  useEffect(() => {
    dispatch(fetchPost({ index: index, objectID: objectID }));
  }, [dispatch, index, objectID, user.uid]);

  return [post, bests, user];
};
