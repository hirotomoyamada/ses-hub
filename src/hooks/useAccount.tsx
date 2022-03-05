import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as rootSlice from "features/root/rootSlice";
import * as userSlice from "features/user/userSlice";
import { fetchUser } from "features/user/actions";

import { Company } from "types/post";
import { User } from "types/user";

export const useAccount = (): [
  user: User,
  status: boolean,
  account: number,
  children: Company[],
  load: boolean
] => {
  const dispatch = useDispatch();
  const user = useSelector(userSlice.user);
  const children = useSelector(userSlice.selectUser) as Company[];
  const status = user?.payment?.status !== "canceled";
  const account = user?.payment?.account ? user.payment.account - 1 : 0;
  const load = useSelector(rootSlice.load).fetch;

  useEffect(() => {
    !children.length &&
      user?.payment?.children?.length &&
      dispatch(
        fetchUser({
          index: "companys",
          uids: user?.payment?.children,
          fetch: true,
        })
      );
  }, [children, dispatch, status, user]);

  return [user, status, account, children, load];
};
