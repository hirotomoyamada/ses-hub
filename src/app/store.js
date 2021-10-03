import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/post/postSlice";
import userReducer from "../features/user/userSlice";
import payReducer from "../features/pay/paySlice";

export const store = configureStore({
  reducer: {
    post: postReducer,
    user: userReducer,
    pay: payReducer,
  },
});
