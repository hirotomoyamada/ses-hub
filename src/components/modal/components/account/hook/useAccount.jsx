import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import * as rootSlice from "../../../../../features/root/rootSlice";
import * as userSlice from "../../../../../features/user/userSlice";
import { createChild } from "../../../../../features/user/actions/createChild";
import { deleteChild } from "../../../../../features/user/actions/deleteChild";

export const useAccount = (uid, email) => {
  const dispatch = useDispatch();
  const token = useSelector(userSlice.token);

  const load = useSelector(rootSlice.load).create;

  const methods = useForm();

  const handleCreate = async (data) => {
    const user = {
      uid: uid,
      email: email.user,
      password: window.atob(token),
    };
    const selectUser = {
      email: data.email,
      password: data.password,
    };

    dispatch(createChild({ user: user, selectUser: selectUser }));

    methods.reset();
  };

  const handleDelete = async (data) => {
    const user = { email: email.user, password: window.atob(token) };
    const selectUser = { email: email.selectUser, password: data.password };

    dispatch(deleteChild({ user: user, selectUser: selectUser }));

    methods.reset();
  };

  return [load, methods, handleCreate, handleDelete];
};
