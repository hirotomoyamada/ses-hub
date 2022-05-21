import React, { useEffect, useState } from "react";
import styles from "./Analytics.module.scss";

import { useDispatch, useSelector } from "react-redux";

import * as rootSlice from "features/root/rootSlice";
import * as userSlice from "features/user/userSlice";

import { fetchAnalytics, fetchUser } from "features/user/actions";

import { Header } from "./components/header/Header";
import { Setting } from "./components/setting/Setting";
import { Account } from "./components/account/Account";
import { Charts } from "./components/charts/Charts";
import { Export } from "./components/export/Export";
import { Btn } from "./components/btn/Btn";

import { User } from "types/user";
import { Company } from "types/post";

interface PropType {
  user: User;
  handleClose: () => void;
}

export type Span = "total" | "day" | "week" | "month";

export type Sort = {
  self: boolean;
  others: boolean;
};

export const Analytics: React.FC<PropType> = ({ user, handleClose }) => {
  const dispatch = useDispatch();
  const [span, setSpan] = useState<Span>("day");
  const [sort, setSort] = useState<Sort>({ self: true, others: true });
  const [setting, setSetting] = useState<boolean>(false);
  const [uid, setUid] = useState<string>(user.uid);
  const selectUser = useSelector(userSlice.selectUser) as Company[];
  const analytics = useSelector(userSlice.analytics)?.[uid];
  const active = useSelector(rootSlice.setting)?.analytics?.active;
  const order = useSelector(rootSlice.setting)?.analytics?.order;
  const status = user?.payment?.status !== "canceled";
  const children = user?.payment?.children;

  useEffect(() => {
    dispatch(fetchAnalytics({ uid, span, active, order }));
  }, [dispatch, uid, span]);

  useEffect(() => {
    status &&
      analytics?.length &&
      !selectUser?.length &&
      children?.length &&
      dispatch(
        fetchUser({
          index: "companys",
          uids: children,
        })
      );
  }, [dispatch, user, status, children, analytics]);

  return (
    <div className={`${styles.analytics}`}>
      <Header
        span={span}
        sort={sort}
        setting={setting}
        setSpan={setSpan}
        setSort={setSort}
        setSetting={setSetting}
        handleClose={handleClose}
      />

      {!setting ? (
        <div className={`${styles.analytics_inner}`}>
          <Account
            user={user}
            selectUser={selectUser}
            uid={uid}
            setUid={setUid}
          />
          <Charts span={span} sort={sort} analytics={analytics} />
          <Export span={span} sort={sort} analytics={analytics} />
          <Btn
            setting={setting}
            setSetting={setSetting}
            analytics={analytics}
          />
        </div>
      ) : (
        <div className={styles.analytics_inner}>
          <Setting analytics={analytics} />
          <Btn setting={setting} setSetting={setSetting} />
        </div>
      )}
    </div>
  );
};
