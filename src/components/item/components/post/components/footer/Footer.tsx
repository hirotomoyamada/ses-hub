import styles from './Footer.module.scss';

import * as functions from 'functions';

import { Matter, Resource } from 'types/post';
import { User } from 'types/user';

interface PropType {
  post: Matter | Resource;
  user: User;
}

export const Footer: React.FC<PropType> = ({ post, user }) => {
  return (
    <div className={styles.footer}>
      {post.uid === user.uid ? (
        <span className={styles.footer_time}>
          {functions.root.timestamp(post?.createAt)}
        </span>
      ) : null}

      {post?.user && user?.payment?.status !== 'canceled' && (
        <div className={styles.footer_user}>
          <p className={styles.footer_user_name}>{post?.user?.profile?.name}</p>

          <p className={styles.footer_user_person}>
            {post?.user?.profile?.person}
          </p>
        </div>
      )}
    </div>
  );
};
