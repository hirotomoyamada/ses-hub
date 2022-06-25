import { Dispatch, AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "app/store";

declare module "@reduxjs/toolkit" {
  type ArgAction<A extends object = object> = {
    type: string;
    meta: {
      arg: A;
    };
    error?: {
      name: string;
      message: string;
      stack: string;
      code: string;
    };
  };

  type ErrorAction = {
    type: string;
    meta: {
      arg: {
        index?: string;
        user?: {
          email: string;
          password: string;
          uid?: string;
        };
        selectUser: {
          email?: string;
          password: string;
          currentEmail?: string;
        };
      };
    };
    error: {
      name: string;
      message: string;
      stack: string;
      code: string;
    };
  };

  type OwnDispatch = Dispatch<AnyAction> &
    ThunkDispatch<RootState, null, AnyAction> &
    ThunkDispatch<RootState, undefined, AnyAction>;
}
