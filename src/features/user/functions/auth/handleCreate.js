import { auth } from "../../../../firebase";
import { createProfile } from "../../actions/createProfile";

export const handleCreate = async ({ dispatch, data }) => {
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
  };

  dispatch(createProfile(object));
};
