import styles from "../List.module.scss";

import Loader from "react-loader-spinner";

import { useSelector } from "react-redux";
import * as rootSlice from "../../../root/rootSlice";

export const NotFound = ({
  index,
  user,
  list,
  type,
  sort,
  select,
  disable,
  home,
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
            ? !home && !sort
              ? "案件情報がありません"
              : "あなたの登録した案件情報はありません"
            : select
            ? user?.payment?.status !== "canceled"
              ? "フォローしているユーザーがいません"
              : "現在のプランでは、ユーザーをフォローできません"
            : index === "resources"
            ? !home && !sort
              ? "人材情報がありません"
              : "あなたの登録した人材情報はありません"
            : index === "companys"
            ? !side
              ? "メンバー情報がありません"
              : "フォローしているユーザーがいません"
            : index === "persons" && "フリーランス情報がありません"}
        </span>
      )}
    </div>
  );
};
