import { createAsyncThunk } from "@reduxjs/toolkit";
import { functions, auth } from "../../../firebase";

export const createProfile = createAsyncThunk(
  "user/createProfile",
  async (data) => {
    const createProfile = functions.httpsCallable("sh-createProfile");

    const error = await createProfile(data)
      .then(async ({ data }) => {
        await auth.currentUser
          .updateProfile({
            displayName: data.displayName,
          })
          .catch((e) => {});
      })
      .catch((e) => {
        return e.message;
      });

    return error;
  }
);
