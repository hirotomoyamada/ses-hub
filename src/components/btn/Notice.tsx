import React, { MouseEvent, useState } from 'react';
import styles from './Notice.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useLocation } from 'react-router-dom';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import * as userSlice from 'features/user/userSlice';

export const Notice: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSlice.user);
  const [message, setMessage] = useState<string>('といあわせ確認した？');
  const [isOpen, setIsOpen] = useState<boolean>(!!user.notice?.entry);
  const pathname = useLocation().pathname.slice(1);

  const onClose = (ev: MouseEvent<HTMLButtonElement>) => {
    ev.stopPropagation();

    setIsOpen(false);
    dispatch(userSlice.updateNotice({ type: 'user', notice: { entry: false } }));
  };

  if (['howto', 'setting', 'asct', 'terms', 'account', 'plan', 'success'].includes(pathname))
    return null;

  return isOpen ? (
    <div className={`${styles.notice}`}>
      <img
        src={`${process.env.PUBLIC_URL}/img/app/entry.png`}
        alt=''
        className={styles.notice_img}
        draggable='false'
      />
      <div className={styles.notice_fukidashi}>
        <img src={`${process.env.PUBLIC_URL}/img/app/fukidashi.png`} alt='' draggable='false' />
        <span>{message}</span>
        <button
          className={styles.notice_fukidashi_close}
          onPointerEnter={() => setMessage('とじちゃうの？')}
          onPointerLeave={() => setMessage('といあわせ確認した？')}
          onClick={onClose}>
          <FontAwesomeIcon icon={faX as IconProp} className={styles.notice_fukidashi_close_icon} />
        </button>
      </div>
    </div>
  ) : null;
};
