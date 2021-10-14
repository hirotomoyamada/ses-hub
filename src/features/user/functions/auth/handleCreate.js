import { auth } from "../../../../firebase";
import { createProfile } from "../../actions/createProfile";
import * as rootSlice from "../../../root/rootSlice";

export const handleCreate = async ({ dispatch, data }) => {
  const object = {
    name: data.name,
    person: data.person,
    position: data.position,
    postal: data.postal,
    address: data.address,
    tel: data.tel,
    agree: data.agree,
    provider: auth.currentUser.providerData[0].providerId,
  };
  try {
    dispatch(createProfile(object));
  } catch (e) {
    dispatch(
      rootSlice.handleAnnounce({
        type: "error",
        text: "更新に失敗しました",
      })
    );
  }
};
