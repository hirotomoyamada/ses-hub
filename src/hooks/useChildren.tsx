import { useDispatch, useSelector } from "react-redux";
import { useForm, SubmitHandler, UseFormReturn } from "react-hook-form";

import * as rootSlice from "features/root/rootSlice";
import * as userSlice from "features/user/userSlice";

import { createChild } from "features/user/actions";
import { deleteChild } from "features/user/actions";
import { changeEmailChild } from "features/user/actions";

export type Data = {
  email: string;
  password: string;
  verifiedPassword: string;
};

export const useChildren = (
  uid: { user: string; selectUser: string },
  email: { user: string; selectUser: string }
): [
  load: boolean,
  methods: UseFormReturn<Data>,
  handleCreate: SubmitHandler<Data>,
  handleEmail: SubmitHandler<Data>,
  handleDelete: SubmitHandler<Data>
] => {
  const dispatch = useDispatch();
  const token = useSelector(userSlice.token);

  const load = useSelector(rootSlice.load).create;

  const methods = useForm<Data>();

  const handleCreate: SubmitHandler<Data> = (data) => {
    if (token) {
      const user = {
        uid: uid.user,
        email: email.user,
        password: window.atob(token),
      };

      const selectUser = {
        email: data.email,
        password: data.password,
      };

      dispatch(createChild({ user: user, selectUser: selectUser }));
    }

    methods.reset({
      email: data.email,
      password: undefined,
      verifiedPassword: undefined,
    });
  };

  const handleEmail: SubmitHandler<Data> = (data) => {
    if (token) {
      const user = {
        email: email.user,
        password: window.atob(token),
      };
      const selectUser = {
        currentEmail: email.selectUser,
        email: data.email,
        password: data.password,
      };

      dispatch(changeEmailChild({ user: user, selectUser: selectUser }));
    }

    methods.reset();
  };

  const handleDelete: SubmitHandler<Data> = (data) => {
    if (token) {
      const user = { email: email.user, password: window.atob(token) };
      const selectUser = { email: email.selectUser, password: data.password };

      dispatch(deleteChild({ user: user, selectUser: selectUser }));
    }

    methods.reset();
  };

  return [load, methods, handleCreate, handleEmail, handleDelete];
};
