import React from 'react';
import styles from '../Main.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faRobot } from '@fortawesome/free-solid-svg-icons';

import * as rootSlice from 'features/root/rootSlice';
import { User } from 'types/user';

interface PropType {
  user: User;
}

export const Editor: React.FC<PropType> = ({ user }) => {
  const fetch = useSelector(rootSlice.load).fetch;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSetting = (): void => {
    navigate('/setting');
  };

  return (
    <div className={styles.main_edit}>
      <div className={`${styles.main_edit_outer} ${fetch && styles.main_edit_outer_fetch}`}>
        <button
          type='button'
          onClick={() =>
            user.payment.status !== 'canceled'
              ? dispatch(
                  rootSlice.handleModal({
                    type: 'analytics',
                  }),
                )
              : dispatch(
                  rootSlice.handleModal({
                    type: 'advertise',
                    meta: { type: 'analytics' },
                  }),
                )
          }
          className={`${styles.main_edit_btn} ${styles.main_edit_btn_analytics} ${
            fetch && styles.main_edit_btn_disabled
          }`}>
          <FontAwesomeIcon icon={faRobot as IconProp} className={styles.profile_icon} />
        </button>
      </div>

      <button
        type='button'
        onClick={handleSetting}
        className={`${styles.main_edit_btn} ${styles.main_edit_btn_account}`}>
        アカウント情報
      </button>

      <button
        type='button'
        onClick={() => dispatch(rootSlice.handleModal({ type: 'profile' }))}
        className={styles.main_edit_btn}>
        プロフィール変更
      </button>
    </div>
  );
};
