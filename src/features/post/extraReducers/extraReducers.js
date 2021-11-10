import { post } from "./post";
import { user } from "./user";
import { root } from "./root";
import { auth } from "./auth";

export const extraReducers = (builder) => {
  post(builder);
  root(builder);
  auth(builder);
  user(builder);
};
