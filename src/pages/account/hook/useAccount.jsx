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
  const parent = user.type === "parent";
  const children = useSelector(userSlice.selectUser);
  const status = user?.payment?.status !== "canceled";
  const account = user?.payment?.account - 1;
  const load = useSelector(rootSlice.load).fetch;

  useEffect(() => {
    status &&
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

  useEffect(() => {
    !parent
      ? history.push("/setting")
      : !status &&
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
  }, [dispatch, history, parent, status]);

  return [user, status, account, children, load];
};
