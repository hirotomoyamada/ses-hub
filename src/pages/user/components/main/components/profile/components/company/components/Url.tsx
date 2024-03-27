import styles from '../Company.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faLink } from '@fortawesome/free-solid-svg-icons';

import { Company } from 'types/post';
import { User } from 'types/user';

interface PropType {
  user: Company;
  currentUser: User;
  demo: boolean;
}

export const Url: React.FC<PropType> = ({ user, currentUser, demo }) => {
  return user?.profile?.url ? (
    <div className={styles.profile_field}>
      <FontAwesomeIcon icon={faLink as IconProp} className={styles.profile_icon} />
      <a
        href={user?.profile?.url}
        className={`${styles.profile_link} ${
          currentUser.payment.status === 'canceled' &&
          user.uid !== currentUser.uid &&
          styles.profile_link_dummy
        }`}
        target='_blank'
        rel='noreferrer noopener'>
        {!demo ? user?.profile?.url : 'https://ses-hub.app'}
      </a>
    </div>
  ) : (
    <></>
  );
};
