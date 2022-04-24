import React, { useState, useEffect } from "react";
import styles from "../../Activity.module.scss";

import { useDispatch, useSelector } from "react-redux";

import * as rootSlice from "features/root/rootSlice";
import * as userSlice from "features/user/userSlice";

import { fetchActivity } from "features/user/actions";

import { Audio } from "react-loader-spinner";
import { Charts } from "./components/charts/Charts";
import { Csv } from "./components/csv/Csv";

import { Span, Sort } from "components/modal/components/activity/Activity";
import { Btn } from "./components/btn/Btn";

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
  const dispatch = useDispatch();
  const [uid, setUid] = useState<string>(user.uid);
  const activity = useSelector(userSlice.activity)?.[uid];
  const fetch = useSelector(rootSlice.load).fetch;
  const active = useSelector(rootSlice.setting)?.activity?.active;
  const order = useSelector(rootSlice.setting)?.activity?.order;

  useEffect(() => {
    dispatch(fetchActivity({ uid, span, active, order }));
  }, [dispatch, uid, span]);

  return !setting && !fetch ? (
    <div className={`${styles.activity_inner} ${styles.activity_inner_user}`}>
      <Charts span={span} sort={sort} activity={activity} />
      <Csv span={span} sort={sort} />
      <Btn setting={setting} setSetting={setSetting} />
    </div>
  ) : fetch ? (
    <div className={`${styles.activity_inner} ${styles.activity_fetch}`}>
      <Audio color="#49b757" height={48} width={48} />
    </div>
  ) : (
    <div className={styles.activity_inner}>
      <Setting activity={activity} />
      <Btn setting={setting} setSetting={setSetting} />
    </div>
  );
};
