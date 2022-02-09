import { functions } from "../../../firebase";

const createPortal = functions.httpsCallable(
  "ext-firestore-stripe-subscriptions-createPortalLink"
);

export const handlePortal = ({ setLoad, demo }) => {
  if (demo) {
    return;
  }

  setLoad({ portal: true });
  createPortal({ returnUrl: window.location.href })
    .then(({ data }) => {
      window.location.assign(data.url);
    })
    .catch((e) => {});
};
