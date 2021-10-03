import { functions, db } from "../../../firebase";
import { handleAnnounce } from "../../user/userSlice";

const createCheckout = functions.httpsCallable("sh-createCheckout");

export const handleCheckout = ({ setLoad, priceId, user, dispatch, demo }) => {
  if (demo) {
    return;
  }

  setLoad({ checkout: true });
  createCheckout({
    priceId: priceId,
    url: {
      success: `${window.location.origin}/success`,
      cancel: window.location.href,
    },
  })
    .then(({ data }) => {
      db.collection("customers")
        .doc(user.uid)
        .collection("checkout_sessions")
        .doc(data)
        .onSnapshot((snap) => {
          const { error, url } = snap.data();
          if (error) {
            dispatch(
              handleAnnounce({
                type: "error",
                text: "アクセスに失敗しました 再度ページを更新してください",
              })
            );
            setLoad({ checkout: false });
          }

          if (url) {
            window.location.assign(url);
          }
        });
    })
    .catch((e) => {});
};
