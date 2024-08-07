import React from 'react';
import styles from './Header.module.scss';

import { Icon } from 'components/icon/Icon';

import { Company, Person } from 'types/post';
import { User } from 'types/user';

interface PropType {
  post: Company | Person;
  index?: 'companys' | 'persons';
  user: User;
}

export const Header: React.FC<PropType> = ({ index, post, user }) => {
  const isMask = post.uid !== user.uid && user.payment.status === 'canceled';

  return (
    <div className={`${styles.header} ${index === 'persons' && styles.header_persons}`}>
      <div className={styles.header_icon}>
        <Icon src={post?.icon} />
      </div>

      <div className={styles.header_container}>
        <div className={styles.header_wrap}>
          <h1 className={`${styles.header_ttl} ${isMask && styles.header_ttl_dummy}`}>
            {(post as Company)?.profile?.person
              ? (post as Company)?.profile?.person
              : (post as Person)?.profile?.nickName}
          </h1>

          {index === 'companys' && post?.status && (
            <span
              className={`${styles.header_category} ${
                post?.status === 'active'
                  ? styles.header_category_active
                  : post?.status === 'trialing' && styles.header_category_trialing
              }`}>
              {post?.status === 'active'
                ? 'レギュラー'
                : post?.status === 'trialing'
                ? 'フリートライアル'
                : 'リミテッド'}
            </span>
          )}

          {(post as Person)?.profile?.state && (
            <span
              className={`${styles.header_category} ${
                ((post as Person)?.profile?.state === '確定' ||
                  (post as Person)?.profile?.state === '商談中' ||
                  (post as Person)?.profile?.state === '情報収集中') &&
                styles.header_category_disable
              } ${(post as Person)?.profile?.state === '至急' && styles.header_category_hurry}`}>
              {(post as Person)?.profile?.state}
            </span>
          )}
        </div>

        {(post?.profile?.name || (post as Person)?.profile?.position) && (
          <h2 className={`${styles.header_tag}  ${isMask && styles.header_tag_dummy}`}>
            {post?.profile?.name ? post?.profile?.name : (post as Person)?.profile?.position}
          </h2>
        )}
      </div>
    </div>
  );
};
