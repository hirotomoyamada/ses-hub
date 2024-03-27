import React from 'react';
import styles from '../Company.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

import { Company } from 'types/post';
import { User } from 'types/user';

interface PropType {
  user: Company;
  currentUser: User;
  demo: boolean;
}

export const Address: React.FC<PropType> = ({ user, currentUser, demo }) => {
  return user?.profile?.postal && user?.profile?.address ? (
    <div className={styles.profile_field}>
      <FontAwesomeIcon icon={faMapMarkerAlt as IconProp} className={styles.profile_icon} />

      <p
        className={`${styles.profile_address} ${
          currentUser.payment.status === 'canceled' &&
          user.uid !== currentUser.uid &&
          styles.profile_address_dummy
        }`}>
        <span className={styles.profile_postal}>{!demo ? user?.profile?.postal : 'XXX-XXXX'}</span>
        {!demo ? user?.profile?.address : 'デモ県デモ市デモ区デモ X-XX-XX'}
      </p>
    </div>
  ) : (
    <></>
  );
};
