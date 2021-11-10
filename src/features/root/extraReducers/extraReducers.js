import { load } from "./load";
import { auth } from "./auth";
import { user } from "./user";
import { post } from "./post";
import { modal } from "./modal";
import { announce } from "./announce";

export const extraReducers = (builder) => {
  load(builder);
  modal(builder);
  announce(builder);

  auth(builder);
  user(builder);
  post(builder);
};
