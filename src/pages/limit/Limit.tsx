import React from 'react';
import styles from './Limit.module.scss';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useResize } from 'hooks/useResize';

import * as rootSlice from 'features/root/rootSlice';

import { User } from 'types/user';

interface PropType {
  user: User;
}

export const Limit: React.FC<PropType> = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const limit = useSelector(rootSlice.limit);
  const [resize, inner] = useResize(limit);

  const handlePlan = () => {
    dispatch(rootSlice.handleLimit(false));
    navigate('/plan');
  };

  const location = new Date().toLocaleString('ja-JP', {
    timeZone: 'Asia/Tokyo',
  });
  const timeZone = 60 * 60 * 9 * 1000;
  const runningTime = 60 * 60 * 24 * 90 * 1000;
  const limitedTime =
    new Date(location).setHours(0, 0, 0, 0) - runningTime - timeZone;

  const isTimeLimit = user.createAt < limitedTime;

  return limit ? (
    <div className={`${styles.limit} ${resize && styles.limit_resize}`}>
      <div className={styles.limit_inner} ref={inner}>
        <div className={styles.limit_header}>
          {isTimeLimit ? (
            <span className={styles.limit_acnt}>
              90日間の無料体験が&nbsp;終了&nbsp;しました
            </span>
          ) : (
            <span className={styles.limit_acnt}>
              今月の閲覧回数が&nbsp;上限&nbsp;に達しました
            </span>
          )}

          <span>
            この投稿を閲覧するには&nbsp;
            <span className={styles.limit_plan}>プラン</span>
            &nbsp;の加入が必要です
          </span>
        </div>

        <figure className={styles.limit_figure}>
          <span className={styles.limit_desc}>
            {user?.payment?.trial
              ? '\\ キャンペーン中 /'
              : '\\ メンバーたちと一緒に /'}
          </span>

          <p className={styles.limit_ttl}>
            {user?.payment?.trial
              ? 'フリートライアル'
              : '案件・人材を共有しませんか？'}
          </p>
          {isTimeLimit ? (
            <img
              src={`${process.env.PUBLIC_URL}/img/app/limit.svg`}
              alt=""
              className={styles.limit_img_time}
            />
          ) : (
            <img
              src={`${process.env.PUBLIC_URL}/img/app/advertise.svg`}
              alt=""
              className={styles.limit_img}
            />
          )}
        </figure>

        <button type="button" onClick={handlePlan} className={styles.limit_btn}>
          プランを見る
        </button>
      </div>
    </div>
  ) : (
    <></>
  );
};
