import styles from "../List.module.scss";

import Loader from "react-loader-spinner";

import { useSelector } from "react-redux";
import * as rootSlice from "../../../root/rootSlice";

export const NotFound = ({
  index,
  list,
  type,
  sort,
  select,
  disable,
  side,
}) => {
  const load = useSelector(rootSlice.load).list;

  return (
    <div
      className={`
      ${styles.list_none} 
      ${type && styles.list_none_type} 
      ${sort && styles.list_none_sort} 
      ${!sort && side && styles.list_none_side} 
      ${select && styles.list_none_select} 
      ${disable && styles.list_none_disable} 
      ${disable && side && styles.list_none_bests_companys}`}
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
            : index === "persons" && "フリーランス情報がありません"}
        </span>
      )}
    </div>
  );
};
