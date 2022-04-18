import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { fetchUser } from "features/user/actions";

import * as rootSlice from "features/root/rootSlice";
import * as userSlice from "features/user/userSlice";
import { Company, Person } from "types/post";
import { User } from "types/user";

export const useUser = (
  index: {
    user: "companys" | "persons";
    post?: "matters" | "resources" | "companys" | "persons";
  },
  uid?: string
): [currentUser: User, user: User | Company | Person] => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const currentUser = useSelector(userSlice.user);
  const selectUser = useSelector(userSlice.selectUser) as Company | Person;

  const user = currentUser?.uid === uid ? currentUser : selectUser;

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(rootSlice.handlePage("user"));
  }, [dispatch, pathname]);

  useEffect(() => {
    if (currentUser?.uid !== uid && selectUser?.uid !== uid) {
      dispatch(fetchUser({ index: index.user, uid: uid }));
    }

    if (
      (currentUser?.uid === uid && index.post === "persons") ||
      (selectUser?.uid === uid && index.post === "companys") ||
      (currentUser?.payment?.status === "canceled" && index.post === "companys")
    ) {
      dispatch(rootSlice.handleIndex("matters"));
    }
  }, [dispatch, index.user, uid]);

  return [currentUser, user];
};
