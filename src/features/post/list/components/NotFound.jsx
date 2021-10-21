import styles from "../List.module.scss";

import Loader from "react-loader-spinner";

import { useSelector } from "react-redux";
import * as rootSlice from "../../../root/rootSlice";

export const NotFound = ({ index, list, type, select, bests, companys }) => {
  const load = useSelector(rootSlice.load).list;

  return (
    <div
      className={`${styles.list_none} ${
        (type || companys) && !bests && styles.list_none_type
      } ${select && styles.list_none_select} ${
        bests && styles.list_none_bests
      } ${bests && companys && styles.list_none_bests_companys}`}
      ref={list}
    >
      {load ? (
        <Loader type="Oval" color="#49b757" height={56} width={56} />
      ) : (
        <span className={styles.list_none_message}>
          {index === "matters"
            ? "案件情報がありません"
            : select
            ? "フォローしているユーザーがいません"
            : index === "resources"
            ? "人材情報がありません"
            : index === "companys"
            ? "メンバー情報がありません"
            : index === "persons" && "エンジニア情報がありません"}
        </span>
      )}
    </div>
  );
};
