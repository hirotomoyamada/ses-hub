import { useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import * as rootSlice from "../../../features/root/rootSlice";
import * as userSlice from "../../../features/user/userSlice";
import { fetchUser } from "../../../features/user/actions/fetchUser";

export const useAccount = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(userSlice.user);
  const children = useSelector(userSlice.selectUser);
  const status = user?.payment?.status !== "canceled";
  const account = user?.payment?.account - 1;
  const load = useSelector(rootSlice.load).fetch;

  useEffect(() => {}, []);

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
  }, [children, dispatch, user?.payment?.children]);

  useEffect(() => {
    !status &&
      dispatch(
        rootSlice.handleModal({
          type: "advertise",
          text: "まだプランが選択されていません",
          close: () => {
            dispatch(rootSlice.handleModal());
            history.push("/setting");
          },
        })
      );
  }, [dispatch, history, status]);

  return [user, status, account, children, load];
};
