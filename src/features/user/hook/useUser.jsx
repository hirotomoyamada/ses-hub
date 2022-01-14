import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";

import { fetchUser } from "../actions/fetchUser";

import * as rootSlice from "../../root/rootSlice";
import * as userSlice from "../userSlice";

export const useUser = (index, uid) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const history = useHistory();

  const currentUser = useSelector(userSlice.user);
  const selectUser = useSelector(userSlice.selectUser);
  const user =
    currentUser?.uid === uid
      ? currentUser
      : selectUser?.uid === uid && selectUser;

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(rootSlice.handlePage("user"));
  }, [dispatch, pathname]);

  useEffect(() => {
    currentUser?.payment?.status === "canceled" && currentUser?.uid !== uid && history.push("/plan");
  }, [currentUser, history, uid]);

  useEffect(() => {
    if (currentUser?.uid !== uid && selectUser?.uid !== uid) {
      dispatch(fetchUser({ index: index.user, uid: uid }));
    }

    if (
      (currentUser?.uid === uid && index.post === "persons") ||
      (selectUser?.uid === uid && index.post === "companys")
    ) {
      dispatch(rootSlice.handleIndex("matters"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, index.user, uid]);

  return [currentUser, user];
};
