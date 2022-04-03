import styles from "./NotFound.module.scss";

import { Oval } from "react-loader-spinner";

import { useSelector } from "react-redux";
import * as rootSlice from "features/root/rootSlice";

import { User } from "types/user";

interface PropType {
  user: User;
  list: React.RefObject<HTMLDivElement>;
  index?: "matters" | "resources" | "companys" | "persons";
  type?: "likes" | "outputs" | "entries";
  sort?: {
    status: string | null;
    display: string | null;
    control: boolean;
  };
  select?: string[];
  disable?: boolean;
  home?: boolean;
  side?: boolean;
}

export const NotFound: React.FC<PropType> = ({
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
      ${styles.none} 
      ${type && styles.none_type} 
      ${sort && styles.none_sort} 
      ${!sort && side && styles.none_side} 
      ${select && styles.none_select} 
      ${disable && styles.none_disable} 
      ${disable && side && styles.none_bests_companys}`}
      ref={list}
    >
      {load ? (
        <Oval color="#49b757" height={56} width={56} />
      ) : (
        <span className={styles.none_message}>
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
