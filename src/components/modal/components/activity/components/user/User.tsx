import React from "react";
import styles from "../../Activity.module.scss";

import { useSelector } from "react-redux";

import { Charts } from "./components/charts/Charts";
import { Csv } from "./components/csv/Csv";

import { Span, Sort } from "components/modal/components/activity/Activity";
import { Btn } from "./components/btn/Btn";
import * as userSlice from "features/user/userSlice";

import { User as UserType } from "types/user";
import { Setting } from "./components/setting/Setting";

interface PropType {
  user: UserType;
  span: Span;
  sort: Sort;
  setting: boolean;
  setSetting: React.Dispatch<React.SetStateAction<boolean>>;
}

export const User: React.FC<PropType> = ({
  user,
  span,
  sort,
  setting,
  setSetting,
}) => {
  const activity = useSelector(userSlice.activity);

  return !setting ? (
    <div className={`${styles.activity_inner} ${styles.activity_inner_user}`}>
      <Charts span={span} sort={sort} activity={activity} />
      <Csv span={span} sort={sort} />
      <Btn setting={setting} setSetting={setSetting} />
    </div>
  ) : (
    <div className={styles.activity_inner}>
      <Setting activity={activity} />
      <Btn setting={setting} setSetting={setSetting} />
    </div>
  );
};
