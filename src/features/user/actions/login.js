import { createAsyncThunk } from "@reduxjs/toolkit";
import { functions, auth } from "../../../firebase";

export const login = createAsyncThunk("user/login", async (data) => {
  const login = functions.httpsCallable("sh-login");

  const user = await login({
    emailVerified: data.emailVerified,
    providerData: data.providerData,
  })
    .then(({ data }) => {
      return data;
    })
    .catch((e) => {
      if (e.details === "auth") {
        auth.signOut();
      }

      if (e.details === "emailVerified") {
        return {
          emailVerified: true,
        };
      }

      if (e.details === "profile") {
        return {
          profileVerified: true,
        };
      }

      if (e.details === "hold") {
        return {
          statusVerified: "hold",
        };
      }

      if (e.details === "disable") {
        return {
          statusVerified: "disable",
        };
      }
    });

  return user;
});
