import { useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import * as rootSlice from "../../../features/root/rootSlice";
import * as userSlice from "../../../features/user/userSlice";

export const useAccount = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(userSlice.user);
  const status = user.payment.status !== "canceled";
  // const account = user.payment.account;
  const account = 19;
  // const children = user.children;
  const children = [];

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

  return [user, status, account, children];
};
