import React from "react";
import styles from "../Side.module.scss";

import FilterListIcon from "@material-ui/icons/FilterList";

import { useDispatch } from "react-redux";
import * as rootSlice from "features/root/rootSlice";

import { User } from "types/user";
import { Sort as SortType } from "features/root/initialState";

interface PropType {
  index: "matters" | "resources" | "companys" | "persons";
  user: User;
  sort: SortType;
  uid: string;
}

export const Sort: React.FC<PropType> = ({ index, user, sort, uid }) => {
  const dispatch = useDispatch();

  return (index === "matters" || index === "resources") && user?.uid === uid ? (
    <div className={styles.side_sort}>
      <div className={styles.side_sort_inner}>
        <select
          className={styles.side_sort_select}
          onChange={(e) =>
            dispatch(rootSlice.handleSort({ status: e.target.value }))
          }
          defaultValue={sort.status ? sort.status : "reset"}
        >
          <option value="reset">すべて</option>
          <option value="新規">新規</option>
          <option value="提案中">提案中</option>
          <option value="面談中">面談中</option>
          <option value="保留中">保留中</option>
          <option value="フォロー中">フォロー中</option>
          <option value="成約">成約</option>
        </select>
        <FilterListIcon className={styles.side_sort_icon} />
      </div>

      <div className={styles.side_sort_inner}>
        <select
          className={styles.side_sort_select}
          onChange={(e) =>
            dispatch(rootSlice.handleSort({ display: e.target.value }))
          }
          defaultValue={sort.display ? sort.display : "reset"}
        >
          <option value="reset">公開・非公開</option>
          <option value="public">公開</option>
          <option value="private">非公開</option>
        </select>
        <FilterListIcon className={styles.side_sort_icon} />
      </div>
    </div>
  ) : (
    <></>
  );
};
