import styles from "./Request.module.scss";

import { useDispatch } from "react-redux";
import * as rootSlice from "../../features/root/rootSlice";

export const Request = ({ user }) => {
  const dispatch = useDispatch();
  const request = user.request;

  console.log(user.request);

  const handleRequest = () => {
    if (request !== "none") {
      return;
    }

    dispatch(rootSlice.handleModal({ type: "request" }));
  };

  return (
    <button
      type="button"
      onClick={handleRequest}
      className={`${styles.request} ${
        request === "enable" && styles.request_enable
      } ${request !== "none" && styles.request_none}`}
    >
      {request === "enable"
        ? "承認済み"
        : request === "hold"
        ? "リクエスト済み"
        : request === "none" && "リクエストする"}
    </button>
  );
};
