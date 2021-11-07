import { auth } from "../../../../firebase";
import { createProfile } from "../../actions/createProfile";

import * as rootSlice from "../../../root/rootSlice";

export const handleCreate = async ({ dispatch, data }) => {
  if (
    // !data.type || // ver 2.0.0
    !data.name ||
    !data.person ||
    // (data.type === "individual" && !data.position) || ver 2.0.0
    // ------ 削除予定 ------
    !data.position ||
    // ------ 削除予定 ------
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
    // type: data.type, // ver 2.0.0
    // ------ 削除予定 ------
    type: "individual",
    // ------ 削除予定 ------
    name: data.name,
    person: data.person,
    // position: data.type === "individual" ? data.position : "", // ver 2.0.0
    // ------ 削除予定 ------
    position: data.position,
    // ------ 削除予定 ------
    postal: data.postal,
    address: data.address,
    tel: data.tel,
    agree: data.agree,
    provider: auth.currentUser.providerData[0].providerId,
    fetch: true,
  };

  dispatch(createProfile(object));
};
