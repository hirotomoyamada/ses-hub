import { auth } from "../../../../firebase";
import { createProfile } from "../../actions/createProfile";

import * as rootSlice from "../../../root/rootSlice";

export const handleCreate = async ({ dispatch, data }) => {
  if (
    !data.type ||
    !data.name ||
    !data.person ||
    (data.type === "individual" && !data.position) ||
    !data.tel ||
    !data.agree
  ) {
    dispatch(
      rootSlice.handleAnnounce({
        type: "error",
        text: "登録に失敗しました ページを更新してください",
      })
    );

    return;
  }

  const object = {
    type: data.type,
    name: data.name,
    person: data.person,
    position: data.type === "individual" ? data.position : "",
    postal: data.postal,
    address: data.address,
    tel: data.tel,
    agree: data.agree,
    provider: auth.currentUser.providerData[0].providerId,
    fetch: true,
  };

  dispatch(createProfile(object));
};
