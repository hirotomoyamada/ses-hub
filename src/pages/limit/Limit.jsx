import styles from "./Limit.module.scss";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useScrollController } from "../../hook/useScrollController";

import * as rootSlice from "../../features/root/rootSlice";

export const Limit = ({ user }) => {
  useScrollController();

  const dispatch = useDispatch();
  const history = useHistory();

  const handlePlan = () => {
    dispatch(rootSlice.handleLimit(false));
    history.push("/plan");
  };

  return (
    <div className={styles.limit}>
      <div className={styles.limit_inner}>
        <div className={styles.limit_header}>
          <span>
            閲覧回数の&nbsp;<span className={styles.limit_acnt}>上限</span>
            &nbsp;に達しました
          </span>
          <span>
            この投稿を閲覧するには&nbsp;
            <span className={styles.limit_plan}>プラン</span>
            &nbsp;の加入が必要です
          </span>
        </div>

        <figure className={styles.limit_figure}>
          <span className={styles.limit_desc}>
            {user?.payment?.trial
              ? "\\ キャンペーン中 /"
              : "\\ メンバーたちと一緒に /"}
          </span>

          <p className={styles.limit_ttl}>
            {user?.payment?.trial
              ? "フリートライアル"
              : "案件・人材を共有しませんか？"}
          </p>
          <img
            src={`${process.env.PUBLIC_URL}/img/app/advertise.svg`}
            alt=""
            className={styles.limit_img}
          />
        </figure>

        <button type="button" onClick={handlePlan} className={styles.limit_btn}>
          プランを見る
        </button>
      </div>
    </div>
  );
};
