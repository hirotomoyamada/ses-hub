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
  const handleBack = () => {
    dispatch(rootSlice.handleLimit(false));
    navigate('/companys/' + user.uid);
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
              無料体験の期間が&nbsp;上限&nbsp;になりました
            </span>
          ) : (
            <span className={styles.limit_acnt}>
              今月の閲覧回数が&nbsp;上限&nbsp;に達しました
            </span>
          )}

          <span>
            他ユーザーの投稿の閲覧や、問い合わせをするには&nbsp;
            <span className={styles.limit_plan}>プラン</span>
            &nbsp;の加入が必要です
          </span>
        </div>

        <figure className={styles.limit_figure}>
          <span className={styles.limit_desc}>
            {user?.payment?.trial
              ? '\\ サブスク登録でいままでより /'
              : '\\ メンバーたちと一緒に /'}
          </span>

          <p className={styles.limit_ttl}>
            {user?.payment?.trial
              ? 'もっと便利な機能が使えちゃう！'
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

        <div className={styles.limit_footer}>
          <button
            type="button"
            onClick={handleBack}
            className={`${styles.limit_btn} ${styles.limit_btn_back}`}>
            もどる
          </button>

          <button
            type="button"
            onClick={handlePlan}
            className={styles.limit_btn}>
            プランを見る
          </button>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};
