import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import rootReducer from "features/root/rootSlice";
import postReducer from "features/post/postSlice";
import userReducer from "features/user/userSlice";
import payReducer from "features/pay/paySlice";

export const store = configureStore({
  reducer: {
    root: rootReducer,
    post: postReducer,
    user: userReducer,
    pay: payReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["root/handleModal", "post/deletePost"],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
