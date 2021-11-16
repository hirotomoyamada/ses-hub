import { functions } from "../../../firebase";

export const updatePayment = (state, action) => {
  if (action.payload === "notice") {
    state.user.payment.notice = false;

    const disableNotice = functions.httpsCallable("sh-disableNotice");
    disableNotice().catch((e) => {});
  } else {
    state.user.payment = {
      status: action.payload.status,
      option: action.payload.option,
      price: action.payload.price,
      account: action.payload.account,
      children: action.payload.children,
      end: action.payload.end,
      notice: action.payload.notice,
      cancel: action.payload.cancel,
      trial: action.payload.trial,
      load: action.payload.load,
    };
  }
};
