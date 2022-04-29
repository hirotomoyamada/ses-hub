import React, { useState, useEffect } from "react";
import styles from "../../Activity.module.scss";

import { useDispatch, useSelector } from "react-redux";

import * as rootSlice from "features/root/rootSlice";
import * as userSlice from "features/user/userSlice";

import { fetchActivity, fetchUser } from "features/user/actions";

import { Charts } from "./components/charts/Charts";
import { Csv } from "./components/csv/Csv";

import { Span, Sort } from "components/modal/components/activity/Activity";
import { Btn } from "./components/btn/Btn";

import { User as UserType } from "types/user";
import { Setting } from "./components/setting/Setting";
import { Account } from "./components/account/Account";
import { Company } from "types/post";

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
  const selectUser = useSelector(userSlice.selectUser) as Company[];
  const [uid, setUid] = useState<string>(user.uid);
  const activity = useSelector(userSlice.activity)?.[uid];
  const active = useSelector(rootSlice.setting)?.activity?.active;
  const order = useSelector(rootSlice.setting)?.activity?.order;
  const status = user?.payment?.status !== "canceled";
  const children = user?.payment?.children;

  useEffect(() => {
    dispatch(fetchActivity({ uid, span, active, order }));
  }, [dispatch, uid, span]);

  useEffect(() => {
    status &&
      activity?.length &&
      !selectUser?.length &&
      children?.length &&
      dispatch(
        fetchUser({
          index: "companys",
          uids: children,
        })
      );
  }, [dispatch, user, status, children, activity]);

  return !setting ? (
    <div className={`${styles.activity_inner} ${styles.activity_inner_user}`}>
      <Account user={user} selectUser={selectUser} uid={uid} setUid={setUid} />
      <Charts span={span} sort={sort} activity={activity} />
      <Csv span={span} sort={sort} activity={activity} />
      <Btn setting={setting} setSetting={setSetting} activity={activity} />
    </div>
  ) : (
    <div className={styles.activity_inner}>
      <Setting activity={activity} />
      <Btn setting={setting} setSetting={setSetting} />
    </div>
  );
};
